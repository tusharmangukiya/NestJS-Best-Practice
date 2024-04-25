import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Delete,
  Param,
  Get,
  RequestMethod,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CourseDto } from 'src/common/dto/course.dto';
import { CustomException } from 'src/common/exception/api.exception';
import { Log } from '../common/utility/logger/log';
import { ResponseUtility } from 'src/common/utility/response.utility';
import { CourseService } from '../service/course.service';
import { Messages } from 'message/messages';

@Controller('api/v1')
export class CourseController {
  private readonly logger = Log.getLogger(CourseController.name);
  constructor(private readonly courseService: CourseService) {}

  /**
   * This end point use for add course in the system.
   * @param req request params
   * @param res api response
   * @param course_req data required for add course
   * @returns success or error with data or error messages.
   */
  @Post('course/addCourse')
  async addCourse(
    @Req() req: Request,
    @Res() res: Response,
    @Body() course_req: CourseDto,
  ) {
    this.logger.enter('addCourse');
    let response = null;
    try {
      const course: any = await this.courseService.addCourse(course_req);
      if (course) {
        response = ResponseUtility.getResponse(
          course,
          Messages.ADD_COURSE,
          RequestMethod.POST,
        );
        this.logger.debug(`Course response ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Course response ${JSON.stringify(response)}`);
    this.logger.exit('addCourse');
    return res.json(response);
  }

  /**
   * This end point use for edit course in the system.
   * @param req request params
   * @param res api response
   * @param course_req data required for edit course
   * @returns success or error with data or error messages.
   */
  @Post('course/editCourse')
  async editCourse(
    @Req() req: Request,
    @Res() res: Response,
    @Body() edit_course_req: CourseDto,
  ) {
    this.logger.enter('editCourse');
    let response = null;
    try {
      const course: any = await this.courseService.editCourse(edit_course_req);
      if (course) {
        response = ResponseUtility.getResponse(
          course,
          Messages.UPDATE_COURSE,
          RequestMethod.POST,
        );
        this.logger.debug(`Course response ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Course response ${JSON.stringify(response)}`);
    this.logger.exit('editCourse');
    return res.json(response);
  }

  /**
   * This end point use for remove course in the system.
   * @param res For give response of the end point
   * @param req
   * @param id course id which we need to removed
   * @returns response with success or faild status
   */
  @Delete('course/deleteCourse/:id')
  async deleteCourse(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    this.logger.enter('deleteCourse');
    let response = null;
    try {
      const course: any = await this.courseService.deleteCourse(id);
      if (course) {
        response = ResponseUtility.getResponse(
          course,
          Messages.REMOVE_COURSE,
          RequestMethod.DELETE,
        );
        this.logger.debug(`Course response ${JSON.stringify(response)}`);
      }
    } catch (error) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Course response ${JSON.stringify(response)}`);
    this.logger.exit('deleteCourse');
    return res.json(response);
  }

  /**
   * This end point use for fatch all courses.
   * @param req
   * @param res courses with students and teachers.
   * @returns all course with student details and teachers details.
   */
  @Get('course/getAllCourse')
  async getAllCourse(@Req() req: Request, @Res() res: Response) {
    this.logger.enter('getAllStudent');
    let response = null;
    try {
      const courses = await this.courseService.getAllCourse();
      response = ResponseUtility.getResponse(
        courses,
        Messages.GET_COURSE,
        RequestMethod.GET,
      );
      this.logger.debug(`Course response ${JSON.stringify(response)}`);
    } catch (error) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Course response ${JSON.stringify(response)}`);
    this.logger.exit('getAllCourse');
    return res.json(response);
  }
}
