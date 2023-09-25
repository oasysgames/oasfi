import * as fsPromise from "fs/promises";
import * as path from "path";
import { ethers } from "ethers";

const BASE_RPC_URL: Record<string, string> = {
  tcgv_mainnet: "https://rep-rpc.tcgverse.xyz/",
  tcgv_testnet: "https://testnet.rpc.tcgverse.xyz/",
  sandv_testnet: "https://rpc.sandverse.oasys.games/",
  hub_testnet: process.env.HUB_TESTNET_URL || "",
  hub_mainnet: "https://rpc.mainnet.oasys.games/",
  eth_mainnet: "https://rpc.ankr.com/eth",
  mch_mainnet: "https://rpc.verse-replica.oasys.games/29548",
  mch_mainnet_csv: "https://rpc.oasys.mycryptoheroes.net/",
  home_mainnet: "https://rpc.mainnet.oasys.homeverse.games/",
  saakuru_mainnet: "https://rpc.saakuru.network/",
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

  private formatUnits(number: string): ethers.BigNumber {
    return ethers.utils.parseEther(number);
  }

  public handleDuplicateTokenTransfer = async (
    data: any,
    address: string
  ): Promise<{}[] | null> => {
    let uniqueTransactions: {}[] = [];
    let uniqueTransactionsByBlockForCheck: { [key: string]: {}[] } = {};
    const dataSet = new Set<string>();

    for (const tx of data) {
      const key = JSON.stringify(tx);
      if (!dataSet.has(key)) {
        dataSet.add(key);
        uniqueTransactions.push(tx);
        if (uniqueTransactionsByBlockForCheck[tx.BlockNumber]) {
          uniqueTransactionsByBlockForCheck[tx.BlockNumber].push(tx);
        } else {
          uniqueTransactionsByBlockForCheck[tx.BlockNumber] = [tx];
        }
      } else {
        // This is a duplicate transaction
      }
    }

    for (let i = 0; i < uniqueTransactions.length; i++) {
      const tx: any = uniqueTransactions[i];
      const { TokenContractAddress, BlockNumber, TokenSymbol } = tx;
      const txsByBlock = uniqueTransactionsByBlockForCheck[BlockNumber];

      let balanceBefore: string = "0";
      let balanceAfter: string = "0";
      let changeAmount: string = "0";
      let condition = true;
      //start log
      balanceBefore = await this.getTokenBalance(
        TokenContractAddress,
        address,
        parseInt(BlockNumber) - 1
      );
      balanceAfter = await this.getTokenBalance(
        TokenContractAddress,
        address,
        parseInt(BlockNumber)
      );

      const updatedChangeAmount: any = txsByBlock.reduce(
        (accumulator: ethers.BigNumber, element: any) => {
          if (
            element.ErrCode?.length == 0 &&
            TokenSymbol == element.TokenSymbol
          ) {
            //if element?.TokensTransferred is null => that is NFT => always 1
            if (element.FromAddress?.toLowerCase() == address?.toLowerCase()) {
              return accumulator.sub(element?.TokensTransferred || 1);
            } else if (
              element.ToAddress?.toLowerCase() == address?.toLowerCase()
            ) {
              return accumulator.add(element?.TokensTransferred || 1);
            }
          }
          return accumulator;
        },
        this.formatUnits(changeAmount)
      );

      condition =
        parseInt(
          this.formatUnits(balanceBefore).add(updatedChangeAmount).toString()
        ) == parseInt(this.formatUnits(balanceAfter).toString());

      console.table([
        {
          token: tx.TokenSymbol,
          before: this.formatUnits(balanceBefore).toString(),
          change: updatedChangeAmount.toString(),
          after: this.formatUnits(balanceAfter).toString(),
          result: condition,
        },
      ]);

      if (!condition) {
        console.error("NOT MATCH");
        console.log(txsByBlock);
        process.exit(0);
      }
    }
    return uniqueTransactions;
  };

  public saveCsvToFile = async (outputPath: string, csvData: string) => {
    const filePath = path.join(outputPath);
    await fsPromise.writeFile(filePath, csvData);
    console.log("DONE!");
  };

  private getTokenBalance = async (
    tokenAddress: string,
    accountAddress: string,
    blockNumber: number
  ): Promise<string> => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(this.baseRpcUrl);
      const contract = new ethers.Contract(
        tokenAddress,
        ["function balanceOf(address) view returns (uint256)"],
        provider
      );
      const balance = await contract.balanceOf(accountAddress, {
        blockTag: blockNumber,
      });
      return ethers.utils.formatUnits(balance, 18);
    } catch (error) {
      console.error("Error:", error);
      console.table([tokenAddress, accountAddress, blockNumber]);

      return "0";
    }
  };
}
