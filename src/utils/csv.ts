import moment = require('moment-timezone');
import * as fsPromise from 'fs/promises';
import * as Papa from 'papaparse';
import { saveCsvToFile } from '../service/csvService';
import { writeFile } from '../utils/file';
import { getDataSheet } from '../utils/google';
import { convertArrayToObject } from './convert';

export const exportCsvOnline = async (
  doc,
  rowData: string[][],
  timestamp: Date,
  header,
) => {
  const dataSheet = await getDataSheet(doc, timestamp, header);
  await dataSheet.addRows(rowData, {
    raw: true,
    insert: true,
  });

  //latest sheet
  // const latestSheet = await getLatestSheet(doc, header);
  // await latestSheet.addRows(rowData, {
  //   raw: true,
  //   insert: true,
  // });
  // await saveTotalStakeAmount(doc, timestamp, totalStakeData);
  // await saveLastEpoch(doc, 1);
};

export const exportCsvLocal = async (
  rowData: string[][],
  header,
  validator_address: string,
  staker_address: string,
  oputput: string,
) => {
  const output_csv =
    oputput ||
    `output_csv/comission-reward-${validator_address}-${staker_address}.csv`;
  try {
    await writeFile(output_csv, Papa.unparse({ fields: header }));
  } catch (error) {
    console.log(error);
  }
  const csvContent = await fsPromise.readFile(output_csv, 'utf-8');
  const result = await Papa.parse(csvContent, { header: true });
  rowData.forEach((item) => {
    result.data.push(convertArrayToObject(item, header));
  });

  await saveCsvToFile(
    output_csv,
    await Papa.unparse({ fields: header, data: result.data }),
  );
};
