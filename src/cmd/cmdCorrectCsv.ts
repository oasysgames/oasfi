import * as fsPromise from 'fs/promises';
import * as Papa from 'papaparse';
import { TokenTransfer } from '../module/TokenTransfer';
import { saveCsvToFile } from '../service/csvService';
import { CorrectCsvArgs } from '../types';
import { LogUtils } from '../utils/Logger';

export async function processCorrectCsv(args: CorrectCsvArgs) {
  const Logger = new LogUtils('log-correctCsv', 'log-error.txt');
  try {
    const { chain, input, output } = args;
    const tokenTransfer = new TokenTransfer(chain);
    const csvContent = await fsPromise.readFile(input, 'utf-8');
    const result = Papa.parse(csvContent, { header: true });
    const data = await tokenTransfer.handleDuplicateTokenTransfer(result.data);
    await saveCsvToFile(output, Papa.unparse(data));
  } catch (error) {
    console.log(error);
    Logger.log('error', `${error}`);
  }
}
