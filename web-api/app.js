require('dotenv').config();

const express = require("express");
const Queue = require("bull");
const { exec } = require("child_process");
const crypto = require("crypto");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// AWS S3 設定
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "oasys-fi-web-api";

// Redis 設定
const scriptQueue = new Queue("scriptQueue", {
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null,
    connectTimeout: 60000,
  },
});

// Redis 接続状態をログに出力
scriptQueue.on("error", (err) => {
  console.error("Redis connection error:", err);
});

scriptQueue.on("ready", () => {
  console.log("Redis connection established successfully.");
});

// ハッシュ生成関数
function generateHash(data) {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

// 空のCSVファイルをS3にアップロード
async function uploadEmptyCsvToS3(fileName) {
  const emptyCsvContent = ""; // 空のCSVコンテンツ
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: emptyCsvContent,
    ContentType: "text/csv",
  };

  return s3.upload(params).promise();
}

// ファイルをS3にアップロード（置き換え）
async function uploadFileToS3(filePath, fileName) {
  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
    ContentType: "text/csv",
  };

  return s3.upload(params).promise();
}

// ジョブキューの処理
scriptQueue.process(async (job, done) => {
  const { staker_addresses, from_date, to_date, time_zone, s3FileName } = job.data;

  // 出力ファイルパス（ローカルファイルパス）
  const outputFilePath = path.join("/app/output_csv", s3FileName);

  // コマンドを構築
  let command = `/app/oasfi export-staker-reward ${staker_addresses}`;
  if (from_date) {
    command += ` --from_date=${from_date}`;
  }
  if (to_date) {
    command += ` --to_date=${to_date}`;
  }
  if (time_zone) {
    command += ` --time_zone=${time_zone}`;
  }
  command += ` --output=${outputFilePath}`;

  console.log("Executing command:", command);

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error.message);
      return done(new Error(`Script execution failed: ${error.message}`));
    }

    if (stderr) {
      console.error("Stderr:", stderr);
      return done(new Error(`Script execution failed: ${stderr}`));
    }

    console.log("Script output:", stdout);

    // S3 に出力ファイルをアップロードして置き換え
    try {
      await uploadFileToS3(outputFilePath, s3FileName);
      console.log(`File successfully uploaded to S3: ${s3FileName}`);
    } catch (uploadError) {
      console.error("Failed to upload file to S3:", uploadError);
      return done(new Error(`Failed to upload file to S3: ${uploadError.message}`));
    }

    done(); // ジョブが成功した場合は完了を通知
  });
});

// ジョブを登録するAPI
app.post("/api/run-export-staker-reward", async (req, res) => {
  const { staker_addresses, from_date, to_date, time_zone } = req.body;

  // 必須項目を確認
  if (!staker_addresses) {
    return res.status(400).json({
      status: "error",
      message: "staker_addresses is required.",
    });
  }

  // リクエストデータ全体をハッシュ化してファイル名に使用
  const requestHash = generateHash({ staker_addresses, from_date, to_date, time_zone });
  const s3FileName = `staker-reward_${requestHash}.csv`;

  try {
    // 空のCSVファイルをS3にアップロード
    await uploadEmptyCsvToS3(s3FileName);
    console.log(`Empty CSV file successfully uploaded to S3: ${s3FileName}`);
  } catch (error) {
    console.error("Failed to upload empty CSV file to S3:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to upload empty CSV file to S3.",
    });
  }

  // ジョブをキューに追加
  const job = await scriptQueue.add({
    staker_addresses,
    from_date, // オプションとして追加
    to_date, // オプションとして追加
    time_zone, // オプションとして追加
    s3FileName, // S3に保存するファイル名
  });

  res.json({
    status: "success",
    message: "Job has been queued.",
    job_id: job.id,
    s3_file_name: s3FileName, // S3のファイル名をレスポンスに含める
  });
});

// ジョブの進捗状況を確認するAPI
app.get("/api/job-status/:id", async (req, res) => {
  const job = await scriptQueue.getJob(req.params.id);

  if (!job) {
    return res.status(404).json({
      status: "error",
      message: "Job not found."
    });
  }

  const jobStatus = await job.getState(); // ジョブの状態を取得
  const progress = job.progress();       // 進捗状況を取得（必要に応じて設定可能）

  res.json({
    status: "success",
    job_id: job.id,
    job_status: jobStatus,
    progress: progress
  });
});

// サーバーの起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
