#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  defineCorrectCsvCommand,
  processCorrectCsvCommand,
} from './cmd/cmdCorrectCsv';
import {
  defineValidatorStakeCommand,
  processValidatorStakeCommand,
} from './cmd/cmdValidatorStake';
void yargs(hideBin(process.argv))
  .usage('<command>  [OPTIONS]')
  .help('help')
  .alias('help', 'h')
  .version('version', '1.0.1')
  .alias('version', 'V')
  .command(
    'correct-csv',
    'Check token balance and remove duplicate records from a CSV',
    defineCorrectCsvCommand,
    processCorrectCsvCommand,
  )
  .command(
    'export-commission-reward [validator_address] [staker_address]',
    'Export commission reward',
    defineValidatorStakeCommand,
    processValidatorStakeCommand,
  )
  .help().argv;
