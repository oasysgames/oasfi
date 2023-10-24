#!/usr/bin/env node

import * as fsPromise from "fs/promises";
import * as Papa from "papaparse";
import yargs, { Arguments, Argv, showHelp } from "yargs";
import { hideBin } from "yargs/helpers";
import { CorrectCsvArgs, commissionRewardArgs } from "./types";
import { TokenTransfer } from "./module/TokenTransfer";
import { commissionReward } from "./module/Validator";
import { saveCsvToFile } from "./service/csvService";

async function processCorrectCsv(args: CorrectCsvArgs) {
  const { chain, input, output } = args;
  const tokenTransfer = new TokenTransfer(chain);
  const csvContent = await fsPromise.readFile(input, "utf-8");
  const result = Papa.parse(csvContent, { header: true });
  const data = await tokenTransfer.handleDuplicateTokenTransfer(result.data);
  await saveCsvToFile(output, Papa.unparse(data));
}

async function processCommissionReward(args: commissionRewardArgs) {
  await commissionReward(args)
}



void yargs(hideBin(process.argv))
  .usage("<command>  [OPTIONS]")
  .help('help').alias('help', 'h')
  .version('version', '1.0.1').alias('version', 'V')
  .command(
    "correct-csv",
    "Check token balance and remove duplicate records from a CSV",
    (yargs: Argv) => {
      return yargs.options({
        input: {
          alias: 'i',
          description: "Input CSV file",
          requiresArg: true,
          required: true,
        },
        output: {
          alias: 'o',
          description: "Output CSV file",
          requiresArg: true,
          required: true
        },
        chain: {
          alias: 'c',
          description: "Chain name",
          requiresArg: true,
          required: true
        }
      })
    },
    async (argv: Arguments<CorrectCsvArgs>) => {
      try {
        await processCorrectCsv(argv);
      } catch (error) {
        console.error(`An error occurred: ${error.message}`);
      }
    }
  )
  .command("export-commission-reward [validator_address]", "Export commission reward",
    (yargs: Argv) => {
      return yargs.options({
        validator_address: {
          description: "validator address",
          requiresArg: true,
          required: true,
          type:'string'
        },
        chain: {
          alias: 'c',
          description: "Chain name",
          requiresArg: true,
          required: true
        },
        from_epoch: {
          type: 'number',
          description: 'from epoch',
        },
        to_epoch: {
          type: 'number',
          description: 'to epoch',
        },
        from_data: {
          type: 'string',
          description: 'from datetime YYYY-MM-DDTHH:MM:SS',
        },
        to_data: {
          type: 'string',
          description: 'to datetime YYYY-MM-DDTHH:MM:SS',
        },
        price_time: {
          type: 'string',
          description: 'utc time price - format: HH:MM:SS',
        },
        price: {
          type: 'string',
          description: 'price',
        },
        time_zone: {
          type: 'string',
          description: 'timezone',
        },
        export_csv_online: {
          type: 'string',
          description: 'export csv online',
        },
        output: {
          alias: 'o',
          description: "Output CSV file"
        }
      })
    }, async (argv: Arguments<commissionRewardArgs>) => {
      await processCommissionReward(argv);
      try {
      } catch (error) {
        console.error(`An error occurred: ${error.message}`);
      }
    })

  .help().argv;

