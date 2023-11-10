import moment = require('moment-timezone');
import { GoogleSpreadsheet } from 'google-spreadsheet';
import {
  getAdditionalDataForStakingReward,
  getEpoches,
  getOasPricesForEpoch,
  handleExport,
} from '../module/ValidatorStake';
import { stakingRewardArgs } from '../types';
import { generateNumberArray } from '../utils';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_STAKING_REWARD,
  getSpreadSheet,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const main = async (argv: stakingRewardArgs) => {
  const subgraph = new Subgraph(argv.chain);
  let header: string[] = HEADER_FOR_STAKING_REWARD;
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

  const loopAsync = generateNumberArray(epoches.from, epoches.to);

  const data = await Promise.all(
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

      const timestamp = moment(epochData.epoches[0].timestamp * 1000);
      const oasPrices =
        process.env.COINGECKO_API_KEY &&
        (await getOasPricesForEpoch(argv, epochData));

      const validatorStake = await subgraph.getValidatorTotalStake(
        parseInt(epoch, 10),
        parseInt(block, 10),
        validator_address,
      );
      const timeData = {
        epoch,
        block,
        timestamp,
      };
      const stakingReward = await subgraph.getStakingReward(
        parseInt(block, 10),
        validator_address,
        staker_address,
      );

      const { rowData } = getAdditionalDataForStakingReward(
        oasPrices,
        validatorStake,
        timeData,
        argv.price,
        stakingReward,
      );
      return {
        rowData,
        timestamp,
      };
    }),
  );

  const fileName = `staking-reward-${argv.staker_address}`;
  await handleExport(
    data,
    Boolean(argv.export_csv_online),
    argv.output,
    fileName,
    header,
  );
};
