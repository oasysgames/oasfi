import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { google } from 'googleapis';
import { getMonthDate } from './date';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID ?? '';
// set service account info path when local development
const CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

export const HEADER_FOR_VALIDATOR_REWARD: string[] = [
  'Validator address',
  'Epoch',
  'Block',
  'Timestamp',
  'Total staked(OAS+SOAS+WOAS)',
  'Daily validator commission(OAS)',
];

export const HEADER_FOR_STAKER_REWARD: string[] = [
  'Epoch',
  'Block',
  'Timestamp',
  'Total staked(OAS+SOAS+WOAS)',
  'Staker reward(OAS)',
];

export const DEFAULT_LIST_PRICE: string[] = [
  'Oas price(jpy)',
  'Oas price(usd)',
  'Oas price(krw)',
  'Oas price(eur)',
  'Oas price(sgd)',
];
const GOOGLE_API_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

type ColumnWidth = { [columnName: string]: number };
const COLUMN_WIDTHS: ColumnWidth = {
  address: 400,
  'Timestamp(UTC)': 150,
  'All validator total staked(OAS+SOAS+WOAS)': 280,
  'Total staked(OAS+SOAS+WOAS)': 220,
  'Total staked(OAS)': 220,
  'Total staked(SOAS)': 220,
  'Total staked(WOAS)': 220,
  'Daily validator commission(OAS)': 220,
  'Remaining validator commission(OAS)': 240,
};

export const getSpreadSheet = async () => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  if (CREDENTIALS) {
    // eslint-disable-next-line
    const cred = require(CREDENTIALS);
    await doc.useServiceAccountAuth(cred);
  } else {
    const auth = await google.auth.getClient({ scopes: GOOGLE_API_SCOPES });
    const token = await auth.getAccessToken();
    if (!token.token) {
      throw new Error('Spreadsheet access is not allowed');
    }
    doc.useRawAccessToken(token.token);
  }
  return doc;
};

export const getLastEpoch = async (doc: GoogleSpreadsheet): Promise<number> => {
  const metaSheet = doc.sheetsByTitle['_meta'];
  const row = (await metaSheet.getRows({ limit: 1, offset: 0 }))[0];
  return parseInt(row.epoch, 10);
};

export const saveLastEpoch = async (doc: GoogleSpreadsheet, epoch: number) => {
  const metaSheet = doc.sheetsByTitle['_meta'];
  const row = (await metaSheet.getRows({ limit: 1, offset: 0 }))[0];
  row.epoch = epoch.toString();
  await row.save();
};

const setHeaderWidth = async (
  sheet: GoogleSpreadsheetWorksheet,
  header: string[],
) => {
  await Promise.all(
    header.map(async (h, i) => {
      const width = COLUMN_WIDTHS[h] || 220;

      return sheet.updateDimensionProperties(
        'COLUMNS',
        {
          pixelSize: width,
          hiddenByFilter: false,
          hiddenByUser: false,
          developerMetadata: [],
        },
        {
          startIndex: i,
          endIndex: i + 1,
        },
      );
    }),
  );
};

export const getDataSheet = async (
  doc: GoogleSpreadsheet,
  timestamp: Date,
  header: Array<string>,
): Promise<GoogleSpreadsheetWorksheet> => {
  // get year and month date
  const title = getMonthDate(timestamp);

  let sheet = doc.sheetsByTitle[title];

  if (!sheet) {
    sheet = await doc.addSheet({ title, headerValues: header });
    await setHeaderWidth(sheet, header);
  }

  return sheet;
};

export const getLatestSheet = async (
  doc: GoogleSpreadsheet,
  header: Array<string>,
): Promise<GoogleSpreadsheetWorksheet> => {
  const title = 'latest';
  let sheet = doc.sheetsByTitle[title];

  if (sheet) {
    await sheet.delete();
  }

  sheet = await doc.addSheet({ title, headerValues: header });
  await setHeaderWidth(sheet, header);
  return sheet;
};
