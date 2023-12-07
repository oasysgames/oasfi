import { BigNumber } from 'ethers';
import { Moment } from 'moment-timezone';

export interface validatorTotalStake {
  address: string;
  oas: BigNumber;
  soas: BigNumber;
  woas: BigNumber;
  dailyCommission: BigNumber;
  totalCommission: BigNumber;
}

export interface stakerStake {
  address: string;
  totalStake: BigNumber;
  stakerReward: BigNumber;
}
export interface IEpochReward {
  address: string;
  commissions: BigNumber;
  rewards: BigNumber;
  epoch: number;
}
export interface TotalStakeData {
  totalStake: BigNumber;
  totalOasStake: BigNumber;
  totalSoasStake: BigNumber;
  totalWoasStake: BigNumber;
}

export interface TimeData {
  epoch: number;
  block: number;
  prevBlockByEpoch?: number;
  timestamp: Moment;
}

export interface OasPrices {
  [vsCurrency: string]: string;
}
export interface CorrectCsvArgs {
  input: string;
  output: string;
  chain: string;
}

export interface validatorRewardArgs {
  validator_addresses: string;
  chain: string;
  from_epoch: number;
  to_epoch: number;
  from_date: string;
  to_date: string;
  price_time: string;
  time_zone: string;
  price: string;
  export_csv_online: string;
  output: string;
}

export interface stakerRewardArgs {
  staker_addresses: string;
  chain: string;
  from_epoch: number;
  to_epoch: number;
  from_date: string;
  to_date: string;
  price_time: string;
  time_zone: string;
  price: string;
  export_csv_online: string;
  output: string;
}

export interface PrepareData {
  oasPrices: OasPrices;
  timeData: TimeData;
  prevBlockByEpoch?: string;
}

export interface DataExport {
  rowData: string[][];
  timestamp: moment.Moment;
}
