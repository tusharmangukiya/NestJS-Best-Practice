import { HttpStatus } from '@nestjs/common';
import {
  ADD_DEPARTMENT_ERROR,
  DATA_NOT_FOUND_ERROR,
  FETCH_DB_DATA_ERROR,
  EDIT_DEPARTMENT_ERROR,
  DELETE_DEPARTMENT_ERROR,
  FILE_NOT_FOUND,
  FILE_READ_PROCESS,
  ADD_STUDENT_ERROR,
  ADD_STUDENT_DETAIL_ERROR,
  GET_STUDENT_ERROR,
  PARAM_NOT_FOUND,
} from '../../../message/error.messages';
import { Errors } from './error';

/**
 * This class helps to get the error code , status, and message
 */
export const ErrorCodes = {
  ADD_DEPARTMENT_ERROR: new Errors(
    5001,
    HttpStatus.INTERNAL_SERVER_ERROR,
    ADD_DEPARTMENT_ERROR,
  ),
  EDIT_DEPARTMENT_ERROR: new Errors(
    5002,
    HttpStatus.INTERNAL_SERVER_ERROR,
    EDIT_DEPARTMENT_ERROR,
  ),
  DELETE_DEPARTMENT_ERROR: new Errors(
    5003,
    HttpStatus.INTERNAL_SERVER_ERROR,
    DELETE_DEPARTMENT_ERROR,
  ),
  FETCH_DB_DATA_ERROR: new Errors(
    5004,
    HttpStatus.INTERNAL_SERVER_ERROR,
    FETCH_DB_DATA_ERROR,
  ),
  DATA_NOT_FOUND_ERROR: new Errors(
    5005,
    HttpStatus.INTERNAL_SERVER_ERROR,
    DATA_NOT_FOUND_ERROR,
  ),
  FILE_NOT_FOUND: new Errors(
    5006,
    HttpStatus.INTERNAL_SERVER_ERROR,
    FILE_NOT_FOUND,
  ),
  FILE_READ_PROCESS: new Errors(
    5006,
    HttpStatus.INTERNAL_SERVER_ERROR,
    FILE_READ_PROCESS,
  ),
  ADD_STUDENT_ERROR: new Errors(
    5007,
    HttpStatus.INTERNAL_SERVER_ERROR,
    ADD_STUDENT_ERROR,
  ),
  ADD_STUDENT_DETAIL_ERROR: new Errors(
    5008,
    HttpStatus.INTERNAL_SERVER_ERROR,
    ADD_STUDENT_DETAIL_ERROR,
  ),
  GET_STUDENT_ERROR: new Errors(
    5009,
    HttpStatus.INTERNAL_SERVER_ERROR,
    GET_STUDENT_ERROR,
  ),
  BAD_REQUEST_ERROR: new Errors(
    5010,
    HttpStatus.BAD_REQUEST,
    GET_STUDENT_ERROR,
  ),
  PARAM_NOT_FOUND: new Errors(
    5011,
    HttpStatus.INTERNAL_SERVER_ERROR,
    PARAM_NOT_FOUND,
  ),
};
