import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  RequestMethod,
  Res,
  ValidationPipe,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { Messages } from 'message/messages';
import { StudentDto } from '../common/dto/student.dto';
import { StudentDetailDto } from '../common/dto/studentDetail.dto';
import { CustomException } from '../common/exception/api.exception';
import { Log } from '../common/utility/logger/log';
import { ResponseUtility } from '../common/utility/response.utility';
import { StudentService } from '../service/student.service';

@Controller('api/v1')
export class StudentController {
  private readonly logger = Log.getLogger(StudentController.name);
  constructor(private readonly studentService: StudentService) {}

  /**
   * This end point use for add student in the system.
   * @param req request params
   * @param res api response
   * @param student_req data required for add student
   * @returns success or error with data or error messages.
   */
  @Post('student/addStudent')
  async addStudent(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) student_req: any,
  ) {
    this.logger.enter('addStudent');
    let response = null;
    try {
      const student: any = await this.studentService.addStudent(student_req);
      if (student) {
        response = ResponseUtility.getResponse(
          student,
          Messages.ADD_STUDENT,
          RequestMethod.POST,
        );
        this.logger.debug(`Student response ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        // const default
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Student response ${JSON.stringify(response)}`);
    this.logger.exit('addStudent');
    return res.json(response);
  }

  /**
   * This end point use for add student detail in the system.
   * @param req request params
   * @param res api response
   * @param student_detail_req data required for student detail
   * @returns success or error with data or error messages.
   */
  @Post('student/addStudentDetails')
  async addStudentDetails(
    @Req() req: Request,
    @Res() res: Response,
    @Body() student_detail_req: StudentDetailDto,
  ) {
    this.logger.enter('addStudentDetails');
    let response = null;
    try {
      const student_details: any = await this.studentService.addStudentDetail(
        student_detail_req,
      );
      if (student_details) {
        response = ResponseUtility.getResponse(
          student_details,
          Messages.ADD_STUDENT_DETAILS,
          RequestMethod.POST,
        );
        this.logger.debug(
          `Student detail response ${JSON.stringify(response)}`,
        );
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Student detail response ${JSON.stringify(response)}`);
    this.logger.exit('addStudentDetails');
    return res.json(response);
  }

  /**
   * This end point use for edit student details of particular student.
   * @param req request params
   * @param res api response
   * @param course_req data required for edit student details
   * @returns success or error with data or error messages.
   */
  @Post('student/editStudentDetail')
  async editStudentDetail(
    @Req() req: Request,
    @Res() res: Response,
    @Body() edit_student_detail_req: StudentDetailDto,
  ) {
    this.logger.enter('editStudentDetail');
    let response = null;
    try {
      const student_details: any = await this.studentService.editStudentDetail(
        edit_student_detail_req,
      );
      if (student_details) {
        response = ResponseUtility.getResponse(
          student_details,
          Messages.UPDATE_STUDENT_DETAIL,
          RequestMethod.POST,
        );
        this.logger.debug(`Student details ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Student details response ${JSON.stringify(response)}`);
    this.logger.exit('editStudentDetail');
    return res.json(response);
  }

  /**
   * This end point use for edit student of particular student.
   * @param req request params
   * @param res api response
   * @param course_req data required for edit student
   * @returns success or error with data or error messages.
   */
  @Post('student/editStudent')
  async editStudent(
    @Req() req: Request,
    @Res() res: Response,
    @Body() edit_student_req: StudentDto,
  ) {
    this.logger.enter('editStudent');
    let response = null;
    try {
      const student: any = await this.studentService.editStudent(
        edit_student_req,
      );
      if (student) {
        response = ResponseUtility.getResponse(
          student,
          Messages.UPDATE_STUDENT,
          RequestMethod.POST,
        );
        this.logger.debug(`Student ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Student response ${JSON.stringify(response)}`);
    this.logger.exit('editStudent');
    return res.json(response);
  }

  @Get('student/getAllStudent')
  async getAllStudent(@Req() req: Request, @Res() res: Response) {
    this.logger.enter('getAllStudent');
    let response = null;
    try {
      const students = await this.studentService.getAllStudent();
      response = ResponseUtility.getResponse(
        students,
        'Student fetch successfully.',
        RequestMethod.GET,
      );
      this.logger.debug(`Student response ${JSON.stringify(response)}`);
    } catch (error) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Student response ${JSON.stringify(response)}`);
    this.logger.exit('getAllStudent');
    return res.json(response);
  }
}
