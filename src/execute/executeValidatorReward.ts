import moment = require('moment-timezone');
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { MAX_RETRIES, RETRY_INTERVAL_MS } from '../contants/common';
import {
  exportCsv,
  getAdditionalDataForCommissionReward,
  getEpoches,
  getLastDataFetchedByEpoch,
  getOasPricesForEpoch,
} from '../module/RewardStakes';
import { PrepareData, TimeData, Verse, validatorRewardArgs } from '../types';
import { generateNumberArray, isValidAddresses, sleep } from '../utils';
import { convertAddressesToArray } from '../utils/convert';
import { getTotalSecondProcess } from '../utils/date';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_VALIDATOR_REWARD,
  getSpreadSheet,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';

const getHeader = (argv: validatorRewardArgs): string[] => {
  let header: string[] = HEADER_FOR_VALIDATOR_REWARD;
  // if API_KEY exists and price option exists => export that price otherwise export default price

  if (process.env.COINGECKO_API_KEY) {
    header = argv.price
      ? [...header, 'Oas price', 'Price timestamp UTC']
      : [...header, ...DEFAULT_LIST_PRICE, 'Price timestamp UTC'];
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
  argv: validatorRewardArgs,
  header: string[],
): Promise<void> => {
  const validator_addresses = convertAddressesToArray(argv.validator_addresses);
  let numberOfRetries = 0;

  let doc: GoogleSpreadsheet;
  if (Boolean(argv.export_csv_online)) {
    doc = await getSpreadSheet();
    await doc.loadInfo();
  }

  for (let i = 0; i < prepareData.length; i++) {

    try {
      await processExportByEpoch(
        prepareData[i],
        validator_addresses,
        subgraph,
        argv,
        header,
        doc,
      );
    } catch (error) {
      console.log(error);
      numberOfRetries += 1;
      await sleep(RETRY_INTERVAL_MS);

      console.log('\n----------Trying again----------');
      console.log('\n----------Please wait!----------');

      if (numberOfRetries > MAX_RETRIES) {
        throw error;
      }
      i = -1; // Reset the loop counter to 0 after error
    }
  }
};

const processExportByEpoch = async (
  item: PrepareData,
  validator_addresses: string[],
  subgraph: Subgraph,
  argv: validatorRewardArgs,
  header: string[],
  doc: GoogleSpreadsheet,
) => {
  try {
    const { oasPrices, timeData, priceTime } = item;
    const { block, epoch, timestamp } = timeData;

    const result = await getLastDataFetchedByEpoch(
      doc,
      header,
      argv,
      timestamp,
      'Validator address',
      'commission-reward',
      argv.output,
    );
        

    if (Number(epoch) < Number(result.epoch)) {
      return;
    }

    const startTimeProcess = Date.now();
    console.log('PROCESSING WITH EPOCH', epoch);

    const promises = [];

    validator_addresses.forEach(async (address: string) => {
      const validatorAddress = address;

      if (
        !(result.epoch == epoch && result.addresses.includes(validatorAddress))
      ) {
        const promise = (async () => {
          const validatorStake = await subgraph.getValidatorTotalStake(
            epoch,
            block,
            validatorAddress,
          );
          
          const { rowData } = getAdditionalDataForCommissionReward(
            oasPrices,
            validatorStake,
            timeData,
            argv.price,
            validatorAddress,
            priceTime,
          );
       
          await sleep(100);

          return {
            rowData,
            timestamp,
          };
        })();

        promises.push(promise);
      }
    });

    if (promises?.length == 0) {
      return;
    }

    const dataExport = await Promise.all(promises);
    
    // process export
    await exportCsv(
      dataExport,
      Boolean(argv.export_csv_online),
      argv.output,
      'commission-reward',
      header,
      doc,
    );
        const totalSecondsEpoch = getTotalSecondProcess(startTimeProcess);
    console.info(
      `-->Export at Epoch ${epoch} took ${totalSecondsEpoch} seconds`,
    );
  } catch (error) {
    throw error;
  }
};

// main process
const main = async (argv: validatorRewardArgs) => {
  const startTimeProcess = Date.now();

  // validate address
  const addresses = convertAddressesToArray(argv.validator_addresses);
  if (!isValidAddresses(addresses)) {
    return;
  }

  const subgraph = new Subgraph(argv.chain as Verse);

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
  await handleExport(prepareData, subgraph, argv, header);

  const totalSecondsProcess = getTotalSecondProcess(startTimeProcess);
  console.log(`==> Total: ${totalSecondsProcess} seconds`);
};

export default main;
