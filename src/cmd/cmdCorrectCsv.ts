import { Arguments, Argv } from 'yargs';
import { main } from '../execute/executeCorrectCsv';
import { CorrectCsvArgs } from '../types';
import { LogUtils } from '../utils/Logger';

export const defineCorrectCsvCommand = (yargs: Argv) => {
  return yargs.options({
    input: {
      alias: 'i',
      description: 'Input CSV file',
      requiresArg: true,
      required: true,
    },
    chain: {
      alias: 'c',
      description: 'Chain name',
    },
    output: {
      alias: 'o',
      description: 'Output CSV file',
      requiresArg: true,
      required: true,
    },
  });
};

export const processCorrectCsvCommand = async (
  argv: Arguments<CorrectCsvArgs>,
) => {
  try {
    await main(argv);
  } catch (error) {
    const Logger = new LogUtils('logs', 'log-correctCsv/log-error.txt');
    console.log(error);
    Logger.log('error', `${error}`);
  }
};
