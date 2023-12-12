import { BigNumber } from 'ethers';
import { request } from 'graphql-request';
import { IEpochReward, stakerStake, validatorTotalStake } from '../types';
import { graphql } from './../gql/gql';
import type {
  GetEpochByToTimeStampQueryVariables,
  GetEpochQueryVariables,
  GetEpochRewardsByAddressQuery,
  GetEpochRewardsByAddressQueryVariables,
  GetEpochRewardsQuery,
  GetEpochRewardsQueryVariables,
  GetStakerRewardQueryVariables,
  GetStakerStakeQuery,
  GetStakerStakeQueryVariables,
  GetValidatorStakesQuery,
  GetValidatorStakesQueryVariables,
  GetValidatorsQueryVariables,
} from './../gql/graphql';

const GetEpoch = graphql(`
  query GetEpoch($epoch: BigInt!) {
    epoches(where: { epoch: $epoch }) {
      epoch
      block
      timestamp
    }
  }
`);
const GetEpochByFromTimeStamp = graphql(`
  query GetEpochByFromTimeStamp($timestamp: BigInt!) {
    epoches(
      where: { timestamp_gte: $timestamp }
      orderBy: timestamp
      orderDirection: asc
      first: 1
    ) {
      epoch
      block
      timestamp
    }
  }
`);
const GetEpochByToTimeStamp = graphql(`
  query GetEpochByToTimeStamp($timestamp: BigInt!) {
    epoches(
      where: { timestamp_lte: $timestamp }
      orderBy: timestamp
      orderDirection: desc
      first: 1
    ) {
      epoch
      block
      timestamp
    }
  }
`);

const GetLatestEpoch = graphql(`
  query GetLatestEpoch {
    epoches(first: 1, orderBy: epoch, orderDirection: desc) {
      epoch
      block
      timestamp
    }
  }
`);
const GetEpochRewards = graphql(`
  query GetEpochRewards($epoch: BigInt!, $first: Int!, $skip: Int!) {
    epochRewards(where: { epoch: $epoch }, first: $first, skip: $skip) {
      epoch
      address
      commissions
      rewards
    }
  }
`);

const GetEpochRewardsByAddress = graphql(`
  query GetEpochRewardsByAddress($epoch: BigInt!, $address: Bytes!) {
    epochRewards(where: { epoch: $epoch, address: $address }) {
      epoch
      address
      commissions
      rewards
    }
  }
`);

const GetValidators = graphql(`
  query GetValidators($block: Int!, $validator: ID!) {
    validators(
      orderBy: id
      first: 1000
      block: { number: $block }
      where: { id: $validator }
    ) {
      id
      commissions
    }
  }
`);

const GetValidatorStakes = graphql(`
  query GetValidatorStakes(
    $validator: ID!
    $block: Int!
    $first: Int!
    $skip: Int!
  ) {
    validators(where: { id: $validator }, block: { number: $block }) {
      stakes(first: $first, skip: $skip) {
        oas
        soas
        woas
      }
    }
  }
`);

const GetStakerReward = graphql(`
  query GetStakerReward($staker: ID!, $block: Int!) {
    staker(id: $staker, block: { number: $block }) {
      stakes {
        rewards
        validator {
          id
        }
      }
    }
  }
`);

const GetStakerStake = graphql(`
  query GetStakerStake($staker: ID!, $block: Int!) {
    staker(id: $staker, block: { number: $block }) {
      stakes {
        oas
        soas
        woas
      }
    }
  }
`);

const BASE_GRAPH_URL: Record<string, string> = {
  hub_mainnet:
    process.env.HUB_MAINNET_GRAPH_URL ||
    'https://graph.mainnet.oasys.games/subgraphs/name/oasys/staking',
};

export class Subgraph {
  private baseGraphUrl: string;

  constructor(private readonly chain?: string) {
    this.baseGraphUrl = this.getGraphUrlForChain('hub_mainnet'); // set default hub mainnet
  }

  private getGraphUrlForChain(chain: string): string {
    const url = BASE_GRAPH_URL[chain];
    if (!url) {
      throw new Error(`Invalid chain name: ${chain}`);
    }
    console.log(`Using chain: ${chain}`);
    return url;
  }
  public getEpoch = async (epoch: number) => {
    const variables: GetEpochQueryVariables = {
      epoch: parseInt(`${epoch}`, 10),
    };

    const data = await request(this.baseGraphUrl, GetEpoch, variables);
    return data;
  };
  public getLatestEpoch = async () => {
    const data = await request(this.baseGraphUrl, GetLatestEpoch);
    return data;
  };
  public getEpochByToTimestamp = async (timestamp: number) => {
    const variables: GetEpochByToTimeStampQueryVariables = {
      timestamp: timestamp,
    };
    const data = await request(
      this.baseGraphUrl,
      GetEpochByToTimeStamp,
      variables,
    );
    return data;
  };
  public getEpochByFromTimestamp = async (timestamp: number) => {
    const variables: GetEpochByToTimeStampQueryVariables = {
      timestamp: timestamp,
    };
    const data = await request(
      this.baseGraphUrl,
      GetEpochByFromTimeStamp,
      variables,
    );
    return data;
  };

  public getEpochRewards = async (epoch: number) => {
    const variables: GetEpochRewardsQueryVariables = {
      epoch: parseInt(`${epoch}`, 10),
      skip: 0,
      first: 1000,
    };

    const epochRewards: GetEpochRewardsQuery = {
      epochRewards: [],
    };

    for (let i = 0; ; i++) {
      variables.skip = variables.first * i;
      const data: any = await request(
        this.baseGraphUrl,
        GetEpochRewards,
        variables,
      );

      if (data.epochRewards.length === 0) break; // All epochRewards information already retrieved.
      epochRewards.epochRewards = epochRewards.epochRewards.concat(
        data.epochRewards,
      );
    }

    return epochRewards;
  };
  public getValidators = async (block: number, validator_address: string) => {
    const variables: GetValidatorsQueryVariables = {
      validator: validator_address,
      block: parseInt(`${block}`, 10),
    };

    const data = await request(this.baseGraphUrl, GetValidators, variables);
    return data;
  };
  public getValidatorStakes = async (validator: string, block: number) => {
    const variables: GetValidatorStakesQueryVariables = {
      validator,
      block: parseInt(`${block}`, 10),
      skip: 0,
      first: 1000,
    };

    const validatorStakes: GetValidatorStakesQuery = {
      validators: [
        {
          stakes: [],
        },
      ],
    };
    for (let i = 0; ; i++) {
      variables.skip = variables.first * i;
      const data: any = await request(
        this.baseGraphUrl,
        GetValidatorStakes,
        variables,
      );

      if (data.validators[0].stakes.length === 0) break; // All stake information already retrieved.
      validatorStakes.validators[0].stakes =
        validatorStakes.validators[0].stakes.concat(data.validators[0].stakes);
    }
    return validatorStakes;
  };

  public getStakerReward = async (
    block: number,
    staker: string,
  ): Promise<BigNumber> => {
    const variables: GetStakerRewardQueryVariables = {
      block: parseInt(`${block}`, 10),
      staker,
    };

    const data: any = await request(
      this.baseGraphUrl,
      GetStakerReward,
      variables,
    );
    let stakerReward = BigNumber.from('0');

    if (data.staker.stakes.length === 0) {
      return stakerReward;
    }
    data.staker.stakes.forEach((stake) => {
      stakerReward = stakerReward.add(stake.rewards);
    });
    return stakerReward;
  };

  public getEpochRewardByAddress = async (
    epoch: number,
    address: string,
  ): Promise<IEpochReward> => {
    const variables: GetEpochRewardsByAddressQueryVariables = {
      epoch: parseInt(`${epoch}`, 10),
      address: address,
    };

    const data: GetEpochRewardsByAddressQuery = await request(
      this.baseGraphUrl,
      GetEpochRewardsByAddress,
      variables,
    );

    const epochReward: IEpochReward = {
      address,
      commissions: BigNumber.from(0),
      epoch,
      rewards: BigNumber.from(0),
    };
    if (data.epochRewards.length === 0) {
      return epochReward;
    }
    data.epochRewards?.forEach((reward: IEpochReward) => {
      epochReward.commissions = epochReward.commissions.add(reward.commissions);
      epochReward.rewards = epochReward.rewards.add(reward.rewards);
    });
    return epochReward;
  };

  public getValidatorTotalStake = async (
    epoch: number,
    block: number,
    validator_address: string,
  ) => {
    const validators: any = await this.getValidators(block, validator_address);

    const epochRewards = await this.getEpochRewards(epoch);

    const validatorStakes = await Promise.all(
      validators.validators.map(async (validator) => {
        const validatorAddress = validator.id;
        const validatorEpochReward = epochRewards.epochRewards.find(
          (epochReward) => {
            if (typeof epochReward.address !== 'string') return false;
            return (
              epochReward.address.toLowerCase() ===
              validatorAddress.toLowerCase()
            );
          },
        );

        if (typeof validator.commissions !== 'string') {
          throw new Error('Can not get validator total commission');
        }

        const validatorTotalStake: validatorTotalStake = {
          address: validatorAddress,
          oas: BigNumber.from('0'),
          soas: BigNumber.from('0'),
          woas: BigNumber.from('0'),
          dailyCommission:
            validatorEpochReward &&
            typeof validatorEpochReward.commissions === 'string'
              ? BigNumber.from(validatorEpochReward.commissions)
              : BigNumber.from('0'),
          totalCommission: BigNumber.from(validator.commissions),
        };

        const data = await this.getValidatorStakes(validatorAddress, block);

        data.validators[0].stakes.forEach((stake) => {
          if (
            typeof stake.oas === 'string' &&
            typeof stake.soas === 'string' &&
            typeof stake.woas === 'string'
          ) {
            validatorTotalStake.oas = validatorTotalStake.oas.add(
              BigNumber.from(stake.oas),
            );
            validatorTotalStake.soas = validatorTotalStake.soas.add(
              BigNumber.from(stake.soas),
            );
            validatorTotalStake.woas = validatorTotalStake.woas.add(
              BigNumber.from(stake.woas),
            );
          } else {
            throw new Error(
              'Can not get stake.oas or stake.soas or stake.woas',
            );
          }
        });

        return validatorTotalStake;
      }),
    );

    return validatorStakes;
  };

  public getListStakerStake = async (
    block: number,
    staker_address: string,
    epoch: number,
  ): Promise<stakerStake> => {
    const stakerStakes = await this.getStakerStake(block, staker_address);

    let totalStake = BigNumber.from('0');
    const epochReward = await this.getEpochRewardByAddress(
      epoch,
      staker_address,
    );

    if (!(stakerStakes.staker?.stakes.length > 0)) {
      return {
        address: staker_address,
        totalStake,
        stakerReward: epochReward.rewards,
      };
    }
    stakerStakes.staker.stakes.forEach((stake) => {
      totalStake = totalStake
        .add(BigNumber.from(stake.woas))
        .add(BigNumber.from(stake.soas))
        .add(BigNumber.from(stake.oas));
    });
    // GetEpochRewardsByAddress
    return {
      address: staker_address,
      totalStake,
      stakerReward: epochReward.rewards,
    };
  };
  public getStakerStake = async (
    block: number,
    staker: string,
  ): Promise<GetStakerStakeQuery> => {
    const variables: GetStakerStakeQueryVariables = {
      block: parseInt(`${block}`, 10),
      staker,
    };

    const data: GetStakerStakeQuery = await request(
      this.baseGraphUrl,
      GetStakerStake,
      variables,
    );
    return data;
  };
}
