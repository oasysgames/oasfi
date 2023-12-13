import moment = require('moment-timezone');
import { GoogleSpreadsheet } from 'google-spreadsheet';
import {
  getAdditionalDataForStakerReward,
  getEpoches,
  getOasPricesForEpoch,
  handleExport,
} from '../module/RewardStakes';
import {
  DataExport,
  OasPrices,
  PrepareData,
  TimeData,
  Verse,
  stakerRewardArgs,
} from '../types';
import {
  generateNumberArray,
  isValidAddresses,
  sortByTimeStamp,
} from '../utils';
import { convertAddressesToArray } from '../utils/convert';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_STAKING_REWARD,
  getSpreadSheet,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const main = async (argv: stakerRewardArgs) => {
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
  let dataExport: DataExport[] = await getDataExport(
    prepareData,
    subgraph,
    argv,
  );

  //sort by timestamp
  dataExport = sortByTimeStamp(dataExport, 'asc');

  // process export
  await handleExport(
    dataExport,
    Boolean(argv.export_csv_online),
    argv.output,
    `staker-reward`,
    header,
  );
};

const getHeader = (argv: stakerRewardArgs): string[] => {
  let header: string[] = HEADER_FOR_STAKING_REWARD;
  // if API_KEY exists and price option exists => export that price otherwise export default price
  if (process.env.COINGECKO_API_KEY) {
    header = argv.price
      ? [...header, 'Oas price']
      : [...header, ...DEFAULT_LIST_PRICE];
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
      const oasPrices: OasPrices = await getOasPricesForEpoch(argv, epochData);

      // export time local
      const timestamp = moment(epochData.epoches[0].timestamp * 1000);

      const timeData: TimeData = {
        epoch,
        block,
        timestamp,
      };

      return {
        oasPrices,
        timeData,
      };
    }),
  );
};
const getDataExport = async (
  prepareData: PrepareData[],
  subgraph: Subgraph,
  argv: stakerRewardArgs,
): Promise<DataExport[]> => {
  // set the address to lowercase
  const addresses = convertAddressesToArray(argv.staker_addresses);
  const resultsPromise = prepareData.map(async (item: PrepareData) => {
    const { oasPrices, timeData } = item;
    const { block, epoch, timestamp } = timeData;
    console.log('RUNNING EPOCH ', epoch);

    const validatorResults = await Promise.all(
      addresses?.map(async (address: string) => {
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
        );
        return {
          rowData,
          timestamp,
        };
      }),
    );

    return validatorResults;
  });

  const results = await Promise.all(resultsPromise);
  return results.flat();
};
