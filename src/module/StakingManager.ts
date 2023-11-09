import { Signer, ethers } from 'ethers';
import { Address, Provider, Wei } from '../types';
import stakeManagerAbi from '../contracts/StakeManager/StakeManager';
import * as dotenv from 'dotenv';
dotenv.config();
const BASE_URL: Record<string, string> = {
  tcgv_mainnet: process.env.TCGV_MAINNET_URL || 'https://rpc.tcgverse.xyz/',
  tcgv_testnet: process.env.TCGV_TESTNET_URL || '',
  sandv_testnet: process.env.SANDV_TESTNET_URL || '',
  hub_mainnet: process.env.HUB_MAINNET_URL || 'https://rpc.mainnet.oasys.games',
  eth_mainnet: process.env.ETH_MAINNET_URL || '',
  mch_mainnet:
    process.env.MCH_MAINNET_URL || 'https://rpc.oasys.mycryptoheroes.net/',
  home_mainnet:
    process.env.HOME_MAINNET_URL ||
    'https://rpc.mainnet.oasys.homeverse.games/',
  saakuru_mainnet:
    process.env.SAAKURU_MAINNET_URL || 'https://rpc.saakuru.network/',
  hub_testnet: process.env.HUB_TESTNET_URL || '',
};
export default class StakingManager {
  address: Address;
  signer: Signer | undefined;
  contract;

  constructor(signer?: Signer, address?: Address, chain?: string) {
    this.address = address;
    const baseUrl = this.getUrlForChain(chain);
    const provider = new ethers.providers.JsonRpcProvider(baseUrl);

    this.contract = new ethers.Contract(
      address,
      stakeManagerAbi,
      signer ? signer : provider,
    );
  }

  private getUrlForChain(chain: string): string {
    const url = BASE_URL[chain];
    if (!url) {
      throw new Error(`Invalid chain name: ${chain}`);
    }
    console.log(`Using chain: ${chain}`);
    return url;
  }
  public async rewards(
    staker: Address,
    validator: Address,
    epoch: number,
  ): Promise<Wei> {
    return await this.contract.getRewards(staker, validator, epoch);
  }
}
export const stakingManagerAddress =
  '0x0000000000000000000000000000000000001001';
