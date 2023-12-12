import { Arguments, Argv } from 'yargs';
import { CorrectCsvArgs } from '../types';
import { LogUtils } from '../utils/Logger';
import { main } from '../execute/executeCorrectCsv';

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
