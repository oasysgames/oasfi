import moment = require('moment-timezone');
import { BigNumber, utils } from 'ethers';
import * as fsPromise from 'fs/promises';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as Papa from 'papaparse';
import { getOasPrice, getOasPrices } from '../service/coingecko';
import { saveCsvToFile } from '../service/csvService';
import {
  OasPrices,
  TimeData,
  TotalStakeData,
  stakerRewardArgs,
  stakerStake,
  validatorRewardArgs,
  validatorTotalStake,
} from '../types';
import { convertArrayToObject } from '../utils/convert';
import { isExists, writeFile } from '../utils/file';
import { getDataSheet } from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const getEpoches = async (
  argv: validatorRewardArgs | stakerRewardArgs,
  subgraph: Subgraph,
) => {
  const latestEpochResult = await subgraph.getLatestEpoch();
  const latestEpoch = Number(latestEpochResult.epoches[0]?.epoch);
  let from: number = argv.from_epoch;
  let to: number = argv.to_epoch;

  if (!argv.to_epoch) {
    to = latestEpoch - 1;
  } else if (to >= latestEpoch) {
    console.log('Warning: to >= latestEpoch, adjusting to = latestEpoch - 1');
    to = latestEpoch - 1;
  }

  if (!argv.from_epoch) {
    from = to - 31;
  }

  if (argv.from_date) {
    const from_time = argv.time_zone
      ? moment(argv.from_date).tz(argv.time_zone)
      : moment(argv.from_date);

    const epochData = await subgraph.getEpochByFromTimestamp(
      from_time.utc().unix(),
    );
    from =
      epochData.epoches.length > 0 ? Number(epochData.epoches[0].epoch) : latestEpoch;
  }

  if (argv.to_date) {
    const to_time = argv.time_zone
      ? moment(argv.to_date).tz(argv.time_zone)
      : moment(argv.to_date);

    const epochData = await subgraph.getEpochByToTimestamp(
      to_time.utc().unix(),
    );
    to =
      epochData.epoches.length > 0 ? Number(epochData.epoches[0].epoch) : latestEpoch;
  }

  if (from > to) {
    to = from;
  }

  if (to >= latestEpoch) {
    to = latestEpoch - 1;
  }
  console.log('FROM EPOCH: ', from);
  console.log('TO EPOCH: ', to);

  return {
    from: parseInt(`${from}`),
    to: parseInt(`${to}`),
  };
};

export async function getOasPricesForEpoch(argv, epochData) {
  if (!process.env.COINGECKO_API_KEY) {
    return;
  }
  //timestamp utc
  const timestamp = epochData.epoches[0].timestamp * 1000;

  //Default 00:00:00 UTC
  const priceTime = new Date(timestamp);

  //transmitted early the next day
  priceTime.setUTCDate(priceTime.getUTCDate() + 1);
  priceTime.setUTCHours(0, 0, 0, 0);

  let oasPrices = {};

  if (argv.price) {
    const oasysPrice = await getOasPrice(argv.price, priceTime);
    oasPrices[argv.price] = oasysPrice;
  } else {
    oasPrices = await getOasPrices(priceTime);
  }
  return {
    oasPrices,
    priceTime,
  };
}

export const exportCsvOnline = async (
  doc: GoogleSpreadsheet,
  rowData: string[][],
  timestamp: moment.Moment,
  header: string[],
) => {
  const dataSheet = await getDataSheet(doc, timestamp, header);
  await dataSheet.addRows(rowData, {
    raw: true,
    insert: true,
  });
};

export const exportCsvLocal = async (
  rowData: string[][],
  header: string[],
  fileName: string,
  outPut: string,
) => {
  const output_csv = outPut || `output_csv/${fileName}.csv`;
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

export const exportCsv = async (
  array: any,
  isOnline: boolean,
  output: string,
  fileName: string,
  header: string[],
  doc: GoogleSpreadsheet,
): Promise<boolean> => {
  for (let i = 0; i < array.length; i++) {
    const { rowData, timestamp } = array[i];
    isOnline
      ? await exportCsvOnline(doc, rowData, timestamp, header)
      : await exportCsvLocal(rowData, header, fileName, output);
  }
  return true;
};

export async function getLastDataFetchedByEpoch(
  doc: GoogleSpreadsheet,
  header: string[],
  argv,
  timestamp: moment.Moment,
  addressKey: string,
  csvFileName: string,
  output: string,
) {
  const isOnlineExport = Boolean(argv.export_csv_online);
  let output_csv: string;
  let addresses = [];
  let epoch = 0;
  let lastRow;
  let rows;

  if (isOnlineExport) {
    const dataSheet = await getDataSheet(doc, timestamp, header);
    rows = await dataSheet.getRows();
  } else {
    output_csv = output || `output_csv/${csvFileName}.csv`;
    const exist = await isExists(output_csv);

    if (exist) {
      const csvContent = await fsPromise.readFile(output_csv, 'utf-8');
      const result = Papa.parse(csvContent, { header: true });
      rows = result?.data;
    }
  }

  lastRow = rows?.[rows.length - 1];
  if (lastRow && lastRow['Epoch']) {
    epoch = lastRow['Epoch'];
    addresses = rows
      .filter((row) => row['Epoch'] == epoch)
      .map((row) => row[addressKey]);
  }
  return { epoch, addresses };
}


export const getAdditionalDataForCommissionReward = (
  oasPrices: OasPrices,
  stakeData: validatorTotalStake[],
  timeData: TimeData,
  price: string,
  validator_address: string,
  priceTime: Date,
  timeZone?: string, // Timezone parameter is optional
): {
  rowData: string[][];
  totalStakeData: TotalStakeData;
} => {
  const { epoch, block, timestamp } = timeData;

  // Fallback to UTC if timeZone is not provided or invalid
  const effectiveTimeZone = moment.tz.zone(timeZone) ? timeZone : moment.tz.guess();

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

  const rowData = stakeData
    .filter((stake) => {
      const validatorTotalStake = stake.oas.add(stake.soas).add(stake.woas);
      return validatorTotalStake;
    })
    .map((stake) => {
      totalStake = totalStake.add(stake.oas).add(stake.soas).add(stake.woas);
      totalOasStake = totalOasStake.add(stake.oas);
      totalSoasStake = totalSoasStake.add(stake.soas);
      totalWoasStake = totalWoasStake.add(stake.woas);
      const validatorTotalStake = stake.oas.add(stake.soas).add(stake.woas);
      return [
        validator_address,
        epoch,
        block,
        moment(timestamp).tz(effectiveTimeZone).format('YYYY/MM/DD HH:mm:ss'), // Use effective timezone
        utils.formatEther(validatorTotalStake).toString(),
        utils.formatEther(stake.dailyCommission).toString(),
        ...prices,
        priceTime && moment(priceTime).tz(effectiveTimeZone).format('YYYY/MM/DD HH:mm:ss'), // Use effective timezone
      ];
    });

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

export const getAdditionalDataForStakerReward = (
  oasPrices: OasPrices,
  stakeData: stakerStake,
  timeData: TimeData,
  price: string,
  address: string,
  priceTime: Date,
  timeZone?: string, // Timezone parameter is optional
): {
  rowData: string[][];
} => {
  const { epoch, block, timestamp } = timeData;

  // Fallback to UTC if timeZone is not provided or invalid
  const effectiveTimeZone = moment.tz.zone(timeZone) ? timeZone : moment.tz.guess();

  let prices = [];
  if (oasPrices) {
    const jpy = oasPrices['jpy'] ?? '';
    const usd = oasPrices['usd'] ?? '';
    const krw = oasPrices['krw'] ?? '';
    const eur = oasPrices['eur'] ?? '';
    const sgd = oasPrices['sgd'] ?? '';
    prices = price ? [oasPrices[price]] : [jpy, usd, krw, eur, sgd];
  }

  const rowData = [
    [
      address,
      epoch,
      block,
      moment(timestamp).tz(effectiveTimeZone).format('YYYY/MM/DD HH:mm:ss'), // Use effective timezone
      utils.formatEther(stakeData.totalStake).toString(),
      utils.formatEther(stakeData.stakerReward).toString(),
      ...prices,
      priceTime && moment(priceTime).tz(effectiveTimeZone).format('YYYY/MM/DD HH:mm:ss'), // Use effective timezone
    ],
  ];
  return {
    rowData: rowData,
  };
};
