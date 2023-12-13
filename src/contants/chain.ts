import { Verse } from '../types';

export const DEFAULT_CHAIN = 'hub_mainnet';

export const BASE_CHAIN: {
  [key in Verse]: {
    rpc: string;
    graph: string;
  };
} = {
  hub_mainnet: {
    graph:
      process.env.HUB_MAINNET_GRAPH_URL ||
      'https://graph.mainnet.oasys.games/subgraphs/name/oasys/staking',
    rpc: process.env.HUB_MAINNET_RPC_URL || 'https://rpc.mainnet.oasys.games',
  },
  hub_testnet: {
    graph:
      process.env.HUB_TESTNET_GRAPH_URL ||
      'https://graph.testnet.oasys.games/subgraphs/name/oasys/staking/graphql',
    rpc: process.env.HUB_TESTNET_RPC_URL || 'https://rpc.testnet.oasys.games',
  },
  tcgv_mainnet: {
    graph: process.env.TCGV_MAINNET_GRAPH_URL || '',
    rpc: process.env.TCGV_MAINNET_RPC_URL || 'https://rpc.tcgverse.xyz/',
  },
  tcgv_testnet: {
    graph: process.env.TCGV_TESTNET_GRAPH_URL || '',
    rpc: process.env.TCGV_TESTNET_RPC_URL || '',
  },
  sandv_testnet: {
    graph: process.env.SANDV_TESTNET_GRAPH_URL || '',
    rpc: process.env.SANDV_TESTNET_RPC_URL || '',
  },
  sandv_mainnet: {
    graph: process.env.SANDV_MAINNET_GRAPH_URL || '',
    rpc: process.env.SANDV_MAINNET_RPC_URL || '',
  },
  mch_mainnet: {
    graph: process.env.MCH_MAINNET_GRAPH_URL || '',
    rpc: process.env.MCH_MAINNET_RPC_URL || 'https://rpc.mycryptoheroes.net/',
  },
  mch_testnet: {
    graph: process.env.MCH_TESTNET_GRAPH_URL || '',
    rpc:
      process.env.MCH_TESTNET_RPC_URL ||
      'https://rpc.testnet.mycryptoheroes.net/',
  },
  home_mainnet: {
    graph: process.env.HOME_MAINNET_GRAPH_URL || '',
    rpc: process.env.HOME_MAINNET_RPC_URL || 'https://rpc.homeverse.games/',
  },
  home_testnet: {
    graph: process.env.HOME_TESTNET_GRAPH_URL || '',
    rpc:
      process.env.HOME_TESTNET_RPC_URL ||
      'https://rpc.testnet.homeverse.games/',
  },
  saakuru_mainnet: {
    graph: process.env.SAAKURU_MAINNET_GRAPH_URL || '',
    rpc: process.env.SAAKURU_MAINNET_RPC_URL || 'https://rpc.saakuru.network/',
  },
  saakuru_testnet: {
    graph: process.env.SAAKURU_TESTNET_GRAPH_URL || '',
    rpc:
      process.env.SAAKURU_TESTNET_RPC_URL ||
      'https://rpc.testnet.saakuru.network/',
  },
};
