#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  defineCommissionRewardCommand,
  processCommissionRewardCommand,
} from './cmd/cmdCommissionReward';
import {
  defineCorrectCsvCommand,
  processCorrectCsvCommand,
} from './cmd/cmdCorrectCsv';
import {
  defineStakingRewardCommand,
  processStakingRewardCommand,
} from './cmd/cmdStakingReward';
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
    'export-commission-reward [validator_address]',
    'Export commission reward',
    defineCommissionRewardCommand,
    processCommissionRewardCommand,
  )
  .command(
    'export-staking-reward [validator_address] [staker_address]',
    'Export staking reward',
    defineStakingRewardCommand,
    processStakingRewardCommand,
  )

  .help().argv;
