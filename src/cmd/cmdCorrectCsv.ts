import { Arguments, Argv } from 'yargs';
import { processCorrectCsv } from '../excutes/excuteCorrectCsv';
import { CorrectCsvArgs } from '../types';

export const defineCorrectCsvCommand = (yargs: Argv) => {
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
};

export const processCorrectCsvCommand = async (
  argv: Arguments<CorrectCsvArgs>,
) => {
  await processCorrectCsv(argv);
};
