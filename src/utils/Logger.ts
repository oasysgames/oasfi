import { Logger } from 'winston';
import winston = require('winston');
import path = require('path');
import fs = require('fs');
type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'fatal' | 'trace';
export class LogUtils {
  private logger: Logger;
  constructor(logDir: string, logFileName: string) {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(logDir, logFileName),
        }),
      ],
    });
  }

  log(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - [${level}]: ${message}`;
    this.logger.log(level, logMessage);
  }
}
