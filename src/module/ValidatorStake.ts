import moment = require('moment-timezone');
import { getOasPrice, getOasPrices } from '../service/coingecko';
import { commissionRewardArgs } from '../types';
import { Subgraph } from '../utils/subgraph';

export const getEpoches = async (
  argv: commissionRewardArgs,
  subgraph: Subgraph,
) => {
  const latestEpoch = await subgraph.getLatestEpoch();
  let from = argv.from_epoch;
  let to = argv.to_epoch;

  if (!argv.to_epoch) {
    to = latestEpoch.epoches[0]?.epoch - 1;
  }

  if (!argv.from_epoch) {
    from = to - 31;
  }

  if (argv.from_data) {
    //specified timezone or local timezone
    const from_time = argv.time_zone
      ? moment(argv.from_data).tz(argv.time_zone)
      : moment(argv.from_data);

    const epochData = await subgraph.getEpochByFromTimestamp(
      from_time.utc().unix(),
    );
    from =
      epochData.epoches.length > 0
        ? epochData.epoches[0].epoch
        : latestEpoch.epoches[0].epoch;
  }

  if (argv.to_data) {
    const to_time = argv.time_zone
      ? moment(argv.to_data).tz(argv.time_zone)
      : moment(argv.to_data);

    const epochData = await subgraph.getEpochByFromTimestamp(
      to_time.utc().unix(),
    );
    to =
      epochData.epoches.length > 0
        ? epochData.epoches[0].epoch
        : latestEpoch.epoches[0].epoch;
  }

  if (from > to) {
    to = from;
  }

  if (to > latestEpoch.epoches[0].epoch) {
    to = latestEpoch.epoches[0].epoch;
  }
  console.log('FROM EPOCH: ', from);
  console.log('TO EPOCH: ', to);

  return {
    from,
    to,
  };
};

export async function getOasPricesForEpoch(argv, epochData) {
  const timestamp = epochData.epoches[0].timestamp * 1000;

  //Default 00:00:00 UTC
  const priceTime = new Date(timestamp);
  priceTime.setUTCHours(0, 0, 0, 0);

  if (argv.price_time) {
    const datetime = moment(argv.price_time, 'HH:mm:ss');
    priceTime.setUTCHours(
      datetime.get('hour'),
      datetime.get('minute'),
      datetime.get('second'),
      0,
    );
  }

  console.log('Start getting oas prices');
  let oasPrices = {};

  if (argv.price) {
    const oasysPrice = await getOasPrice(argv.price, priceTime);
    oasPrices[argv.price] = oasysPrice;
  } else {
    oasPrices = await getOasPrices(priceTime);
  }
  console.log('Finish getting oas prices');
  return oasPrices;
}
