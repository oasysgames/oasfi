import * as fsPromise from "fs/promises";
import * as path from "path";
import { ethers } from "ethers";
import { TokenTransferUtils } from "../utils/TokenTransferUtils";
import * as dotenv from "dotenv";
dotenv.config();
const BASE_RPC_URL: Record<string, string> = {
  tcgv_mainnet: process.env.TCGV_MAINNET_URL || "https://rpc.tcgverse.xyz/",
  tcgv_testnet: process.env.TCGV_TESTNET_URL || "",
  sandv_testnet: process.env.SANDV_TESTNET_URL || "",
  hub_mainnet: process.env.HUB_MAINNET_URL || "https://rpc.mainnet.oasys.games",
  eth_mainnet: process.env.ETH_MAINNET_URL || "",
  mch_mainnet:
    process.env.MCH_MAINNET_URL || "https://rpc.oasys.mycryptoheroes.net/",
  home_mainnet:
    process.env.HOME_MAINNET_URL ||
    "https://rpc.mainnet.oasys.homeverse.games/",
  saakuru_mainnet:
    process.env.SAAKURU_MAINNET_URL || "https://rpc.saakuru.network/",
  hub_testnet: process.env.HUB_TESTNET_URL || "",
};

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

  constructor(private readonly chain: string) {
    this.baseRpcUrl = this.getRpcUrlForChain(chain);
  }

  private getRpcUrlForChain(chain: string): string {
    const url = BASE_RPC_URL[chain];
    if (!url) {
      throw new Error(`Invalid chain name: ${chain}`);
    }
    console.log(`Using chain: ${chain}`);
    return url;
  }

  public handleDuplicateTokenTransfer = async (
    data: TokenTransferData[]
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
          duplicateTransactions.map((tx) => this.getTxReceipt(tx?.TxHash))
        );

        const rpcTransfers = txReceipts.map((receipt) =>
          receipt.logs.filter(
            (item) => item.topics[0] == TokenTransferUtils.transfer
          )
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
  public saveCsvToFile = async (outputPath: string, csvData: string) => {
    const filePath = path.join(outputPath);
    await fsPromise.writeFile(filePath, csvData);
    console.log("DONE!");
  };

  private getTxReceipt = async (
    transaction_hash: string
  ): Promise<ethers.providers.TransactionReceipt> => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(this.baseRpcUrl);

      const receipt = await provider.getTransactionReceipt(transaction_hash);

      if (receipt === null) {
        console.log("Transaction not mined yet");
      }
      return receipt;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
