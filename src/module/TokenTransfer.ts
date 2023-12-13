import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { BASE_CHAIN, DEFAULT_CHAIN } from '../contants/chain';
import { Verse } from '../types';
import { TokenTransferUtils } from '../utils/TokenTransferUtils';
dotenv.config();

export type TokenTransferData = {
  TxHash: string;
  BlockNumber: string;
  UnixTimestamp: string;
  FromAddress: string;
  ToAddress: string;
  TokenContractAddress: string;
  Type: string;
  TokenSymbol: string;
  TokensTransferred: string;
  TransactionFee: string;
  Status: string;
  ErrCode: string;
};

export class TokenTransfer {
  private baseRpcUrl: string;

  constructor(private readonly chain?: Verse) {
    this.baseRpcUrl = this.getRpcUrlForChain(chain);
  }

  private getRpcUrlForChain(chain: Verse): string {
    const url = BASE_CHAIN[chain]?.rpc || BASE_CHAIN[DEFAULT_CHAIN]?.rpc || '';
    const selectedChain =
      url === BASE_CHAIN[chain]?.rpc ? chain : DEFAULT_CHAIN;
    console.log(`Using chain: ${selectedChain} with url: ${url}`);
    return url;
  }

  public handleDuplicateTokenTransfer = async (
    data: TokenTransferData[],
  ): Promise<TokenTransferData[]> => {
    const result: TokenTransferData[] = [];
    const transactionsByBlock = this.groupTransactionCsvByBlock(data);

    for (const blockNumber in transactionsByBlock) {
      const transactions = transactionsByBlock[blockNumber];
      const uniqueCsvData = new Set<string>();
      const duplicateTransactions: TokenTransferData[] = [];

      for (const tx of transactions) {
        const key = JSON.stringify(tx);

        if (!uniqueCsvData.has(key)) {
          uniqueCsvData.add(key);
          result.push(tx);
        } else {
          duplicateTransactions.push(tx);
        }
      }

      if (duplicateTransactions.length > 0) {
        console.log(duplicateTransactions);

        const txReceipts = await Promise.all(
          duplicateTransactions.map((tx) => this.getTxReceipt(tx?.TxHash)),
        );

        const rpcTransfers = txReceipts.map((receipt) =>
          receipt.logs.filter(
            (item) => item.topics[0] == TokenTransferUtils.transfer,
          ),
        );

        if (rpcTransfers.length != uniqueCsvData.size) {
          result.push(...duplicateTransactions);
        }
      }
    }
    return result;
  };

  public groupTransactionCsvByBlock = (data: TokenTransferData[]) => {
    return data?.reduce((result, tx) => {
      if (!result[tx.BlockNumber]) {
        result[tx.BlockNumber] = [];
      }
      result[tx.BlockNumber].push(tx);
      return result;
    }, {});
  };

  private getTxReceipt = async (
    transaction_hash: string,
  ): Promise<ethers.providers.TransactionReceipt> => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(this.baseRpcUrl);

      const receipt = await provider.getTransactionReceipt(transaction_hash);

      if (receipt === null) {
        console.log('Transaction not mined yet');
      }
      return receipt;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
