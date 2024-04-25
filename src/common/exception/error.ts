/**
 * This class helps to set  the error code , status, and message
 */
export class Errors {
  public errorCode: number;
  public statusCode: number;
  public errorMessage: string;
  constructor(errorCode: number, statusCode: number, errorMessage: string) {
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}
