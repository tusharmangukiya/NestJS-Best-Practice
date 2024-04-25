import { INestApplication } from '@nestjs/common';
import { Log } from './common/utility/logger/log';

/**
 *
 * This class helps to set the all nest factory configuration
 * <p>
 * This can we use this object on all our project and files*
 * @author      GWL
 * @version     %I%, %G%
 * @since       1.0
 */
export class Application {
  private static app: INestApplication;

  /**
   * This method helps to set nest js factory object
   *
   * @param app contain NestJS factory object
   */
  static setApp(app: INestApplication) {
    this.app = app;
  }

  /**
   * This method helps to set auto validation pips
   *
   */
  static addEnhancement() {}
  /**
   * This method help to get project configuration which is mentioned in yaml,
   * JSON and .env file
   *
   * @param tInput contain string key which set in yaml ,json and .evn file
   * @returns key value for the project configuration
   */
  static applyCustomLogger(logger?: any) {
    return logger ? logger : new Log(Application.name);
  }

  /*static setConf(configService: ConfigService) {
    this.confService = configService;
  }*/
}
