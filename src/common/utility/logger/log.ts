import { Application } from 'src/application';
import { Logger } from 'winston';
import { LoggerConfig } from './logger.config';

/**
 * This class help initialize third party log api
 */
export class Log {
  private logger: Logger;
  private readonly _className: string;
  public static instance: Log;

  /**
   * This constructor method help set log on class level
   * @param className contains class name
   */

  constructor(className?: string, logLevel?: string) {
    this._className = className ? className : this._className;
    this.logger = LoggerConfig.getLogger(logLevel).child({
      context: className,
    });
    this.logger.info(`Logger class constructor :: ${this._className}`);
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Log class while keeping
   * just one instance of each subclass around.
   */
  static getInstance(className?: string, logLevel?: string) {
    if (!Log.instance) {
      Log.instance = new Log(className, logLevel);
    }
    return Log.instance;
  }

  /**
   * This method helps to return singleton log instance
   * @returns Log instance
   */
  static getLogger(className?: string, logLevel?: string) {
    return Log.getInstance(className, logLevel);
  }
  /**
   * This method should be call when we enter in method and
   * @param methodName contains method name
   */
  public enter(methodName: string) {
    this.logger.info(`Enter: In ${methodName} method`);
  }

  /**
   * This method should be call when we exit in method
   * @param methodName contains method name
   */
  public exit(methodName: string) {
    this.logger.info(`Exit: From ${methodName} method`);
  }

  /**
   * This method helps to print the debug information
   * @param value contains logged value
   */
  public debug(value: any) {
    this.logger.debug(value);
  }

  /**
   * This method helps to print the information log
   * @param value contains logged value
   */
  public info(value: any) {
    this.logger.info(value);
  }

  /**
   * This method helps to print the warning log
   * @param value contains logged value
   */
  public warn(value: any) {
    this.logger.warn(value);
  }

  /**
   * This method should be call when we wants to error log
   * @param message contains message string
   * @param error default set null or log error
   */
  public error(message: any, error?: any) {
    this.logger.error(message, error);
  }

  /**
   * This method should be call when we wants to 'log' log
   * @param message contains message string
   * @param error default set null or log error
   */
  public log(value: any) {
    this.logger.info(value);
  }
  /**
   * This method should be call when we wants to verbose log
   * @param message contains message string
   * @param error default set null or log error
   */
  public verbose(value: any) {
    this.logger.verbose(value);
  }

  public printAllLog() {
    this.logger.info('Info logs');
    this.logger.debug('debug logs');
    this.logger.error('Error logs');
    this.logger.warn('warn logs');
    this.logger.verbose('verbose logs');
  }

  /**
   * This method help set log level on run time
   * @param configService
   * @param level
   */
  setLogLevel(logLevel: string) {
    if (logLevel) {
      LoggerConfig.loggerInstance = null;
      Log.instance = null;
      const t = new Log(this._className, logLevel);
      this.logger = t.logger;
      Application.applyCustomLogger(t);
    }
  }
}
