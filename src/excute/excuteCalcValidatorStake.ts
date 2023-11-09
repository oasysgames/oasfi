import moment = require('moment-timezone');
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { getEpoches, getOasPricesForEpoch } from '../module/ValidatorStake';
import { commissionRewardArgs } from '../types';
import { sleep } from '../utils';
import { LogUtils } from '../utils/Logger';
import { exportCsvLocal, exportCsvOnline } from '../utils/csv';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_GENERAL,
  getAdditionalData,
  getSpreadSheet,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const main = async (argv: commissionRewardArgs) => {
  const subgraph = new Subgraph(argv.chain);
  let header: string[] = HEADER_FOR_GENERAL;
  const validator_address = argv.validator_address?.toLocaleLowerCase();
  const staker_address = argv.staker_address?.toLocaleLowerCase();

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

      const oasPrices =
        process.env.COINGECKO_API_KEY &&
        (await getOasPricesForEpoch(argv, epochData));

      const validatorStake = await subgraph.statisticValidatorStake(
        parseInt(epoch, 10),
        parseInt(block, 10),
        validator_address,
        staker_address,
      );

      const timeData = {
        epoch,
        block,
        timestamp,
      };

      const { rowData } = getAdditionalData(
        oasPrices,
        validatorStake,
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
        validator_address,
        staker_address,
        argv.output,
      );
    }
    await sleep(1500);
  }
};

export async function processValidatorStake(args: commissionRewardArgs) {
  try {
    await main(args);
  } catch (error) {
    const Logger = new LogUtils('log-commission', 'log-error.txt');
    console.log(error);
    Logger.log('error', `${error}`);
  }
}
