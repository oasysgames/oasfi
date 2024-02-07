import moment = require('moment-timezone');
import { GoogleSpreadsheet } from 'google-spreadsheet';
import {
  exportCsv,
  getAdditionalDataForStakerReward,
  getEpoches,
  getOasPricesForEpoch,
} from '../module/RewardStakes';
import {
  DataExport,
  PrepareData,
  TimeData,
  Verse,
  stakerRewardArgs,
} from '../types';
import { generateNumberArray, isValidAddresses, sleep } from '../utils';
import { convertAddressesToArray } from '../utils/convert';
import { getTotalSecondProcess } from '../utils/date';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_STAKING_REWARD,
  getSpreadSheet,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const main = async (argv: stakerRewardArgs) => {
  const startTimeProcess = Date.now();

  // validate address
  const addresses = convertAddressesToArray(argv.staker_addresses);
  if (!isValidAddresses(addresses)) {
    return;
  }
  const subgraph = new Subgraph(argv.chain as Verse);
  // header for staker reward
  const header: string[] = getHeader(argv);

  // get the list of epoches based on the passed options
  const epoches = await getEpoches(argv, subgraph);

  let doc: GoogleSpreadsheet;
  if (argv.export_csv_online) {
    doc = await getSpreadSheet();
    await doc.loadInfo();
  }

  const loopAsync: number[] = generateNumberArray(epoches.from, epoches.to);

  const prepareData: PrepareData[] = await getPrepareData(
    loopAsync,
    subgraph,
    argv,
  );
  // data to export
  await handleExport(prepareData, subgraph, argv, header);

  const totalSecondsProcess = getTotalSecondProcess(startTimeProcess);
  console.log(`==> Total: ${totalSecondsProcess} seconds`);
};

const getHeader = (argv: stakerRewardArgs): string[] => {
  let header: string[] = HEADER_FOR_STAKING_REWARD;
  // if API_KEY exists and price option exists => export that price otherwise export default price
  if (process.env.COINGECKO_API_KEY) {
    header = argv.price
      ? [...header, 'Price timestamp UTC', 'Oas price']
      : [...header, 'Price timestamp UTC', ...DEFAULT_LIST_PRICE];
  }
  return header;
};

const getPrepareData = async (
  loopAsync: number[],
  subgraph: Subgraph,
  argv: stakerRewardArgs,
): Promise<PrepareData[]> => {
  return await Promise.all(
    loopAsync.map(async (i: number) => {
      const epochData = await subgraph.getEpoch(i);

      // validate epoches
      const epoch = epochData?.epoches?.[0]?.epoch;
      if (!epoch) throw new Error('Can not get epoch data');

      const block = epochData.epoches?.[0]?.block;
      if (!block) throw new Error('Can not get block data');

      // get price by time UTC
      // get oas price per epoch
      const priceData = await getOasPricesForEpoch(argv, epochData);

      await sleep(100);

      // export time local
      const timestamp = moment(epochData.epoches[0].timestamp * 1000);

      const timeData: TimeData = {
        epoch,
        block,
        timestamp,
      };

      return {
        oasPrices: priceData?.oasPrices,
        priceTime: priceData?.priceTime,
        timeData,
      };
    }),
  );
};
const handleExport = async (
  prepareData: PrepareData[],
  subgraph: Subgraph,
  argv: stakerRewardArgs,
  header: string[],
): Promise<DataExport[]> => {
  // set the address to lowercase
  const addresses = convertAddressesToArray(argv.staker_addresses);

  const results: DataExport[] = [];

  for (const item of prepareData) {
    const { oasPrices, timeData, priceTime } = item;
    const { block, epoch, timestamp } = timeData;
    const startTimeProcess = Date.now();
    console.log('PROCESSING WITH EPOCH', epoch);

    const promises = addresses?.map(async (address: string) => {
      const listStakerStake = await subgraph.getListStakerStake(
        block,
        address,
        epoch,
      );

      // format data
      const { rowData } = getAdditionalDataForStakerReward(
        oasPrices,
        listStakerStake,
        timeData,
        argv.price,
        address,
        priceTime,
      );

      await sleep(100);

      return {
        rowData,
        timestamp,
      };
    });

    const dataExport = await Promise.all(promises);
    // process export
    await exportCsv(
      dataExport,
      Boolean(argv.export_csv_online),
      argv.output,
      `staker-reward`,
      header,
    );
    results.push(...dataExport);
    const totalSecondsEpoch = getTotalSecondProcess(startTimeProcess);
    console.info(
      `-->Export at Epoch ${epoch} took ${totalSecondsEpoch} seconds`,
    );
  }
  return results;
};
