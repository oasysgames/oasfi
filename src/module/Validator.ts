import moment = require("moment-timezone");


import {
  getDataSheet,
  getLatestSheet,
  getSpreadSheet,
  getAdditionalData,
  HEADER_FOR_GENERAL_ONLY_ONE_PRICE,
  HEADER_FOR_GENERAL_MULTI_PRICE,
} from './../utils/google';
import { getOasPrice, getOasPrices } from './../service/coingecko';
import { OasPrices, commissionRewardArgs } from '../types';
import { Subgraph } from '../utils/subgraph';

export const commissionReward = async (argv: commissionRewardArgs) => {
  const doc = await getSpreadSheet();
  await doc.loadInfo();
  const subgraph = new Subgraph(argv.chain);
  const latestEpoch = await subgraph.getLatestEpoch()

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
    let from_temp = argv.time_zone ? moment(argv.from_data).tz(argv.time_zone) : moment(argv.from_data)
    from = (await subgraph.getEpochByFromTimestamp(from_temp.utc().unix())).epoches[0].epoch;
  }

  if (argv.to_data) {
    let to_temp = argv.time_zone ? moment(argv.to_data).tz(argv.time_zone) : moment(argv.to_data)
    to = (await subgraph.getEpochByFromTimestamp(to_temp.utc().unix())).epoches[0].epoch;
  }

  if (from > to) {
    to = from
  }


  console.log("FROM EPOCH: ", from);
  console.log("TO EPOCH: ", to);

  for (let i = from; i <= to; i++) {
    console.log("RUNNING EPOCH ", i);

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
    const timestamp = moment(epochData.epoches[0].timestamp*1000).toDate()
    //default 00:00:00 UTC
    let priceTime = moment(timestamp).utc().startOf('day').toDate()
    if (argv.price_time) {
      const datetime = moment(argv.price_time, "HH:mm:ss")
      priceTime = moment(timestamp).set({
        hour: datetime.get('hour'),
        minute: datetime.get('minute'),
        second: datetime.get('second')
      }).toDate()
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

    const { rowData, totalStakeData } = getAdditionalData(
      oasPrices,
      validatorTotalStakes,
      timeData,
      argv.price
    );

    //data sheet
    const header = argv.price ? HEADER_FOR_GENERAL_ONLY_ONE_PRICE : HEADER_FOR_GENERAL_MULTI_PRICE
    const dataSheet = await getDataSheet(doc, timestamp, header);
    await dataSheet.addRows(rowData, {
      raw: true,
      insert: true,
    });

    //latest sheet
    const latestSheet = await getLatestSheet(doc, header);
    await latestSheet.addRows(rowData, {
      raw: true,
      insert: true,
    });
    // await saveTotalStakeAmount(doc, timestamp, totalStakeData);
    // await saveLastEpoch(doc, 1);
    await sleep(5000)
  }


  //setup for loop async
  // const epochs = []
  // for (let i = from; i <= to; i++) {
  //   epochs.push(i)
  // }

  // await Promise.all(
  //   epochs.map(async (i) => {

  //   })
  // ).then((res) => {
  //   console.log("SUCCESS");
  // });
};


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}