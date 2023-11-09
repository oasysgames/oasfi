#!/usr/bin/env node

import yargs, { Arguments, Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { processValidatorStake } from './cmd/cmdCalcValidatorStake';
import { processCorrectCsv } from './cmd/cmdCorrectCsv';
import { CorrectCsvArgs, commissionRewardArgs } from './types';

void yargs(hideBin(process.argv))
  .usage('<command>  [OPTIONS]')
  .help('help')
  .alias('help', 'h')
  .version('version', '1.0.1')
  .alias('version', 'V')
  .command(
    'correct-csv',
    'Check token balance and remove duplicate records from a CSV',
    (yargs: Argv) => {
      return yargs.options({
        input: {
          alias: 'i',
          description: 'Input CSV file',
          requiresArg: true,
          required: true,
        },
        output: {
          alias: 'o',
          description: 'Output CSV file',
          requiresArg: true,
          required: true,
        },
        chain: {
          alias: 'c',
          description: 'Chain name',
          requiresArg: true,
          required: true,
        },
      });
    },
    async (argv: Arguments<CorrectCsvArgs>) => {
      await processCorrectCsv(argv);
    },
  )
  .command(
    'export-commission-reward [validator_address]',
    'Export commission reward',
    (yargs: Argv) => {
      return yargs.options({
        validator_address: {
          description: 'validator address',
          requiresArg: true,
          required: true,
          type: 'string',
        },
        staker: {
          type: 'string',
          description: 'staker of validator',
        },
        chain: {
          alias: 'c',
          description: 'Chain name',
          requiresArg: true,
          required: true,
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
          description: 'UTC time price - format: HH:MM:SS',
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
          description: 'Output CSV file',
        },
      });
    },
    async (argv: Arguments<commissionRewardArgs>) => {
      await processValidatorStake(argv);
    },
  )

  .help().argv;
