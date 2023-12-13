#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  defineCorrectCsvCommand,
  processCorrectCsvCommand,
} from './cmd/cmdCorrectCsv';
import {
  defineStakerRewardCommand,
  processStakerRewardCommand,
} from './cmd/cmdStakerReward';
import {
  defineValidatorRewardCommand,
  processValidatorRewardCommand,
} from './cmd/cmdValidatorReward';

const scriptName = './oasfi-os';
const argv = yargs(hideBin(process.argv))
  .scriptName(scriptName)
  .usage(`Usage: ${scriptName} COMMAND  [OPTIONS]`)
  .version('version', '1.0.1')
  .command(
    'correct-csv',
    'Check token balance and remove duplicate records from a CSV',
    defineCorrectCsvCommand,
    processCorrectCsvCommand,
  )
  .command(
    'export-validator-reward [validator_addresses]',
    'Export validator reward',
    defineValidatorRewardCommand,
    processValidatorRewardCommand,
  )
  .command(
    'export-staker-reward [staker_addresses]',
    'Export staker reward',
    defineStakerRewardCommand,
    processStakerRewardCommand,
  )
  .strictCommands()
  .recommendCommands()
  .demandCommand(1, 'You need to specify a command.')
  .help()
  .wrap(yargs(process.argv).terminalWidth()).argv;
