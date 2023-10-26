import { CoinGeckoClient } from 'coingecko-api-v3';
import { OasPrices } from './../types';

const client = new CoinGeckoClient(
  {
    timeout: 3000,
    autoRetry: true,
  },
  process.env.COINGECKO_API_KEY,
);

const id = 'oasys';
const vsCurrencies = ['jpy', 'usd', 'krw', 'eur', 'sgd'];

const fiveMinuteInterval = 300;
const hourInterval = 3600;
const dayInterval = 86400;

const getOasPriceByRange = async (
  vsCurrency: string,
  date: Date,
  interval: number,
) => {
  const fromTimestamp = Math.floor(date.getTime() / 1000); // unix timestamp
  const toTimestamp = fromTimestamp + interval;

  if (toTimestamp > Math.floor(Date.now() / 1000)) {
    throw new Error('toTimestamp is in the future');
  }

  const marketChart = await client.coinIdMarketChartRange({
    id,
    vs_currency: vsCurrency,
    from: fromTimestamp,
    to: toTimestamp,
  });

  if (marketChart.prices.length > 0) {
    // If only one oas price can be obtained
    const oasPrice = marketChart.prices[0][1];
    return oasPrice.toString();
  }
  return undefined; // If multiple oas price can be obtained or when OAS is not listed.
};

export const getOasPrice = async (vsCurrency: string, date: Date) => {
  let oasPrice: string;

  oasPrice = await getOasPriceByRange(vsCurrency, date, fiveMinuteInterval);
  if (oasPrice !== undefined) {
    return oasPrice;
  }

  oasPrice = await getOasPriceByRange(vsCurrency, date, hourInterval);
  if (oasPrice !== undefined) {
    return oasPrice;
  }

  oasPrice = await getOasPriceByRange(vsCurrency, date, dayInterval);
  if (oasPrice !== undefined) {
    return oasPrice;
  }
  return '';
};

export const getOasPrices = async (date: Date) => {
  const oasPrices: OasPrices = {};

  await Promise.all(
    vsCurrencies.map(async (vsCurrency) => {
      const oasPrice = await getOasPrice(vsCurrency, date);
      oasPrices[vsCurrency] = oasPrice;
    }),
  );
  return oasPrices;
};
