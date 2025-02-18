const express = require("express");
const crypto = require("crypto");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const Queue = require("bull");

require("dotenv").config();

const app = express();
app.use(express.json());

// AWS S3 設定
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

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

// ジョブ処理の共通ロジック
scriptQueue.process(async (job, done) => {
  const { command, s3FileName } = job.data;

  // 出力ファイルパス（ローカルファイルパス）
  const outputFilePath = path.join("/app/output_csv", s3FileName);

  // コマンドに出力ファイルパスを追加
  const fullCommand = `${command} --output=${outputFilePath}`;
  console.log("Executing command:", fullCommand);

  exec(fullCommand, async (error, stdout, stderr) => {
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

// API エンドポイント: export-staker-reward
app.post("/api/export-staker-reward", async (req, res) => {
  const {
    staker_addresses,
    chain,
    from_epoch,
    to_epoch,
    from_date,
    to_date,
    time_zone,
    price,
    export_csv_online,
    output,
  } = req.body;

  // 必須項目を確認
  if (!staker_addresses) {
    return res.status(400).json({
      status: "error",
      message: "staker_addresses are required.",
    });
  }

  // リクエストデータ全体をハッシュ化してファイル名に使用
  const requestHash = generateHash({
    staker_addresses,
    chain,
    from_epoch,
    to_epoch,
    from_date,
    to_date,
    time_zone,
    price,
    export_csv_online,
    output,
  });
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

  // コマンドを構築
  let command = `/app/oasfi export-staker-reward ${staker_addresses}`;
  if (chain) command += ` --chain=${chain}`;
  if (from_epoch) command += ` --from_epoch=${from_epoch}`;
  if (to_epoch) command += ` --to_epoch=${to_epoch}`;
  if (from_date) command += ` --from_date=${from_date}`;
  if (to_date) command += ` --to_date=${to_date}`;
  if (time_zone) command += ` --time_zone=${time_zone}`;
  if (price) command += ` --price=${price}`;
  // TODO
  // if (export_csv_online) command += ` --export_csv_online=${export_csv_online}`;
  if (output) command += ` --output=${output}`;

  // ジョブをキューに追加
  const job = await scriptQueue.add({
    command, // 実行するコマンド
    s3FileName, // S3に保存するファイル名
  });

  res.json({
    status: "success",
    message: "Job has been queued.",
    job_id: job.id,
    s3_file_name: s3FileName, // S3のファイル名をレスポンスに含める
  });
});

// API エンドポイント: export-validator-reward
app.post("/api/export-validator-reward", async (req, res) => {
  const {
    validator_addresses,
    chain,
    from_epoch,
    to_epoch,
    from_date,
    to_date,
    time_zone,
    price,
    export_csv_online,
  } = req.body;

  // 必須項目を確認
  if (!validator_addresses) {
    return res.status(400).json({
      status: "error",
      message: "validator_addresses is required.",
    });
  }

  // リクエストデータ全体をハッシュ化してファイル名に使用
  const requestHash = generateHash({
    validator_addresses,
    chain,
    from_epoch,
    to_epoch,
    from_date,
    to_date,
    time_zone,
    price,
    export_csv_online,
  });
  const s3FileName = `validator-reward_${requestHash}.csv`;

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

  // コマンドを構築
  let command = `/app/oasfi export-validator-reward ${validator_addresses}`;
  if (chain) command += ` --chain=${chain}`;
  if (from_epoch) command += ` --from_epoch=${from_epoch}`;
  if (to_epoch) command += ` --to_epoch=${to_epoch}`;
  if (from_date) command += ` --from_date=${from_date}`;
  if (to_date) command += ` --to_date=${to_date}`;
  if (time_zone) command += ` --time_zone=${time_zone}`;
  if (price) command += ` --price=${price}`;
  // TODO
  // if (export_csv_online) command += ` --export_csv_online=${export_csv_online}`;

  // ジョブをキューに追加
  const job = await scriptQueue.add({
    command, // 実行するコマンド
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
  // ジョブを Redis キューから取得
  const job = await scriptQueue.getJob(req.params.id);

  if (!job) {
    return res.status(404).json({
      status: "error",
      message: "Job not found."
    });
  }

  // ジョブの状態と進捗を取得
  const jobStatus = await job.getState(); // ジョブの状態
  const progress = job.progress();       // ジョブの進捗状況
  const s3FileName = job.data.s3FileName; // ジョブデータから S3 ファイル名を取得

  res.json({
    status: "success",
    job_id: job.id,
    job_status: jobStatus,
    progress: progress,
    s3_file_name: s3FileName // S3 ファイル名をレスポンスに含める
  });
});

// API: S3 から CSV ファイルをダウンロード
app.get("/api/download-csv", async (req, res) => {
  const { filename } = req.query;

  // バリデーション: ファイル名が入力されているか確認
  if (!filename) {
    return res.status(400).json({
      status: "error",
      message: "Filename is required.",
    });
  }

  try {
    // S3 からファイルを取得
    const params = {
      Bucket: BUCKET_NAME,
      Key: filename,
    };

    // S3 のファイルをストリームとして取得
    const fileStream = s3.getObject(params).createReadStream();

    // レスポンスを設定（ファイルダウンロード用ヘッダーを指定）
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "text/csv");

    // ストリームをレスポンスにパイプ
    fileStream.pipe(res);

    // エラーハンドリング（ストリーム）
    fileStream.on("error", (err) => {
      console.error("Error reading file from S3:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to download file from S3.",
      });
    });
  } catch (err) {
    console.error("Error downloading file from S3:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to download file from S3.",
    });
  }
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
