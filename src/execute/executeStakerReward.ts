import moment = require('moment-timezone');
import { BigNumber } from 'ethers';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import {
  getAdditionalDataForStakerReward,
  getEpoches,
  getOasPricesForEpoch,
  handleExport,
} from '../module/ValidatorStake';
import { stakerRewardArgs } from '../types';
import { generateNumberArray } from '../utils';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_STAKER_REWARD,
  getSpreadSheet,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const main = async (argv: stakerRewardArgs) => {
  const subgraph = new Subgraph(argv.chain);
  //header for staker reward
  let header: string[] = HEADER_FOR_STAKER_REWARD;

  //set the address to lowercase
  const validator_address = argv.validator_address?.toLocaleLowerCase();
  const staker_address = argv.staker_address?.toLocaleLowerCase();

  //if API_KEY exists and price option exists => export that price otherwise export default price
  if (process.env.COINGECKO_API_KEY) {
    header = argv.price
      ? [...header, 'Oas price']
      : [...header, ...DEFAULT_LIST_PRICE];
  }
  //get the list of epochs based on the passed options
  const epoches = await getEpoches(argv, subgraph);

  let doc: GoogleSpreadsheet;
  if (argv.export_csv_online) {
    doc = await getSpreadSheet();
    await doc.loadInfo();
  }

  const loopAsync: number[] = generateNumberArray(epoches.from, epoches.to);
  //fetch data per epoch
  const data = await Promise.all(
    loopAsync.map(async (i: number) => {
      console.log('RUNNING EPOCH ', i);
      const epochData = await subgraph.getEpoch(i);
      const nextEpochData = await subgraph.getEpoch(i + 1);

      //validate epoches
      const epoch =
        typeof epochData.epoches[0].epoch === 'string'
          ? epochData.epoches[0].epoch
          : '';
      const block =
        typeof epochData.epoches[0].block === 'string'
          ? epochData.epoches[0].block
          : '';
      const nextBlockByEpoch =
        typeof nextEpochData.epoches[0].block === 'string'
          ? nextEpochData.epoches[0].block
          : '';
      if (!epoch) throw new Error('Can not get epoch data');
      if (!block) throw new Error('Can not get block data');
      if (!nextBlockByEpoch) throw new Error('Can not get block data');

      //get oas price per epoch
      //get price by time UTC
      const oasPrices =
        process.env.COINGECKO_API_KEY &&
        (await getOasPricesForEpoch(argv, epochData));

      //get totalStake of validator
      const validatorStake = await subgraph.getValidatorTotalStake(
        parseInt(epoch, 10),
        parseInt(block, 10),
        validator_address,
      );
      //export time local
      const timestamp = moment(epochData.epoches[0].timestamp * 1000);

      const timeData = {
        epoch,
        block,
        timestamp,
      };

      //Because use promise All, must get the staking reward of both epochs to calculate it
      // reward of this epoch
      const reward = await subgraph.getStakerReward(
        parseInt(block, 10),
        validator_address,
        staker_address,
      );

      const nextReward = await subgraph.getStakerReward(
        parseInt(nextBlockByEpoch, 10),
        validator_address,
        staker_address,
      );

      //get staker reward gap between epochs
      const stakerReward = BigNumber.from(nextReward).sub(
        BigNumber.from(reward),
      );

      //format data
      const { rowData } = getAdditionalDataForStakerReward(
        oasPrices,
        validatorStake,
        timeData,
        argv.price,
        stakerReward,
      );
      return {
        rowData,
        timestamp,
      };
    }),
  );
  //fileName is exported
  const fileName = `staker-reward-${argv.staker_address}`;
  await handleExport(
    data,
    Boolean(argv.export_csv_online),
    argv.output,
    fileName,
    header,
  );
};
