import moment = require('moment-timezone');
import * as fsPromise from 'fs/promises';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as Papa from 'papaparse';
import { saveCsvToFile } from '../service/csvService';
import { commissionRewardArgs } from '../types';
import { writeFile } from '../utils/file';
import { Subgraph } from '../utils/subgraph';
import { getOasPrice, getOasPrices } from './../service/coingecko';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_GENERAL,
  getAdditionalData,
  getDataSheet,
  getSpreadSheet,
} from './../utils/google';

export const commissionReward = async (argv: commissionRewardArgs) => {
  const subgraph = new Subgraph(argv.chain);
  let header: string[] = HEADER_FOR_GENERAL

  if (process.env.COINGECKO_API_KEY) {
    header = argv.price
      ? [...header, 'Oas price']
      : [...header, ...DEFAULT_LIST_PRICE];
  }
  const epoches = await getEpoches(argv, subgraph);

  let doc: GoogleSpreadsheet;
  if (argv.export_csv_online) {
    doc = await getSpreadSheet();
    await doc.loadInfo();
  }

  const loopAsync = [];
  for (let i = epoches.from; i <= epoches.to; i++) {
    loopAsync.push(i);
  }

  const response = await Promise.all(
    loopAsync.map(async (i: number) => {
      console.log('RUNNING EPOCH ', i);
      const epochData = await subgraph.getEpoch(i);

      //validate epoches
      if (epochData.epoches.length == 0) {
        console.log(`epoch: can not nex to epoch ${epochData}`);
        return;
      }
      const epoch =
        typeof epochData.epoches[0].epoch === 'string'
          ? epochData.epoches[0].epoch
          : '';
      const block =
        typeof epochData.epoches[0].block === 'string'
          ? epochData.epoches[0].block
          : '';
      if (!epoch) throw new Error('Can not get epoch data');
      if (!block) throw new Error('Can not get block data');

      const timestamp = moment(epochData.epoches[0].timestamp * 1000).toDate();

      const oasPrices = process.env.COINGECKO_API_KEY ? await getOasPricesForEpoch(argv, epochData) : false

      const validatorTotalStakes = await subgraph.getValidatorTotalStake(
        parseInt(epoch, 10),
        parseInt(block, 10),
        argv.validator_address,
      );

      const timeData = {
        epoch,
        block,
        timestamp,
      };

      const { rowData } = getAdditionalData(
        oasPrices,
        validatorTotalStakes,
        timeData,
        argv.price,
      );
      return {
        rowData,
        timestamp,
      };
    }),
  );

  for (let i = 0; i < response.length; i++) {
    const { rowData, timestamp } = response[i];
    if (argv.export_csv_online) {
      await exportCsvOnline(doc, rowData, timestamp, header);
    } else {
      await exportCsvLocal(
        rowData,
        header,
        argv.validator_address,
        argv.output,
      );
    }
    await sleep(1500);
  }
};
const getEpoches = async (argv: commissionRewardArgs, subgraph: Subgraph) => {
  const latestEpoch = await subgraph.getLatestEpoch();
  let from = argv.from_epoch;
  let to = argv.to_epoch;

  if (!argv.to_epoch) {
    to = latestEpoch.epoches[0].epoch - 1;
  }

  if (!argv.from_epoch) {
    from = to - 31;
  }

  if (argv.from_data) {
    //specified timezone or local timezone
    const from_temp = argv.time_zone
      ? moment(argv.from_data).tz(argv.time_zone)
      : moment(argv.from_data);
    from = (await subgraph.getEpochByFromTimestamp(from_temp.utc().unix()))
      .epoches[0].epoch;
  }

  if (argv.to_data) {
    const to_temp = argv.time_zone
      ? moment(argv.to_data).tz(argv.time_zone)
      : moment(argv.to_data);
    to = (await subgraph.getEpochByFromTimestamp(to_temp.utc().unix()))
      .epoches[0].epoch;
  }

  if (from > to) {
    to = from;
  }

  if (to > latestEpoch.epoches[0].epoch) {
    to = latestEpoch.epoches[0].epoch;
  }
  console.log('FROM EPOCH: ', from);
  console.log('TO EPOCH: ', to);

  return {
    from,
    to,
  };
};

async function getOasPricesForEpoch(argv, epochData) {

  const timestamp = epochData.epoches[0].timestamp * 1000

  //Default 00:00:00 UTC
  let priceTime = new Date(timestamp);
  priceTime.setUTCHours(0, 0, 0, 0)

  if (argv.price_time) {
    const datetime = moment(argv.price_time, 'HH:mm:ss');
    priceTime.setUTCHours(datetime.get('hour'), datetime.get('minute'), datetime.get('second'), 0)
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

const exportCsvOnline = async (
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

const exportCsvLocal = async (
  rowData: string[][],
  header,
  address: string,
  oputput: string,
) => {
  const output_csv = oputput || `output_csv/comission-reward-${address}.csv`;
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

function convertArrayToObject(inputArray, header) {
  const resultObject = {};

  for (let i = 0; i < header.length; i++) {
    resultObject[header[i]] = inputArray[i];
  }

  return resultObject;
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
