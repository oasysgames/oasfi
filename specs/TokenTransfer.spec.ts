import { TokenTransfer, TokenTransferData } from '../src/module/TokenTransfer';
import * as fs from 'fs';
import * as fsPromise from 'fs/promises';
import * as Papa from 'papaparse';
import { saveCsvToFile } from './../src/service/csvService';

describe('tests', () => {
  it('saveCsvToFile test', async () => {
    const outputPath = './specs/samples/output.csv';
    const target = new TokenTransfer('hub_mainnet');
    const sampleData = 'sampledata';
    await saveCsvToFile(outputPath, sampleData);
    // ファイルを読み込む
    const outputData = fs.readFileSync(outputPath, 'utf-8');
    // 期待するデータ
    // ファイルの内容を確認する
    expect(outputData).toBe(sampleData);
    // テストが完了したらファイルを削除する
    fs.unlinkSync(outputPath);
  });

  it('TokenTransferData test', async () => {
    const csvContent = await fsPromise.readFile(
      './target_csv/token-transfers.csv',
      'utf-8',
    );
    const result = Papa.parse(csvContent, { header: true });
    const data: TokenTransferData[] = result.data.map((row) => ({
      TxHash: row.TxHash,
      BlockNumber: row.BlockNumber,
      UnixTimestamp: row.UnixTimestamp,
      FromAddress: row.FromAddress,
      ToAddress: row.ToAddress,
      TokenContractAddress: row.TokenContractAddress,
      Type: row.Type,
      TokenSymbol: row.TokenSymbol,
      TokensTransferred: row.TokensTransferred,
      TransactionFee: row.TransactionFee,
      Status: row.Status,
      ErrCode: row.ErrCode,
    }));
    expect(data[0].Status).toBe('ok');
  });

  it('handleDuplicateTokenTransfer test', async () => {
    const csvContent = await fsPromise.readFile(
      './target_csv/token-transfers.csv',
      'utf-8',
    );
    const result = Papa.parse(csvContent, { header: true });
    const target = new TokenTransfer('hub_mainnet');
    const converted = await target.handleDuplicateTokenTransfer(result.data);
    expect(converted.length).toBe(11);
    console.log('DONE');
  }, 100000000);
});
