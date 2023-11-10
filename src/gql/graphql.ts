/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

/** The block at which the query should be executed. */
export type Block_Height = {
  /** Value containing a block hash */
  hash?: InputMaybe<Scalars['Bytes']>;
  /** Value containing a block number */
  number?: InputMaybe<Scalars['Int']>;
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   *
   */
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type EnvironmentValue = {
  __typename?: 'EnvironmentValue';
  blockPeriod: Scalars['Int'];
  commissionRate: Scalars['BigDecimal'];
  epochPeriod: Scalars['Int'];
  id: Scalars['ID'];
  jailPeriod: Scalars['Int'];
  rewardRate: Scalars['BigDecimal'];
  validatorThreshold: Scalars['BigInt'];
};

export type EnvironmentValue_Filter = {
  blockPeriod?: InputMaybe<Scalars['Int']>;
  blockPeriod_gt?: InputMaybe<Scalars['Int']>;
  blockPeriod_gte?: InputMaybe<Scalars['Int']>;
  blockPeriod_in?: InputMaybe<Array<Scalars['Int']>>;
  blockPeriod_lt?: InputMaybe<Scalars['Int']>;
  blockPeriod_lte?: InputMaybe<Scalars['Int']>;
  blockPeriod_not?: InputMaybe<Scalars['Int']>;
  blockPeriod_not_in?: InputMaybe<Array<Scalars['Int']>>;
  commissionRate?: InputMaybe<Scalars['BigDecimal']>;
  commissionRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  commissionRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  commissionRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  commissionRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  commissionRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  commissionRate_not?: InputMaybe<Scalars['BigDecimal']>;
  commissionRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  epochPeriod?: InputMaybe<Scalars['Int']>;
  epochPeriod_gt?: InputMaybe<Scalars['Int']>;
  epochPeriod_gte?: InputMaybe<Scalars['Int']>;
  epochPeriod_in?: InputMaybe<Array<Scalars['Int']>>;
  epochPeriod_lt?: InputMaybe<Scalars['Int']>;
  epochPeriod_lte?: InputMaybe<Scalars['Int']>;
  epochPeriod_not?: InputMaybe<Scalars['Int']>;
  epochPeriod_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  jailPeriod?: InputMaybe<Scalars['Int']>;
  jailPeriod_gt?: InputMaybe<Scalars['Int']>;
  jailPeriod_gte?: InputMaybe<Scalars['Int']>;
  jailPeriod_in?: InputMaybe<Array<Scalars['Int']>>;
  jailPeriod_lt?: InputMaybe<Scalars['Int']>;
  jailPeriod_lte?: InputMaybe<Scalars['Int']>;
  jailPeriod_not?: InputMaybe<Scalars['Int']>;
  jailPeriod_not_in?: InputMaybe<Array<Scalars['Int']>>;
  rewardRate?: InputMaybe<Scalars['BigDecimal']>;
  rewardRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rewardRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rewardRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rewardRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rewardRate_not?: InputMaybe<Scalars['BigDecimal']>;
  rewardRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  validatorThreshold?: InputMaybe<Scalars['BigInt']>;
  validatorThreshold_gt?: InputMaybe<Scalars['BigInt']>;
  validatorThreshold_gte?: InputMaybe<Scalars['BigInt']>;
  validatorThreshold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  validatorThreshold_lt?: InputMaybe<Scalars['BigInt']>;
  validatorThreshold_lte?: InputMaybe<Scalars['BigInt']>;
  validatorThreshold_not?: InputMaybe<Scalars['BigInt']>;
  validatorThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum EnvironmentValue_OrderBy {
  BlockPeriod = 'blockPeriod',
  CommissionRate = 'commissionRate',
  EpochPeriod = 'epochPeriod',
  Id = 'id',
  JailPeriod = 'jailPeriod',
  RewardRate = 'rewardRate',
  ValidatorThreshold = 'validatorThreshold'
}

export type Epoch = {
  __typename?: 'Epoch';
  block: Scalars['BigInt'];
  epoch: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
};

export type EpochReward = {
  __typename?: 'EpochReward';
  address: Scalars['Bytes'];
  commissions: Scalars['BigInt'];
  epoch: Scalars['BigInt'];
  id: Scalars['ID'];
  rewards: Scalars['BigInt'];
};

export type EpochReward_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  commissions?: InputMaybe<Scalars['BigInt']>;
  commissions_gt?: InputMaybe<Scalars['BigInt']>;
  commissions_gte?: InputMaybe<Scalars['BigInt']>;
  commissions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  commissions_lt?: InputMaybe<Scalars['BigInt']>;
  commissions_lte?: InputMaybe<Scalars['BigInt']>;
  commissions_not?: InputMaybe<Scalars['BigInt']>;
  commissions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epoch?: InputMaybe<Scalars['BigInt']>;
  epoch_gt?: InputMaybe<Scalars['BigInt']>;
  epoch_gte?: InputMaybe<Scalars['BigInt']>;
  epoch_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epoch_lt?: InputMaybe<Scalars['BigInt']>;
  epoch_lte?: InputMaybe<Scalars['BigInt']>;
  epoch_not?: InputMaybe<Scalars['BigInt']>;
  epoch_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rewards?: InputMaybe<Scalars['BigInt']>;
  rewards_gt?: InputMaybe<Scalars['BigInt']>;
  rewards_gte?: InputMaybe<Scalars['BigInt']>;
  rewards_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewards_lt?: InputMaybe<Scalars['BigInt']>;
  rewards_lte?: InputMaybe<Scalars['BigInt']>;
  rewards_not?: InputMaybe<Scalars['BigInt']>;
  rewards_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum EpochReward_OrderBy {
  Address = 'address',
  Commissions = 'commissions',
  Epoch = 'epoch',
  Id = 'id',
  Rewards = 'rewards'
}

export type Epoch_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epoch?: InputMaybe<Scalars['BigInt']>;
  epoch_gt?: InputMaybe<Scalars['BigInt']>;
  epoch_gte?: InputMaybe<Scalars['BigInt']>;
  epoch_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epoch_lt?: InputMaybe<Scalars['BigInt']>;
  epoch_lte?: InputMaybe<Scalars['BigInt']>;
  epoch_not?: InputMaybe<Scalars['BigInt']>;
  epoch_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Epoch_OrderBy {
  Block = 'block',
  Epoch = 'epoch',
  Id = 'id',
  Timestamp = 'timestamp'
}

export type LockedUnstake = {
  __typename?: 'LockedUnstake';
  amount: Scalars['BigInt'];
  claimed: Scalars['Boolean'];
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  staker: Staker;
  token: Scalars['Int'];
  unlockTime: Scalars['Int'];
};

export type LockedUnstake_Filter = {
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimed?: InputMaybe<Scalars['Boolean']>;
  claimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  claimed_not?: InputMaybe<Scalars['Boolean']>;
  claimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  staker?: InputMaybe<Scalars['String']>;
  staker_contains?: InputMaybe<Scalars['String']>;
  staker_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_ends_with?: InputMaybe<Scalars['String']>;
  staker_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_gt?: InputMaybe<Scalars['String']>;
  staker_gte?: InputMaybe<Scalars['String']>;
  staker_in?: InputMaybe<Array<Scalars['String']>>;
  staker_lt?: InputMaybe<Scalars['String']>;
  staker_lte?: InputMaybe<Scalars['String']>;
  staker_not?: InputMaybe<Scalars['String']>;
  staker_not_contains?: InputMaybe<Scalars['String']>;
  staker_not_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_not_ends_with?: InputMaybe<Scalars['String']>;
  staker_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_not_in?: InputMaybe<Array<Scalars['String']>>;
  staker_not_starts_with?: InputMaybe<Scalars['String']>;
  staker_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  staker_starts_with?: InputMaybe<Scalars['String']>;
  staker_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Int']>;
  token_gt?: InputMaybe<Scalars['Int']>;
  token_gte?: InputMaybe<Scalars['Int']>;
  token_in?: InputMaybe<Array<Scalars['Int']>>;
  token_lt?: InputMaybe<Scalars['Int']>;
  token_lte?: InputMaybe<Scalars['Int']>;
  token_not?: InputMaybe<Scalars['Int']>;
  token_not_in?: InputMaybe<Array<Scalars['Int']>>;
  unlockTime?: InputMaybe<Scalars['Int']>;
  unlockTime_gt?: InputMaybe<Scalars['Int']>;
  unlockTime_gte?: InputMaybe<Scalars['Int']>;
  unlockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  unlockTime_lt?: InputMaybe<Scalars['Int']>;
  unlockTime_lte?: InputMaybe<Scalars['Int']>;
  unlockTime_not?: InputMaybe<Scalars['Int']>;
  unlockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum LockedUnstake_OrderBy {
  Amount = 'amount',
  Claimed = 'claimed',
  Id = 'id',
  Index = 'index',
  Staker = 'staker',
  Token = 'token',
  UnlockTime = 'unlockTime'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Overview = {
  __typename?: 'Overview';
  _expectedTotalRewards: Scalars['BigInt'];
  _pendingStake: Scalars['BigInt'];
  _pendingUnstake: Scalars['BigInt'];
  candidateValidatorCount: Scalars['Int'];
  id: Scalars['ID'];
  network: Scalars['Int'];
  realRewardRate: Scalars['BigDecimal'];
  stakerCount: Scalars['Int'];
  totalRewards: Scalars['BigInt'];
  totalStake: Scalars['BigInt'];
  validatorCount: Scalars['Int'];
};

export type Overview_Filter = {
  _expectedTotalRewards?: InputMaybe<Scalars['BigInt']>;
  _expectedTotalRewards_gt?: InputMaybe<Scalars['BigInt']>;
  _expectedTotalRewards_gte?: InputMaybe<Scalars['BigInt']>;
  _expectedTotalRewards_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _expectedTotalRewards_lt?: InputMaybe<Scalars['BigInt']>;
  _expectedTotalRewards_lte?: InputMaybe<Scalars['BigInt']>;
  _expectedTotalRewards_not?: InputMaybe<Scalars['BigInt']>;
  _expectedTotalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _pendingStake?: InputMaybe<Scalars['BigInt']>;
  _pendingStake_gt?: InputMaybe<Scalars['BigInt']>;
  _pendingStake_gte?: InputMaybe<Scalars['BigInt']>;
  _pendingStake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _pendingStake_lt?: InputMaybe<Scalars['BigInt']>;
  _pendingStake_lte?: InputMaybe<Scalars['BigInt']>;
  _pendingStake_not?: InputMaybe<Scalars['BigInt']>;
  _pendingStake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _pendingUnstake?: InputMaybe<Scalars['BigInt']>;
  _pendingUnstake_gt?: InputMaybe<Scalars['BigInt']>;
  _pendingUnstake_gte?: InputMaybe<Scalars['BigInt']>;
  _pendingUnstake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _pendingUnstake_lt?: InputMaybe<Scalars['BigInt']>;
  _pendingUnstake_lte?: InputMaybe<Scalars['BigInt']>;
  _pendingUnstake_not?: InputMaybe<Scalars['BigInt']>;
  _pendingUnstake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  candidateValidatorCount?: InputMaybe<Scalars['Int']>;
  candidateValidatorCount_gt?: InputMaybe<Scalars['Int']>;
  candidateValidatorCount_gte?: InputMaybe<Scalars['Int']>;
  candidateValidatorCount_in?: InputMaybe<Array<Scalars['Int']>>;
  candidateValidatorCount_lt?: InputMaybe<Scalars['Int']>;
  candidateValidatorCount_lte?: InputMaybe<Scalars['Int']>;
  candidateValidatorCount_not?: InputMaybe<Scalars['Int']>;
  candidateValidatorCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  network?: InputMaybe<Scalars['Int']>;
  network_gt?: InputMaybe<Scalars['Int']>;
  network_gte?: InputMaybe<Scalars['Int']>;
  network_in?: InputMaybe<Array<Scalars['Int']>>;
  network_lt?: InputMaybe<Scalars['Int']>;
  network_lte?: InputMaybe<Scalars['Int']>;
  network_not?: InputMaybe<Scalars['Int']>;
  network_not_in?: InputMaybe<Array<Scalars['Int']>>;
  realRewardRate?: InputMaybe<Scalars['BigDecimal']>;
  realRewardRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  realRewardRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  realRewardRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  realRewardRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  realRewardRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  realRewardRate_not?: InputMaybe<Scalars['BigDecimal']>;
  realRewardRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  stakerCount?: InputMaybe<Scalars['Int']>;
  stakerCount_gt?: InputMaybe<Scalars['Int']>;
  stakerCount_gte?: InputMaybe<Scalars['Int']>;
  stakerCount_in?: InputMaybe<Array<Scalars['Int']>>;
  stakerCount_lt?: InputMaybe<Scalars['Int']>;
  stakerCount_lte?: InputMaybe<Scalars['Int']>;
  stakerCount_not?: InputMaybe<Scalars['Int']>;
  stakerCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalRewards?: InputMaybe<Scalars['BigInt']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']>;
  totalRewards_not?: InputMaybe<Scalars['BigInt']>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStake?: InputMaybe<Scalars['BigInt']>;
  totalStake_gt?: InputMaybe<Scalars['BigInt']>;
  totalStake_gte?: InputMaybe<Scalars['BigInt']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStake_lt?: InputMaybe<Scalars['BigInt']>;
  totalStake_lte?: InputMaybe<Scalars['BigInt']>;
  totalStake_not?: InputMaybe<Scalars['BigInt']>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  validatorCount?: InputMaybe<Scalars['Int']>;
  validatorCount_gt?: InputMaybe<Scalars['Int']>;
  validatorCount_gte?: InputMaybe<Scalars['Int']>;
  validatorCount_in?: InputMaybe<Array<Scalars['Int']>>;
  validatorCount_lt?: InputMaybe<Scalars['Int']>;
  validatorCount_lte?: InputMaybe<Scalars['Int']>;
  validatorCount_not?: InputMaybe<Scalars['Int']>;
  validatorCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum Overview_OrderBy {
  ExpectedTotalRewards = '_expectedTotalRewards',
  PendingStake = '_pendingStake',
  PendingUnstake = '_pendingUnstake',
  CandidateValidatorCount = 'candidateValidatorCount',
  Id = 'id',
  Network = 'network',
  RealRewardRate = 'realRewardRate',
  StakerCount = 'stakerCount',
  TotalRewards = 'totalRewards',
  TotalStake = 'totalStake',
  ValidatorCount = 'validatorCount'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  environmentValue?: Maybe<EnvironmentValue>;
  environmentValues: Array<EnvironmentValue>;
  epoch?: Maybe<Epoch>;
  epochReward?: Maybe<EpochReward>;
  epochRewards: Array<EpochReward>;
  epoches: Array<Epoch>;
  lockedUnstake?: Maybe<LockedUnstake>;
  lockedUnstakes: Array<LockedUnstake>;
  overview?: Maybe<Overview>;
  overviews: Array<Overview>;
  stake?: Maybe<Stake>;
  staker?: Maybe<Staker>;
  stakers: Array<Staker>;
  stakes: Array<Stake>;
  validator?: Maybe<Validator>;
  validatorBlock?: Maybe<ValidatorBlock>;
  validatorBlocks: Array<ValidatorBlock>;
  validators: Array<Validator>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryEnvironmentValueArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEnvironmentValuesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EnvironmentValue_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnvironmentValue_Filter>;
};


export type QueryEpochArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEpochRewardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEpochRewardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochReward_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EpochReward_Filter>;
};


export type QueryEpochesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Epoch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Epoch_Filter>;
};


export type QueryLockedUnstakeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLockedUnstakesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockedUnstake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LockedUnstake_Filter>;
};


export type QueryOverviewArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOverviewsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Overview_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Overview_Filter>;
};


export type QueryStakeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Staker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Staker_Filter>;
};


export type QueryStakesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Stake_Filter>;
};


export type QueryValidatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryValidatorBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryValidatorBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ValidatorBlock_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ValidatorBlock_Filter>;
};


export type QueryValidatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Validator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Validator_Filter>;
};

export type Stake = {
  __typename?: 'Stake';
  id: Scalars['ID'];
  oas: Scalars['BigInt'];
  rewards: Scalars['BigInt'];
  soas: Scalars['BigInt'];
  staker: Staker;
  validator: Validator;
  woas: Scalars['BigInt'];
};

export type Stake_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  oas?: InputMaybe<Scalars['BigInt']>;
  oas_gt?: InputMaybe<Scalars['BigInt']>;
  oas_gte?: InputMaybe<Scalars['BigInt']>;
  oas_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oas_lt?: InputMaybe<Scalars['BigInt']>;
  oas_lte?: InputMaybe<Scalars['BigInt']>;
  oas_not?: InputMaybe<Scalars['BigInt']>;
  oas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewards?: InputMaybe<Scalars['BigInt']>;
  rewards_gt?: InputMaybe<Scalars['BigInt']>;
  rewards_gte?: InputMaybe<Scalars['BigInt']>;
  rewards_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewards_lt?: InputMaybe<Scalars['BigInt']>;
  rewards_lte?: InputMaybe<Scalars['BigInt']>;
  rewards_not?: InputMaybe<Scalars['BigInt']>;
  rewards_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soas?: InputMaybe<Scalars['BigInt']>;
  soas_gt?: InputMaybe<Scalars['BigInt']>;
  soas_gte?: InputMaybe<Scalars['BigInt']>;
  soas_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soas_lt?: InputMaybe<Scalars['BigInt']>;
  soas_lte?: InputMaybe<Scalars['BigInt']>;
  soas_not?: InputMaybe<Scalars['BigInt']>;
  soas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  staker?: InputMaybe<Scalars['String']>;
  staker_contains?: InputMaybe<Scalars['String']>;
  staker_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_ends_with?: InputMaybe<Scalars['String']>;
  staker_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_gt?: InputMaybe<Scalars['String']>;
  staker_gte?: InputMaybe<Scalars['String']>;
  staker_in?: InputMaybe<Array<Scalars['String']>>;
  staker_lt?: InputMaybe<Scalars['String']>;
  staker_lte?: InputMaybe<Scalars['String']>;
  staker_not?: InputMaybe<Scalars['String']>;
  staker_not_contains?: InputMaybe<Scalars['String']>;
  staker_not_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_not_ends_with?: InputMaybe<Scalars['String']>;
  staker_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_not_in?: InputMaybe<Array<Scalars['String']>>;
  staker_not_starts_with?: InputMaybe<Scalars['String']>;
  staker_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  staker_starts_with?: InputMaybe<Scalars['String']>;
  staker_starts_with_nocase?: InputMaybe<Scalars['String']>;
  validator?: InputMaybe<Scalars['String']>;
  validator_contains?: InputMaybe<Scalars['String']>;
  validator_contains_nocase?: InputMaybe<Scalars['String']>;
  validator_ends_with?: InputMaybe<Scalars['String']>;
  validator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  validator_gt?: InputMaybe<Scalars['String']>;
  validator_gte?: InputMaybe<Scalars['String']>;
  validator_in?: InputMaybe<Array<Scalars['String']>>;
  validator_lt?: InputMaybe<Scalars['String']>;
  validator_lte?: InputMaybe<Scalars['String']>;
  validator_not?: InputMaybe<Scalars['String']>;
  validator_not_contains?: InputMaybe<Scalars['String']>;
  validator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  validator_not_ends_with?: InputMaybe<Scalars['String']>;
  validator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  validator_not_in?: InputMaybe<Array<Scalars['String']>>;
  validator_not_starts_with?: InputMaybe<Scalars['String']>;
  validator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  validator_starts_with?: InputMaybe<Scalars['String']>;
  validator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  woas?: InputMaybe<Scalars['BigInt']>;
  woas_gt?: InputMaybe<Scalars['BigInt']>;
  woas_gte?: InputMaybe<Scalars['BigInt']>;
  woas_in?: InputMaybe<Array<Scalars['BigInt']>>;
  woas_lt?: InputMaybe<Scalars['BigInt']>;
  woas_lte?: InputMaybe<Scalars['BigInt']>;
  woas_not?: InputMaybe<Scalars['BigInt']>;
  woas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Stake_OrderBy {
  Id = 'id',
  Oas = 'oas',
  Rewards = 'rewards',
  Soas = 'soas',
  Staker = 'staker',
  Validator = 'validator',
  Woas = 'woas'
}

export type Staker = {
  __typename?: 'Staker';
  id: Scalars['ID'];
  lockedUnstakes: Array<LockedUnstake>;
  stakes: Array<Stake>;
  totalStake: Scalars['BigInt'];
  totalUnstake: Scalars['BigInt'];
};


export type StakerLockedUnstakesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockedUnstake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LockedUnstake_Filter>;
};


export type StakerStakesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Stake_Filter>;
};

export type Staker_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalStake?: InputMaybe<Scalars['BigInt']>;
  totalStake_gt?: InputMaybe<Scalars['BigInt']>;
  totalStake_gte?: InputMaybe<Scalars['BigInt']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStake_lt?: InputMaybe<Scalars['BigInt']>;
  totalStake_lte?: InputMaybe<Scalars['BigInt']>;
  totalStake_not?: InputMaybe<Scalars['BigInt']>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalUnstake?: InputMaybe<Scalars['BigInt']>;
  totalUnstake_gt?: InputMaybe<Scalars['BigInt']>;
  totalUnstake_gte?: InputMaybe<Scalars['BigInt']>;
  totalUnstake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalUnstake_lt?: InputMaybe<Scalars['BigInt']>;
  totalUnstake_lte?: InputMaybe<Scalars['BigInt']>;
  totalUnstake_not?: InputMaybe<Scalars['BigInt']>;
  totalUnstake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Staker_OrderBy {
  Id = 'id',
  LockedUnstakes = 'lockedUnstakes',
  Stakes = 'stakes',
  TotalStake = 'totalStake',
  TotalUnstake = 'totalUnstake'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  environmentValue?: Maybe<EnvironmentValue>;
  environmentValues: Array<EnvironmentValue>;
  epoch?: Maybe<Epoch>;
  epochReward?: Maybe<EpochReward>;
  epochRewards: Array<EpochReward>;
  epoches: Array<Epoch>;
  lockedUnstake?: Maybe<LockedUnstake>;
  lockedUnstakes: Array<LockedUnstake>;
  overview?: Maybe<Overview>;
  overviews: Array<Overview>;
  stake?: Maybe<Stake>;
  staker?: Maybe<Staker>;
  stakers: Array<Staker>;
  stakes: Array<Stake>;
  validator?: Maybe<Validator>;
  validatorBlock?: Maybe<ValidatorBlock>;
  validatorBlocks: Array<ValidatorBlock>;
  validators: Array<Validator>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionEnvironmentValueArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEnvironmentValuesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EnvironmentValue_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnvironmentValue_Filter>;
};


export type SubscriptionEpochArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEpochRewardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEpochRewardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochReward_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EpochReward_Filter>;
};


export type SubscriptionEpochesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Epoch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Epoch_Filter>;
};


export type SubscriptionLockedUnstakeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLockedUnstakesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockedUnstake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LockedUnstake_Filter>;
};


export type SubscriptionOverviewArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOverviewsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Overview_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Overview_Filter>;
};


export type SubscriptionStakeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Staker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Staker_Filter>;
};


export type SubscriptionStakesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Stake_Filter>;
};


export type SubscriptionValidatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionValidatorBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionValidatorBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ValidatorBlock_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ValidatorBlock_Filter>;
};


export type SubscriptionValidatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Validator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Validator_Filter>;
};

export type Validator = {
  __typename?: 'Validator';
  active: Scalars['Boolean'];
  blocks: Array<ValidatorBlock>;
  candidate: Scalars['Boolean'];
  commissions: Scalars['BigInt'];
  id: Scalars['ID'];
  jailSince: Scalars['BigInt'];
  jailUntil: Scalars['BigInt'];
  operatingRatio: Scalars['BigDecimal'];
  operator: Scalars['Bytes'];
  stakes: Array<Stake>;
  totalStake: Scalars['BigInt'];
};


export type ValidatorBlocksArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ValidatorBlock_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ValidatorBlock_Filter>;
};


export type ValidatorStakesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Stake_Filter>;
};

export type ValidatorBlock = {
  __typename?: 'ValidatorBlock';
  epoch: Scalars['BigInt'];
  id: Scalars['ID'];
  slashed: Scalars['BigInt'];
  substituted: Scalars['BigInt'];
  validated: Scalars['BigInt'];
  validator: Validator;
};

export type ValidatorBlock_Filter = {
  epoch?: InputMaybe<Scalars['BigInt']>;
  epoch_gt?: InputMaybe<Scalars['BigInt']>;
  epoch_gte?: InputMaybe<Scalars['BigInt']>;
  epoch_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epoch_lt?: InputMaybe<Scalars['BigInt']>;
  epoch_lte?: InputMaybe<Scalars['BigInt']>;
  epoch_not?: InputMaybe<Scalars['BigInt']>;
  epoch_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  slashed?: InputMaybe<Scalars['BigInt']>;
  slashed_gt?: InputMaybe<Scalars['BigInt']>;
  slashed_gte?: InputMaybe<Scalars['BigInt']>;
  slashed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slashed_lt?: InputMaybe<Scalars['BigInt']>;
  slashed_lte?: InputMaybe<Scalars['BigInt']>;
  slashed_not?: InputMaybe<Scalars['BigInt']>;
  slashed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  substituted?: InputMaybe<Scalars['BigInt']>;
  substituted_gt?: InputMaybe<Scalars['BigInt']>;
  substituted_gte?: InputMaybe<Scalars['BigInt']>;
  substituted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  substituted_lt?: InputMaybe<Scalars['BigInt']>;
  substituted_lte?: InputMaybe<Scalars['BigInt']>;
  substituted_not?: InputMaybe<Scalars['BigInt']>;
  substituted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  validated?: InputMaybe<Scalars['BigInt']>;
  validated_gt?: InputMaybe<Scalars['BigInt']>;
  validated_gte?: InputMaybe<Scalars['BigInt']>;
  validated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  validated_lt?: InputMaybe<Scalars['BigInt']>;
  validated_lte?: InputMaybe<Scalars['BigInt']>;
  validated_not?: InputMaybe<Scalars['BigInt']>;
  validated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  validator?: InputMaybe<Scalars['String']>;
  validator_contains?: InputMaybe<Scalars['String']>;
  validator_contains_nocase?: InputMaybe<Scalars['String']>;
  validator_ends_with?: InputMaybe<Scalars['String']>;
  validator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  validator_gt?: InputMaybe<Scalars['String']>;
  validator_gte?: InputMaybe<Scalars['String']>;
  validator_in?: InputMaybe<Array<Scalars['String']>>;
  validator_lt?: InputMaybe<Scalars['String']>;
  validator_lte?: InputMaybe<Scalars['String']>;
  validator_not?: InputMaybe<Scalars['String']>;
  validator_not_contains?: InputMaybe<Scalars['String']>;
  validator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  validator_not_ends_with?: InputMaybe<Scalars['String']>;
  validator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  validator_not_in?: InputMaybe<Array<Scalars['String']>>;
  validator_not_starts_with?: InputMaybe<Scalars['String']>;
  validator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  validator_starts_with?: InputMaybe<Scalars['String']>;
  validator_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum ValidatorBlock_OrderBy {
  Epoch = 'epoch',
  Id = 'id',
  Slashed = 'slashed',
  Substituted = 'substituted',
  Validated = 'validated',
  Validator = 'validator'
}

export type Validator_Filter = {
  active?: InputMaybe<Scalars['Boolean']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']>>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  candidate?: InputMaybe<Scalars['Boolean']>;
  candidate_in?: InputMaybe<Array<Scalars['Boolean']>>;
  candidate_not?: InputMaybe<Scalars['Boolean']>;
  candidate_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  commissions?: InputMaybe<Scalars['BigInt']>;
  commissions_gt?: InputMaybe<Scalars['BigInt']>;
  commissions_gte?: InputMaybe<Scalars['BigInt']>;
  commissions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  commissions_lt?: InputMaybe<Scalars['BigInt']>;
  commissions_lte?: InputMaybe<Scalars['BigInt']>;
  commissions_not?: InputMaybe<Scalars['BigInt']>;
  commissions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  jailSince?: InputMaybe<Scalars['BigInt']>;
  jailSince_gt?: InputMaybe<Scalars['BigInt']>;
  jailSince_gte?: InputMaybe<Scalars['BigInt']>;
  jailSince_in?: InputMaybe<Array<Scalars['BigInt']>>;
  jailSince_lt?: InputMaybe<Scalars['BigInt']>;
  jailSince_lte?: InputMaybe<Scalars['BigInt']>;
  jailSince_not?: InputMaybe<Scalars['BigInt']>;
  jailSince_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  jailUntil?: InputMaybe<Scalars['BigInt']>;
  jailUntil_gt?: InputMaybe<Scalars['BigInt']>;
  jailUntil_gte?: InputMaybe<Scalars['BigInt']>;
  jailUntil_in?: InputMaybe<Array<Scalars['BigInt']>>;
  jailUntil_lt?: InputMaybe<Scalars['BigInt']>;
  jailUntil_lte?: InputMaybe<Scalars['BigInt']>;
  jailUntil_not?: InputMaybe<Scalars['BigInt']>;
  jailUntil_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  operatingRatio?: InputMaybe<Scalars['BigDecimal']>;
  operatingRatio_gt?: InputMaybe<Scalars['BigDecimal']>;
  operatingRatio_gte?: InputMaybe<Scalars['BigDecimal']>;
  operatingRatio_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  operatingRatio_lt?: InputMaybe<Scalars['BigDecimal']>;
  operatingRatio_lte?: InputMaybe<Scalars['BigDecimal']>;
  operatingRatio_not?: InputMaybe<Scalars['BigDecimal']>;
  operatingRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  operator?: InputMaybe<Scalars['Bytes']>;
  operator_contains?: InputMaybe<Scalars['Bytes']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  operator_not?: InputMaybe<Scalars['Bytes']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  totalStake?: InputMaybe<Scalars['BigInt']>;
  totalStake_gt?: InputMaybe<Scalars['BigInt']>;
  totalStake_gte?: InputMaybe<Scalars['BigInt']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStake_lt?: InputMaybe<Scalars['BigInt']>;
  totalStake_lte?: InputMaybe<Scalars['BigInt']>;
  totalStake_not?: InputMaybe<Scalars['BigInt']>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Validator_OrderBy {
  Active = 'active',
  Blocks = 'blocks',
  Candidate = 'candidate',
  Commissions = 'commissions',
  Id = 'id',
  JailSince = 'jailSince',
  JailUntil = 'jailUntil',
  OperatingRatio = 'operatingRatio',
  Operator = 'operator',
  Stakes = 'stakes',
  TotalStake = 'totalStake'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetEpochQueryVariables = Exact<{
  epoch: Scalars['BigInt'];
}>;


export type GetEpochQuery = { __typename?: 'Query', epoches: Array<{ __typename?: 'Epoch', epoch: any, block: any, timestamp: any }> };

export type GetEpochByFromTimeStampQueryVariables = Exact<{
  timestamp: Scalars['BigInt'];
}>;


export type GetEpochByFromTimeStampQuery = { __typename?: 'Query', epoches: Array<{ __typename?: 'Epoch', epoch: any, block: any, timestamp: any }> };

export type GetEpochByToTimeStampQueryVariables = Exact<{
  timestamp: Scalars['BigInt'];
}>;


export type GetEpochByToTimeStampQuery = { __typename?: 'Query', epoches: Array<{ __typename?: 'Epoch', epoch: any, block: any, timestamp: any }> };

export type GetLatestEpochQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestEpochQuery = { __typename?: 'Query', epoches: Array<{ __typename?: 'Epoch', epoch: any, block: any, timestamp: any }> };

export type GetEpochRewardsQueryVariables = Exact<{
  epoch: Scalars['BigInt'];
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetEpochRewardsQuery = { __typename?: 'Query', epochRewards: Array<{ __typename?: 'EpochReward', epoch: any, address: any, commissions: any, rewards: any }> };

export type GetValidatorsQueryVariables = Exact<{
  block: Scalars['Int'];
  validator: Scalars['ID'];
}>;


export type GetValidatorsQuery = { __typename?: 'Query', validators: Array<{ __typename?: 'Validator', id: string, commissions: any }> };

export type GetValidatorStakesQueryVariables = Exact<{
  validator: Scalars['ID'];
  block: Scalars['Int'];
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetValidatorStakesQuery = { __typename?: 'Query', validators: Array<{ __typename?: 'Validator', stakes: Array<{ __typename?: 'Stake', oas: any, soas: any, woas: any }> }> };

export type GetStakingRewardQueryVariables = Exact<{
  validator: Scalars['String'];
  staker: Scalars['ID'];
  block: Scalars['Int'];
}>;


export type GetStakingRewardQuery = { __typename?: 'Query', staker?: { __typename?: 'Staker', stakes: Array<{ __typename?: 'Stake', rewards: any }> } | null };


export const GetEpochDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpoch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"epoch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoch"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<GetEpochQuery, GetEpochQueryVariables>;
export const GetEpochByFromTimeStampDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpochByFromTimeStamp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoch"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<GetEpochByFromTimeStampQuery, GetEpochByFromTimeStampQueryVariables>;
export const GetEpochByToTimeStampDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpochByToTimeStamp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoch"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<GetEpochByToTimeStampQuery, GetEpochByToTimeStampQueryVariables>;
export const GetLatestEpochDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatestEpoch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"epoch"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoch"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<GetLatestEpochQuery, GetLatestEpochQueryVariables>;
export const GetEpochRewardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpochRewards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epochRewards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"epoch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoch"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"commissions"}},{"kind":"Field","name":{"kind":"Name","value":"rewards"}}]}}]}}]} as unknown as DocumentNode<GetEpochRewardsQuery, GetEpochRewardsQueryVariables>;
export const GetValidatorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetValidators"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"block"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validator"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validators"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"block"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validator"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commissions"}}]}}]}}]} as unknown as DocumentNode<GetValidatorsQuery, GetValidatorsQueryVariables>;
export const GetValidatorStakesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetValidatorStakes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validator"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"block"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validators"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validator"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"block"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stakes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oas"}},{"kind":"Field","name":{"kind":"Name","value":"soas"}},{"kind":"Field","name":{"kind":"Name","value":"woas"}}]}}]}}]}}]} as unknown as DocumentNode<GetValidatorStakesQuery, GetValidatorStakesQueryVariables>;
export const GetStakingRewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStakingReward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validator"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"staker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"block"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"staker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"staker"}}},{"kind":"Argument","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"block"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stakes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"validator"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validator"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rewards"}}]}}]}}]}}]} as unknown as DocumentNode<GetStakingRewardQuery, GetStakingRewardQueryVariables>;