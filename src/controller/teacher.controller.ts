import { Controller, Post, Body, Req, Res, Get, RequestMethod } from '@nestjs/common';
import { Request, Response } from 'express';
import { Messages } from 'message/messages';
import { TeacherDto } from '../common/dto/teacher.dto';
import { TeacherDetailDto } from '../common/dto/teacherDetail.dto';
import { CustomException } from '../common/exception/api.exception';
import { Log } from '../common/utility/logger/log';
import { ResponseUtility } from '../common/utility/response.utility';
import { TeacherService } from '../service/teacher.service';

@Controller('api/v1')
export class TeacherController {
  private readonly logger = Log.getLogger(TeacherController.name);
  constructor(private readonly teacherService: TeacherService) {}

  /**
   * This end point use for add department in the system.
   * @param req request params
   * @param res api response
   * @param department_req data required for add department
   * @returns success or error with data or error messages.
   */
  @Post('teacher/addTeacher')
  async addTeacher(
    @Req() req: Request,
    @Res() res: Response,
    @Body() teacher_req: TeacherDto,
  ) {
    this.logger.enter('addTeacher');
    let response = null;
    try {
      const teacher: any = await this.teacherService.addTeacher(teacher_req);
      if (teacher) {
        response = ResponseUtility.getResponse(
          teacher,
          Messages.ADD_TEACHER,
          RequestMethod.POST,
        );
        this.logger.debug(`Teacher response ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Teacher response ${JSON.stringify(response)}`);
    this.logger.exit('addTeacher');
    return res.json(response);
  }

  /**
   * This end point use for add teacher detail in the system.
   * @param req request params
   * @param res api response
   * @param teacher_detail_req data required for teacher detail
   * @returns success or error with data or error messages.
   */
  @Post('teacher/addTeacherDetails')
  async addTeacherDetails(
    @Req() req: Request,
    @Res() res: Response,
    @Body() teacher_detail_req: TeacherDetailDto,
  ) {
    this.logger.enter('addTeacherDetails');
    let response = null;
    try {
      const teacher_details: any = await this.teacherService.addTeacherDetail(
        teacher_detail_req,
      );
      if (teacher_details) {
        response = ResponseUtility.getResponse(
          teacher_details,
          Messages.ADD_TEACHER_DETAILS,
          RequestMethod.POST,
        );
        this.logger.debug(
          `teacher detail response ${JSON.stringify(response)}`,
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
    this.logger.debug(`teacher detail response ${JSON.stringify(response)}`);
    this.logger.exit('addTeacherDetails');
    return res.json(response);
  }

  @Get('teacher/getAllTeacher')
  async getAllTeacher(@Req() req: Request, @Res() res: Response) {
    this.logger.enter('getAllTeacher');
    let response = null;
    try {
      const teachers = await this.teacherService.getAllTeacher();
      response = ResponseUtility.getResponse(
        teachers,
        Messages.GET_TEACHER,
        RequestMethod.GET,
      );
      this.logger.debug(`Teacher response ${JSON.stringify(response)}`);
    } catch (error) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Teacher response ${JSON.stringify(response)}`);
    this.logger.exit('getAllTeacher');
    return res.json(response);
  }
}
