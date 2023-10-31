import { BigNumber, utils } from 'ethers';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { google } from 'googleapis';
import {
  OasPrices,
  TimeData,
  TotalStakeData,
  ValidatorTotalStake,
} from './../types';
import { getDate, getMonthDate, getTime } from './date';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID ?? '';
// set service account info path when local development
const CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const INITIAL_MONTH = '202209';

export const HEADER_FOR_GENERAL: string[] = [
  'epoch',
  'block',
  'timestamp(UTC)',
  'Total staked(OAS+SOAS+WOAS)',
  'Daily validator commission(OAS)',
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
  'timestamp(UTC)': 150,
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

export const saveTotalStakeAmount = async (
  doc: GoogleSpreadsheet,
  timestamp: Date,
  totalStakeData: TotalStakeData,
) => {
  const summarySheet = doc.sheetsByTitle['Summary'];
  let rows = await summarySheet.getRows();

  // when summary sheet has only header, add two rows
  if (rows.length === 0) {
    const rowData = [INITIAL_MONTH, '0', '0', '0', '0', ''];
    await summarySheet.addRow(rowData, {
      raw: true,
      insert: true,
    });
    rows = await summarySheet.getRows();
  }

  const latestMonthRow = rows[rows.length - 1];
  const sheetLatestMonth =
    typeof latestMonthRow.month === 'string' ? latestMonthRow.month : '';
  if (!sheetLatestMonth)
    throw new Error('Can not get spreadsheet last month data');
  const month = getMonthDate(timestamp);

  const header = {
    month: 'month',
    oas: 'Total staking(OAS)',
    soas: 'Total staking (SOAS)',
    woas: 'Total staking (WOAS)',
    total: 'Total staking (OAS+SOAS+WOAS)',
    growthRate: 'Growth rate(%)',
  };

  if (month === INITIAL_MONTH) {
    latestMonthRow[header.oas] = utils
      .formatEther(totalStakeData.totalOasStake)
      .toString();
    latestMonthRow[header.soas] = utils
      .formatEther(totalStakeData.totalSoasStake)
      .toString();
    latestMonthRow[header.woas] = utils
      .formatEther(totalStakeData.totalWoasStake)
      .toString();
    latestMonthRow[header.total] = utils
      .formatEther(totalStakeData.totalStake)
      .toString();
    await latestMonthRow.save();
  } else if (sheetLatestMonth === month) {
    const lastMonthTotalStakeString = rows[rows.length - 2][header.total];
    const lastMonthTotalStake =
      typeof lastMonthTotalStakeString === 'string'
        ? utils.parseEther(
            lastMonthTotalStakeString.replace('/,/g', '').split('.')[0],
          )
        : BigNumber.from('0');
    latestMonthRow[header.oas] = utils
      .formatEther(totalStakeData.totalOasStake)
      .toString();
    latestMonthRow[header.soas] = utils
      .formatEther(totalStakeData.totalSoasStake)
      .toString();
    latestMonthRow[header.woas] = utils
      .formatEther(totalStakeData.totalWoasStake)
      .toString();
    latestMonthRow[header.total] = utils
      .formatEther(totalStakeData.totalStake)
      .toString();
    latestMonthRow[header.growthRate] = totalStakeData.totalStake
      .mul(100)
      .div(lastMonthTotalStake)
      .toString();
    await latestMonthRow.save();
  } else {
    const lastMonthTotalStakeString = rows[rows.length - 1][header.total];
    const lastMonthTotalStake =
      typeof lastMonthTotalStakeString === 'string'
        ? utils.parseEther(
            lastMonthTotalStakeString.replace('/,/g', '').split('.')[0]
        )
        : BigNumber.from('0');

    const rowData = ['0', '0', '0', '0', '0', '0'];
    // store dummy data beforehand to create sheet graph.
    // addRow_data can't create sheet graph because sheet can't read addRow_data.
    // update_data can create sheet graph.
    await summarySheet.addRow(rowData, {
      raw: true,
      insert: true,
    });

    const newRows = await summarySheet.getRows();
    const currentMonthRow = newRows[newRows.length - 1];

    currentMonthRow[header.month] = month;
    currentMonthRow[header.oas] = utils
      .formatEther(totalStakeData.totalOasStake)
      .toString();
    currentMonthRow[header.soas] = utils
      .formatEther(totalStakeData.totalSoasStake)
      .toString();
    currentMonthRow[header.woas] = utils
      .formatEther(totalStakeData.totalWoasStake)
      .toString();
    currentMonthRow[header.total] = utils
      .formatEther(totalStakeData.totalStake)
      .toString();
    currentMonthRow[header.growthRate] = totalStakeData.totalStake
      .mul(100)
      .div(lastMonthTotalStake)
      .toString();

    await currentMonthRow.save();
  }
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

export const getAdditionalData = (
  oasPrices: OasPrices,
  stakeDate: ValidatorTotalStake[],
  timeData: TimeData,
  price: string,
): {
  rowData: string[][];
  totalStakeData: TotalStakeData;
} => {
  const { epoch, block, timestamp } = timeData;

  const date = getDate(timestamp);
  const time = getTime(timestamp);
  let prices = [];
  if (oasPrices) {
    const jpy = oasPrices['jpy'] ?? '';
    const usd = oasPrices['usd'] ?? '';
    const krw = oasPrices['krw'] ?? '';
    const eur = oasPrices['eur'] ?? '';
    const sgd = oasPrices['sgd'] ?? '';
    prices = price ? [oasPrices[price]] : [jpy, usd, krw, eur, sgd];
  }

  let totalStake = BigNumber.from('0');
  let totalOasStake = BigNumber.from('0');
  let totalSoasStake = BigNumber.from('0');
  let totalWoasStake = BigNumber.from('0');

  const rowData = stakeDate
    .filter((stake) => {
      const validatorTotalStake = stake.oas.add(stake.soas).add(stake.woas);
      return validatorTotalStake.gt(0);
    })
    .map((stake) => {
      totalStake = totalStake.add(stake.oas).add(stake.soas).add(stake.woas);
      totalOasStake = totalOasStake.add(stake.oas);
      totalSoasStake = totalSoasStake.add(stake.soas);
      totalWoasStake = totalWoasStake.add(stake.woas);
      // const validatorInfo = validatorsInfo.find((validator) => {
      //   return validator.address.toLowerCase() === stake.address.toLowerCase();
      // });

      const validatorTotalStake = stake.oas.add(stake.soas).add(stake.woas);

      return [
        epoch,
        block,
        `${date} ${time}`,
        utils.formatEther(validatorTotalStake).toString(),
        utils.formatEther(stake.dailyCommission).toString(),
        ...prices,
      ];
    });

  // set total stake amount row
  // rowData.push([
  //   'Total',
  //   '',
  //   '',
  //   utils.formatEther(totalStake).toString(),
  //   '',
  // ]);

  return {
    rowData: rowData,
    totalStakeData: {
      totalStake,
      totalOasStake,
      totalSoasStake,
      totalWoasStake,
    },
  };
};
