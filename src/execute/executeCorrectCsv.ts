import * as fsPromise from 'fs/promises';
import * as Papa from 'papaparse';
import { TokenTransfer } from '../module/TokenTransfer';
import { saveCsvToFile } from '../service/csvService';
import { CorrectCsvArgs } from '../types';

export const main = async (argv: CorrectCsvArgs) => {
  const { input, output } = argv;
  const tokenTransfer = new TokenTransfer();
  const csvContent = await fsPromise.readFile(input, 'utf-8');
  const result = Papa.parse(csvContent, { header: true });
  const data = await tokenTransfer.handleDuplicateTokenTransfer(result.data);
  await saveCsvToFile(output, Papa.unparse(data));
};
