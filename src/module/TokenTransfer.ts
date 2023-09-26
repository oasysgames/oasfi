import * as fsPromise from "fs/promises";
import * as path from "path";
import { ethers } from "ethers";
import { TokenTransferUtils } from "../utils/TokenTransferUtils";
import * as dotenv from "dotenv";
dotenv.config();
const BASE_RPC_URL: Record<string, string> = {
  tcgv_mainnet: process.env.TCGV_MAINNET_URL || "",
  tcgv_testnet: process.env.TCGV_TESTNET_URL || "",
  sandv_testnet: process.env.SANDV_TESTNET_URL || "",
  hub_mainnet: process.env.HUB_MAINNET_URL || "",
  eth_mainnet: process.env.ETH_MAINNET_URL || "",
  mch_mainnet: process.env.MCH_MAINNET_URL || "",
  mch_mainnet_csv: process.env.MCH_MAINNET_CSV_URL || "",
  home_mainnet: process.env.HOME_MAINNET_URL || "",
  saakuru_mainnet: process.env.SAAKURU_MAINNET_URL || "",
  hub_testnet: process.env.HUB_TESTNET_URL || "",
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

  public csvToObject(dataArray: any): Record<string, string>[] {
    const keys = dataArray.data[0];
    return dataArray.data
      .slice(1)
      .filter((element: any) => element.length > 1)
      .map((element: any) => {
        return element.reduce(
          (acc: Record<string, string>, value: string, index: number) => {
            acc[keys[index]] = value;
            return acc;
          },
          {}
        );
      });
  }

  public handleDuplicateTokenTransfer = async (data: any): Promise<{}[]> => {
    let result: {}[] = [];
    const transactionsByBlock = this.groupTransactionCsvByBlock(data);

    for (const blockNumber in transactionsByBlock) {
      const transactions = transactionsByBlock[blockNumber];
      const uniqueCsvData = new Set<string>();

      for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i];
        const key = JSON.stringify(tx);
        if (!uniqueCsvData.has(key)) {
          uniqueCsvData.add(key);
          result.push(tx);
        } else {
          // This is a duplicate transaction
          const txReceipts = await this.getTxReceipt(tx?.TxHash);
          const rpcTransfers = txReceipts.logs.filter(
            (item) => item.topics[0] == TokenTransferUtils.transfer
          );

          //Wait until all transactions in 1 block have been run to get uniqueCsvData
          if (transactions.length - 1 == i) {
            if (rpcTransfers.length == uniqueCsvData.size) {
              continue;
            }
            result.push(tx);
          }
        }
      }
    }
    return result;
  };

  public groupTransactionCsvByBlock = (data: any) => {
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
