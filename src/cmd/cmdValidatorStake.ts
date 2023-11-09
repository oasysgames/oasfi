// ValidatorStakeCommand.js
import { Arguments, Argv } from 'yargs';
import { processValidatorStake } from '../excutes/excuteCalcValidatorStake';
import { commissionRewardArgs } from '../types';

export const defineValidatorStakeCommand = (yargs: Argv) => {
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
};

export const processValidatorStakeCommand = async (
  argv: Arguments<commissionRewardArgs>,
) => {
  await processValidatorStake(argv);
};
