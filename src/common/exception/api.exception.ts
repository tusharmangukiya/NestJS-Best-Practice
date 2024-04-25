import { Log } from '../utility/logger/log';
import { Errors } from './error';
import { ExceptionSource } from './exception.source';
/**
 * This class helps to built-in exceptions layer which is responsible for processing all
 * unhandled exceptions across an application when an exception is not handled by your
 * application code, it is caught by this layer, which then automatically sends an appropriate
 * @author GWL
 * @see HttpException which contains root Error class object
 */
export class CustomException extends Error {
  public readonly errorCode: number;
  public readonly errorMessage: string;
  public readonly statusCode: number;
  public readonly originalMessage: string;
  public readonly originalException: string;
  public readonly SEPARATOR: string = '-';
  public source: any;
  public isPrintStackTrace = false;

  /**
   * this constructor helps to initialize the custom error exception
   * @param error contains cause of exception
   * @param e  contains cause of error
   */
  constructor(error: Partial<Errors>, e?: any) {
    super(e);
    this.originalException = e;
    this.errorCode = error?.errorCode;
    this.errorMessage = `${error?.errorCode}${this.SEPARATOR}${error?.errorMessage}`;
    this.statusCode = error?.statusCode;
    this.originalMessage = e?.message || error?.errorMessage;
  }
  /**
   * This method helps create a root cause exception
   * @param error contains cause of exception
   * @param source contains exception source object
   * @param e contains cause of error
   * @returns CustomException with source:
   */
  public static create(
    error: Partial<Errors>,
    source?: ExceptionSource,
    e?: any,
  ) {
    const exp = new CustomException(error, e);
    exp.source = source.getSource();
    return exp;
  }

  /**
   * This method helps print throw new error
   * @param errMsg contains error message4
   */
  public static throwError(errMsg: string) {
    throw new Error(errMsg);
  }
  /**
   * This method helps print error stack log developer can use after the create method
   * @param logger print the log method
   */
  public printStackTrace(logger: Log) {
    const es = !this.source?.isPrintStackTrace
      ? this.stack
      : this.originalException;
    logger.error(es);
    this.isPrintStackTrace = true;
  }
}
