import { CustomException } from '../exception/api.exception';
import { ExceptionSource } from '../exception/exception.source';
import { Log } from './logger/log';
/**
 * This class helps to contains all common useful method which we can use
 * in any where
 */
export class CommonUtils {
  private static readonly logger = Log.getLogger(CommonUtils.name);
  /**
   * This method helps to throw custom exception
   * @param errorObj contains user defined error code and messages
   * @param e contains error object
   * @param logger contains logger obj
   */
  public static throwException(errorObj: any, e?: any, logger?: any) {
    logger
      ? new ExceptionSource(logger?.getClassName(), logger?.getMethodName())
      : null;
    throw new CustomException(errorObj, e);
  }

  /**
   * This method helps to throw new user defined exception
   * @param errorObj contains user defined error code and messages
   * @param logger contains logger obj
   */
  public static throwNewException(errorObj: any, logger?: any) {
    const source = logger
      ? new ExceptionSource(logger?.getClassName(), logger?.getMethodName())
      : null;
    throw new CustomException(errorObj, source);
  }
}
