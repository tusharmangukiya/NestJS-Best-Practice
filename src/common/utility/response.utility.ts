import { HttpStatus, RequestMethod } from '@nestjs/common';
import { Log } from './logger/log';

export class ResponseUtility {
  private static readonly logger = Log.getLogger(ResponseUtility.name);

  /**
   * This method help to populate final user for end user
   * @param data contains user define response
   * @param message contains message string
   * @param req contains request param
   * @returns json response to the user
   */
  public static getResponse(data: any, message: string, method: number) {
    this.logger.enter(`getResponse`);

    const statusCode = this.getReqMethodTypeStatusCode(method);
    this.logger.debug(`Status code :: ${statusCode}`);
    const successResponse = {
      res_data: {
        data: data,
        message: message,
        status_code: statusCode,
      },
    };
    this.logger.debug(`Response :: ${JSON.stringify(successResponse)}`);
    this.logger.exit(`getResponse`);
    return successResponse;
  }
  /**
   * this method helps to get the status-code for end user
   * @param methodType contains method type like post, get put,
   * @returns return status code
   */
  private static getReqMethodTypeStatusCode(methodType: number) {
    this.logger.enter(`Enter getReqMethodTypeStatusCode method`);
    let statusCode = null;
    this.logger.debug(`Method type ${methodType}`);

    if (methodType == RequestMethod.GET) {
      statusCode = HttpStatus.OK;
    } else if (methodType == RequestMethod.POST) {
      statusCode = HttpStatus.CREATED;
    } else if (methodType == RequestMethod.PUT) {
      statusCode = HttpStatus.ACCEPTED;
    } else {
      statusCode = HttpStatus.OK;
    }
    this.logger.exit(`End getReqMethodTypeStatusCode method`);
    return statusCode;
  }
  /**
   * This method helps to populate error response for end user.
   * @param error contains object
   * @returns error response for end  user
   */
  public static getErrorResponse(error: any) {
    this.logger.enter(`Enter getErrorResponse method`);
    const errorResponse = {
      error: {
        status_code: error.statusCode || error?.status,
        code: error.errorCode || error?.code,
        message: error.errorMessage,
        org_exp_message: error.originalMessage || error?.message,
        source: error.source,
      },
    };
    this.logger.debug(`JSON Error response:: ${JSON.stringify(errorResponse)}`);
    this.logger.exit(`End getErrorResponse method`);
    return errorResponse;
  }

  /**
   * This method helps to populate error response for end user.
   * @param error contains object
   * @returns error response for end  user
   */
  /* public static getExceptionResponse(errorCodes: any, statusCode:number, orgExpMsg?:string, expSource?:any) {
    this.logger.enter(`getExceptionResponse`);
    const errorResponse = {
      error: {
        status_code: error.statusCode || error?.status,
        code: error.errorCode || error?.code,
        message: error.errorMessage,
        org_exp_message: error.originalMessage || error?.message,
        source: error.source,
      },
    };
    this.logger.debug(`JSON Error response:: ${JSON.stringify(errorResponse)}`);
    this.logger.exit(`getExceptionResponse`);
    return errorResponse;
  }*/
}
