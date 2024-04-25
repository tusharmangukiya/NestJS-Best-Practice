import { Injectable, LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppConfig } from 'resources/app.config';
import { DefaultConfig } from 'resources/default.config';
import { Logger, createLogger, format, transports } from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
@Injectable()
export class LoggerConfig {
  public static loggerInstance: Logger;
  private static loggerWNInstance: LoggerService;
  constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the LoggerConfig class while keeping
   * just one instance of each subclass around.
   */
  public static getLoggerInstance(level?: string) {
    if (!LoggerConfig.loggerInstance) {
      LoggerConfig.loggerInstance = createLogger(
        this.createLoggerInstance(level),
      );
    }
    console.log(this.loggerInstance.level);
    return LoggerConfig.loggerInstance;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the LoggerConfig class while keeping
   * just one instance of each subclass around.
   */
  public static getNWLoggerInstance(level?: string) {
    if (!LoggerConfig.loggerWNInstance) {
      LoggerConfig.loggerWNInstance = WinstonModule.createLogger(
        this.createLoggerInstance(level),
      );
    }
    return LoggerConfig.loggerInstance;
  }

  /**
   * This method helps to return singleton logger instance
   * @returns LoggerService winston logger service
   */
  public static getLogger(level?: string | any) {
    return LoggerConfig.getLoggerInstance(level);
  }

  /**
   * This method help get the logger configuration like file and console
   * @param configService
   */
  private static getLogConfigFormat(logConfiguration: any) {
    const logConsole = {
      //level: (level) ? level : configService.get<any>('logger.console.level'),
      format: format.combine(
        format.colorize(logConfiguration.logger.console.colorize),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.printf((info) => {
          return this.getLogFormat(info);
        }),
      ),
    };
    const log_file = logConfiguration.logger.logfile;

    return { logConsole, log_file };
  }
  /**
   * This method help set winston log configuration  like
   * @param configService
   * @param level
   */
  public static createLoggerInstance(level?: string | any) {
    try {
      const logLevel =
        typeof level == 'string'
          ? level
          : AppConfig.get('LOG_LEVEL') || DefaultConfig.LOG_LEVEL;
      const logConf = this.getLoggerConf();
      const transport = this.getLogConfigFormat(logConf);
      return {
        level: logLevel,
        /* defaultMeta: {
          module: options.module || "",
        },*/
        format: format.combine(
          format.label({ label: '[Build] 1.0 ', message: false }),
          format.timestamp({
            format: logConf.logger.console.format,
          }),
          format.errors({ stack: true }),
          format.splat(),
          format.json(),
          format.printf((info) => {
            return this.getLogFormat(info);
          }),
          format.align(),
        ),
        transports: [
          new transports.Console(transport.logConsole),
          new winstonDailyRotateFile(transport.log_file),
        ],
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   * This method help set logger for console and file
   * @param info
   */
  private static getLogFormat(info: any) {
    const logFormat = `${info.label}-${info.timestamp} [${info.level}] [${
      info.context ? info.context : 'None'
    }] [${info.stack ? info.stack : 'None'}] ${info.message}`;
    return logFormat;
  }

  /**
   * This method helps to get logger configuration if logger file not mention in application config file then
   * its get from default logger configuration file
   * @param configService contains config object
   * @returns defaultLogConfiguration object
   */
  private static getLoggerConf() {
    const fileName = AppConfig.get('LOGGER_FILE');
    let lConf: any;
    if (fileName) {
      lConf = AppConfig.loadFile(fileName);
    } else {
      lConf = DefaultConfig.loadDefault();
    }
    return lConf;
  }
}
