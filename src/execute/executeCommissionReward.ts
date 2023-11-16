import moment = require('moment-timezone');
import {
  getAdditionalDataForCommissionReward,
  getEpoches,
  getOasPricesForEpoch,
  handleExport,
} from '../module/ValidatorStake';
import { commissionRewardArgs } from '../types';
import { generateNumberArray } from '../utils';
import {
  DEFAULT_LIST_PRICE,
  HEADER_FOR_COMMISSION_REWARD,
} from '../utils/google';
import { Subgraph } from '../utils/subgraph';

export const main = async (argv: commissionRewardArgs) => {
  const subgraph = new Subgraph(argv.chain);
  //set the address to lowercase
  const validator_address = argv.validator_address?.toLocaleLowerCase();
  //header for staker reward
  let header: string[] = HEADER_FOR_COMMISSION_REWARD;
  //if API_KEY exists and price option exists => export that price otherwise export default price

  if (process.env.COINGECKO_API_KEY) {
    header = argv.price
      ? [...header, 'Oas price']
      : [...header, ...DEFAULT_LIST_PRICE];
  }
  //get the list of epochs based on the passed options
  const epoches = await getEpoches(argv, subgraph);

  const loopAsync: number[] = generateNumberArray(epoches.from, epoches.to);
  //fetch data per epoch
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

      //get price by time UTC
      //get oas price per epoch
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

      //format data
      const { rowData } = getAdditionalDataForCommissionReward(
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
  //fileName is exported
  const fileName = `comission-reward-${argv.validator_address}`;

  await handleExport(
    data,
    Boolean(argv.export_csv_online),
    argv.output,
    fileName,
    header,
  );
};
