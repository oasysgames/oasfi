/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query GetEpoch($epoch: BigInt!) {\n    epoches(where: { epoch: $epoch }) {\n      epoch\n      block\n      timestamp\n    }\n  }\n": types.GetEpochDocument,
    "\n  query GetEpochByFromTimeStamp($timestamp: BigInt!) {\n    epoches(\n      where: { timestamp_gte: $timestamp }\n      orderBy: timestamp\n      orderDirection: asc\n      first: 1\n    ) {\n      epoch\n      block\n      timestamp\n    }\n  }\n": types.GetEpochByFromTimeStampDocument,
    "\n  query GetEpochByToTimeStamp($timestamp: BigInt!) {\n    epoches(\n      where: { timestamp_lte: $timestamp }\n      orderBy: timestamp\n      orderDirection: desc\n      first: 1\n    ) {\n      epoch\n      block\n      timestamp\n    }\n  }\n": types.GetEpochByToTimeStampDocument,
    "\n  query GetLatestEpoch {\n    epoches(first: 1, orderBy: epoch, orderDirection: desc) {\n      epoch\n      block\n      timestamp\n    }\n  }\n": types.GetLatestEpochDocument,
    "\n  query GetEpochRewards($epoch: BigInt!, $first: Int!, $skip: Int!) {\n    epochRewards(where: { epoch: $epoch }, first: $first, skip: $skip) {\n      epoch\n      address\n      commissions\n      rewards\n    }\n  }\n": types.GetEpochRewardsDocument,
    "\n  query GetEpochRewardsByAddress($epoch: BigInt!, $address: Bytes!) {\n    epochRewards(where: { epoch: $epoch, address: $address }) {\n      epoch\n      address\n      commissions\n      rewards\n    }\n  }\n": types.GetEpochRewardsByAddressDocument,
    "\n  query GetValidators($block: Int!, $validator: ID!) {\n    validators(\n      orderBy: id\n      first: 1000\n      block: { number: $block }\n      where: { id: $validator }\n    ) {\n      id\n      commissions\n    }\n  }\n": types.GetValidatorsDocument,
    "\n  query GetValidatorStakes(\n    $validator: ID!\n    $block: Int!\n    $first: Int!\n    $skip: Int!\n  ) {\n    validators(where: { id: $validator }, block: { number: $block }) {\n      stakes(first: $first, skip: $skip) {\n        oas\n        soas\n        woas\n      }\n    }\n  }\n": types.GetValidatorStakesDocument,
    "\n  query GetStakerReward($staker: ID!, $block: Int!) {\n    staker(id: $staker, block: { number: $block }) {\n      stakes {\n        rewards\n        validator {\n          id\n        }\n      }\n    }\n  }\n": types.GetStakerRewardDocument,
    "\n  query GetStakerStake($staker: ID!, $block: Int!) {\n    staker(id: $staker, block: { number: $block }) {\n      stakes {\n        oas\n        soas\n        woas\n      }\n    }\n  }\n": types.GetStakerStakeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEpoch($epoch: BigInt!) {\n    epoches(where: { epoch: $epoch }) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  query GetEpoch($epoch: BigInt!) {\n    epoches(where: { epoch: $epoch }) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEpochByFromTimeStamp($timestamp: BigInt!) {\n    epoches(\n      where: { timestamp_gte: $timestamp }\n      orderBy: timestamp\n      orderDirection: asc\n      first: 1\n    ) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  query GetEpochByFromTimeStamp($timestamp: BigInt!) {\n    epoches(\n      where: { timestamp_gte: $timestamp }\n      orderBy: timestamp\n      orderDirection: asc\n      first: 1\n    ) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEpochByToTimeStamp($timestamp: BigInt!) {\n    epoches(\n      where: { timestamp_lte: $timestamp }\n      orderBy: timestamp\n      orderDirection: desc\n      first: 1\n    ) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  query GetEpochByToTimeStamp($timestamp: BigInt!) {\n    epoches(\n      where: { timestamp_lte: $timestamp }\n      orderBy: timestamp\n      orderDirection: desc\n      first: 1\n    ) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLatestEpoch {\n    epoches(first: 1, orderBy: epoch, orderDirection: desc) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  query GetLatestEpoch {\n    epoches(first: 1, orderBy: epoch, orderDirection: desc) {\n      epoch\n      block\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEpochRewards($epoch: BigInt!, $first: Int!, $skip: Int!) {\n    epochRewards(where: { epoch: $epoch }, first: $first, skip: $skip) {\n      epoch\n      address\n      commissions\n      rewards\n    }\n  }\n"): (typeof documents)["\n  query GetEpochRewards($epoch: BigInt!, $first: Int!, $skip: Int!) {\n    epochRewards(where: { epoch: $epoch }, first: $first, skip: $skip) {\n      epoch\n      address\n      commissions\n      rewards\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEpochRewardsByAddress($epoch: BigInt!, $address: Bytes!) {\n    epochRewards(where: { epoch: $epoch, address: $address }) {\n      epoch\n      address\n      commissions\n      rewards\n    }\n  }\n"): (typeof documents)["\n  query GetEpochRewardsByAddress($epoch: BigInt!, $address: Bytes!) {\n    epochRewards(where: { epoch: $epoch, address: $address }) {\n      epoch\n      address\n      commissions\n      rewards\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetValidators($block: Int!, $validator: ID!) {\n    validators(\n      orderBy: id\n      first: 1000\n      block: { number: $block }\n      where: { id: $validator }\n    ) {\n      id\n      commissions\n    }\n  }\n"): (typeof documents)["\n  query GetValidators($block: Int!, $validator: ID!) {\n    validators(\n      orderBy: id\n      first: 1000\n      block: { number: $block }\n      where: { id: $validator }\n    ) {\n      id\n      commissions\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetValidatorStakes(\n    $validator: ID!\n    $block: Int!\n    $first: Int!\n    $skip: Int!\n  ) {\n    validators(where: { id: $validator }, block: { number: $block }) {\n      stakes(first: $first, skip: $skip) {\n        oas\n        soas\n        woas\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetValidatorStakes(\n    $validator: ID!\n    $block: Int!\n    $first: Int!\n    $skip: Int!\n  ) {\n    validators(where: { id: $validator }, block: { number: $block }) {\n      stakes(first: $first, skip: $skip) {\n        oas\n        soas\n        woas\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStakerReward($staker: ID!, $block: Int!) {\n    staker(id: $staker, block: { number: $block }) {\n      stakes {\n        rewards\n        validator {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStakerReward($staker: ID!, $block: Int!) {\n    staker(id: $staker, block: { number: $block }) {\n      stakes {\n        rewards\n        validator {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStakerStake($staker: ID!, $block: Int!) {\n    staker(id: $staker, block: { number: $block }) {\n      stakes {\n        oas\n        soas\n        woas\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStakerStake($staker: ID!, $block: Int!) {\n    staker(id: $staker, block: { number: $block }) {\n      stakes {\n        oas\n        soas\n        woas\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;