import moment = require("moment-timezone");


import {
  getDataSheet,
  getLastEpoch,
  getLatestSheet,
  getSpreadSheet,
  saveLastEpoch,
  getAdditionalData,
  saveTotalStakeAmount,
} from './../utils/google';
import { getOasPrice, getOasPrices } from './../service/coingecko';
import { OasPrices, commissionRewardArgs } from '../types';
import { getDateTimeByTZ, getEndDayByJP } from '../utils/date';
import { Subgraph } from '../utils/subgraph';

const BASE_RPC_URL: Record<string, string> = {
  tcgv_mainnet: process.env.TCGV_MAINNET_URL || "https://rpc.tcgverse.xyz/",
  tcgv_testnet: process.env.TCGV_TESTNET_URL || "",
  sandv_testnet: process.env.SANDV_TESTNET_URL || "",
  hub_mainnet: process.env.HUB_MAINNET_URL || "https://rpc.mainnet.oasys.games",
  eth_mainnet: process.env.ETH_MAINNET_URL || "",
  mch_mainnet:
    process.env.MCH_MAINNET_URL || "https://rpc.oasys.mycryptoheroes.net/",
  home_mainnet:
    process.env.HOME_MAINNET_URL ||
    "https://rpc.mainnet.oasys.homeverse.games/",
  saakuru_mainnet:
    process.env.SAAKURU_MAINNET_URL || "https://rpc.saakuru.network/",
  hub_testnet: process.env.HUB_TESTNET_URL || "",
};

export const commissionReward = async (argv: commissionRewardArgs) => {

  if (!argv.to_data) {

  }
  // let fromData = new Date(argv.from_data)
  // console.log(new Date(argv.from_data));
  // console.log(new Date(argv.from_data).toLocaleString());
  // console.log(new Date(argv.from_data).getTimezoneOffset());
  // // let {chain,from_data,to_data,from_epoch,to_epoch,price,price_coingeck_secret,price_time,validator_address,time_zone  } = argv
  // let from_data: Moment=getDateTimeByTZ(new Date(argv.from_data), argv.time_zone)
  // let to_data: Moment=getDateTimeByTZ(new Date(argv.to_data), argv.time_zone);



  const doc = await getSpreadSheet();
  await doc.loadInfo();

  const subgraph = new Subgraph(argv.chain);
  const latestEpoch = await subgraph.getLatestEpoch()

  let from: any;
  let to: any;
  if (argv.from_data) {
    from = await subgraph.getEpochByFromTimestamp(new Date(argv.from_data))
    to = argv.to_data ? await subgraph.getEpochByToTimestamp(new Date(argv.to_data)) : latestEpoch;
  } else if (argv.from_epoch) {
    from = argv.from_epoch
    to = argv.to_epoch || latestEpoch
  }

  if (argv.from_data && argv.from_epoch) {
    console.log("Require from data or from epoch");
    return
  }
  //setup for loop async
  const epochs = []
  for (let i = from; i <= to; i++) {
    epochs.push(i)
  }

  await Promise.all(
    epochs.map(async (i) => {
      const epochData = await subgraph.getEpoch(i);
      if (epochData.epoches.length == 0) {
        console.log(`epoch: can not nex to epoch ${epochData}`);
        return
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

      //return timestamp 
      // need fixx 
      const timestamp = new Date(
        parseInt(epochData.epoches[0].timestamp, 10) * 1000,
      );

      let priceTime = moment(timestamp).utc().startOf('day').toDate()

      if (argv?.price_time) {
        priceTime = moment(argv.price_time).toDate()
      }

      console.log('Start getting oas prices');
      let oasPrices: OasPrices = {};
      if (argv.price) {
        const oasysPrice = await getOasPrice(argv.price, priceTime);
        oasPrices[argv.price] = oasysPrice;
      }
      else {
        oasPrices = await getOasPrices(priceTime);
      }
      console.log('Finish getting oas prices');
      const validatorTotalStakes = await subgraph.getValidatorTotalStake(
        parseInt(epoch, 10),
        parseInt(block, 10),
        argv.validator_address
      );

      const timeData = {
        epoch,
        block,
        timestamp,
      };
      console.log("🚀 ~ file: Validator.ts:124 ~ commissionReward ~ timeData.timestamp:", timeData.timestamp)

      const { rowData, totalStakeData } = getAdditionalData(
        oasPrices,
        validatorTotalStakes,
        timeData,
        argv.price
      );

      //data sheet
      const dataSheet = await getDataSheet(doc, timestamp);
      await dataSheet.addRows(rowData, {
        raw: true,
        insert: true,
      });

      //latest sheet
      const latestSheet = await getLatestSheet(doc);
      await latestSheet.addRows(rowData, {
        raw: true,
        insert: true,
      });
      // await saveTotalStakeAmount(doc, timestamp, totalStakeData);
      // await saveLastEpoch(doc, 1);
    })
  ).then((res) => {
    console.log("SUCCESS");
  });


};


