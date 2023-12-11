import moment = require('moment-timezone');
import {
  getAdditionalDataForCommissionReward,
  getEpoches,
  getOasPricesForEpoch,
  handleExport,
} from '../module/RewardStakes';
import {
  DataExport,
  OasPrices,
  PrepareData,
  TimeData,
  validatorRewardArgs,
} from '../types';
import { generateNumberArray, sortByTimeStamp } from '../utils';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_VALIDATOR_REWARD,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';
// main process
export const main = async (argv: validatorRewardArgs) => {
  const subgraph = new Subgraph(argv.chain);

  // header for validator reward
  const header: string[] = getHeader(argv);

  // get the list of epochs based on the passed options
  const epoches = await getEpoches(argv, subgraph);

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
    'commission-reward',
    header,
  );
};

const getHeader = (argv: validatorRewardArgs): string[] => {
  let header: string[] = HEADER_FOR_VALIDATOR_REWARD;
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
  argv: validatorRewardArgs,
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
  argv: validatorRewardArgs,
): Promise<DataExport[]> => {
  // Set the address to lowercase
  const validator_addresses = argv.validator_addresses
    ?.toLowerCase()
    ?.split(',');

  const resultsPromise = prepareData.map(async (item: PrepareData) => {
    const { oasPrices, timeData } = item;
    const { block, epoch, timestamp } = timeData;
    console.log('RUNNING EPOCH ', epoch);

    const validatorResults = await Promise.all(
      validator_addresses?.map(async (address: string) => {
        const validatorAddress = address?.trim();
        // Get totalStake of validator
        const validatorStake = await subgraph.getValidatorTotalStake(
          epoch,
          block,
          validatorAddress,
        );

        // Format data
        const { rowData } = getAdditionalDataForCommissionReward(
          oasPrices,
          validatorStake,
          timeData,
          argv.price,
          validatorAddress,
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
