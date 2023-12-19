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
import { sleep } from '../utils';
import { convertArrayToObject } from '../utils/convert';
import { writeFile } from '../utils/file';
import { getDataSheet, getSpreadSheet } from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const getEpoches = async (
  argv: validatorRewardArgs | stakerRewardArgs,
  subgraph: Subgraph,
) => {
  const latestEpochResult = await subgraph.getLatestEpoch();
  const latestEpoch = latestEpochResult.epoches[0]?.epoch;
  let from = argv.from_epoch;
  let to = argv.to_epoch;

  if (!argv.to_epoch) {
    to = latestEpoch - 1;
  }

  if (!argv.from_epoch) {
    from = to - 31;
  }

  if (argv.from_date) {
    //specified timezone or local timezone
    const from_time = argv.time_zone
      ? moment(argv.from_date).tz(argv.time_zone)
      : moment(argv.from_date);

    const epochData = await subgraph.getEpochByFromTimestamp(
      from_time.utc().unix(),
    );
    from =
      epochData.epoches.length > 0 ? epochData.epoches[0].epoch : latestEpoch;
  }

  if (argv.to_date) {
    const to_time = argv.time_zone
      ? moment(argv.to_date).tz(argv.time_zone)
      : moment(argv.to_date);

    const epochData = await subgraph.getEpochByFromTimestamp(
      to_time.utc().unix(),
    );
    to =
      epochData.epoches.length > 0 ? epochData.epoches[0].epoch : latestEpoch;
  }

  if (from > to) {
    to = from;
  }

  if (to >= latestEpoch) {
    to = latestEpoch;
  }
  console.log('FROM EPOCH: ', from);
  console.log('TO EPOCH: ', to);

  return {
    from,
    to,
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
  priceTime.setUTCHours(0, 0, 0, 0);

  if (argv.price_time) {
    const datetime = moment(argv.price_time, 'HH:mm:ss');
    priceTime.setUTCHours(
      datetime.get('hour'),
      datetime.get('minute'),
      datetime.get('second'),
      0,
    );
  }

  console.log('Start getting oas prices');
  let oasPrices = {};

  if (argv.price) {
    const oasysPrice = await getOasPrice(argv.price, priceTime);
    oasPrices[argv.price] = oasysPrice;
  } else {
    oasPrices = await getOasPrices(priceTime);
  }
  console.log('Finish getting oas prices');
  return oasPrices;
}

export const exportCsvOnline = async (
  doc,
  rowData: string[][],
  timestamp: moment.Moment,
  header,
) => {
  const dataSheet = await getDataSheet(doc, timestamp, header);
  await dataSheet.addRows(rowData, {
    raw: true,
    insert: true,
  });
};

export const exportCsvLocal = async (
  rowData: string[][],
  header,
  fileName: string,
  oputput: string,
) => {
  const output_csv = oputput || `output_csv/${fileName}.csv`;
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
): Promise<boolean> => {
  // console.info(`Start handle export`);

  let doc: GoogleSpreadsheet;
  if (isOnline) {
    doc = await getSpreadSheet();
    await doc.loadInfo();
  }

  for (let i = 0; i < array.length; i++) {
    const { rowData, timestamp } = array[i];
    isOnline
      ? await exportCsvOnline(doc, rowData, timestamp, header)
      : await exportCsvLocal(rowData, header, fileName, output);
    // await sleep(1500);
  }
  // console.log('Export process complete!');
  return true;
};

export const getAdditionalDataForCommissionReward = (
  oasPrices: OasPrices,
  stakeData: validatorTotalStake[],
  timeData: TimeData,
  price: string,
  validator_address: string,
): {
  rowData: string[][];
  totalStakeData: TotalStakeData;
} => {
  const { epoch, block, timestamp } = timeData;

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
      return validatorTotalStake.gt(0);
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
        timestamp.format('YYYY/MM/DD HH:mm:ss'),
        utils.formatEther(validatorTotalStake).toString(),
        utils.formatEther(stake.dailyCommission).toString(),
        ...prices,
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
): {
  rowData: string[][];
} => {
  const { epoch, block, timestamp } = timeData;

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
      timestamp.format('YYYY-MM-DD HH:mm:ss'),
      utils.formatEther(stakeData.totalStake).toString(),
      utils.formatEther(stakeData.stakerReward).toString(),
      ...prices,
    ],
  ];
  return {
    rowData: rowData,
  };
};
