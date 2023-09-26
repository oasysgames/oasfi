import { TokenTransfer } from "../src/module/TokenTransfer";
import * as fs from "fs";

describe("tests", () => {
  it("saveCsvToFile test", async () => {
    const outputPath = "./sample/output.csv";
    const target = new TokenTransfer("hub_mainnet");
    const sampleData = "sampledata";
    await target.saveCsvToFile(outputPath, sampleData);
    // ファイルを読み込む
    const outputData = fs.readFileSync(outputPath, "utf-8");
    // 期待するデータ
    const expectedData = sampleData;
    // ファイルの内容を確認する
    expect(outputData).toBe(expectedData);
    // テストが完了したらファイルを削除する
    fs.unlinkSync(outputPath);
  });
});
