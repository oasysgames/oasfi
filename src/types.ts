import { BigNumber } from 'ethers';

export interface ValidatorStake {
  address: string;
  oas: BigNumber;
  soas: BigNumber;
  woas: BigNumber;
  dailyCommission: BigNumber;
  totalCommission: BigNumber;
  stakingReward: BigNumber;
  totalStaked: BigNumber;
}

export interface TotalStakeData {
  totalStake: BigNumber;
  totalOasStake: BigNumber;
  totalSoasStake: BigNumber;
  totalWoasStake: BigNumber;
}

export interface TimeData {
  epoch: string;
  block: string;
  timestamp: Date;
}

export interface OasPrices {
  [vsCurrency: string]: string;
}
export interface CorrectCsvArgs {
  input: string;
  output: string;
  chain: string;
}

export interface commissionRewardArgs {
  validator_address: string;
  staker_address: string;
  chain: string;
  from_epoch: number;
  to_epoch: number;
  from_data: string;
  to_data: string;
  price_time: string;
  time_zone: string;
  price: string;
  export_csv_online: string;
  output: string;
}
