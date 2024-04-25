import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtility } from '../utility/response.utility';
import { ErrorCodes } from './error-codes';

@Catch(BadRequestException)
export class ExpReqValidateFilter
  implements ExceptionFilter<BadRequestException>
{
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    //const status = exception.getStatus();
    console.log(host);
    const err = ErrorCodes.BAD_REQUEST_ERROR;
    const error = {
      errorMessage: err.errorMessage,
      statusCode: err.statusCode,
      errorCode: err.errorCode,
      originalMessage: exception.getResponse()['message'],
      source: '',
    };

    const customRes = ResponseUtility.getErrorResponse(error);
    response.json(customRes);
  }
}
