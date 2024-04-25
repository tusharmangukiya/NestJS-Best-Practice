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
import { DepartmentReqDto } from 'src/common/dto/department.dto';
import { CustomException } from 'src/common/exception/api.exception';
import { ResponseUtility } from 'src/common/utility/response.utility';
import { Log } from '../common/utility/logger/log';
import { DepartmentService } from '../service/department.service';
import { Messages } from 'message/messages';

@Controller('api/v1')
export class DepartmentController {
  private readonly logger = Log.getLogger(DepartmentController.name);
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * This end point use for add department in the system.
   * @param req request params
   * @param res api response
   * @param department_req data required for add department
   * @returns success or error with data or error messages.
   */
  @Post('department/addDepartment')
  async addDepartment(
    @Req() req: Request,
    @Res() res: Response,
    @Body() department_req: DepartmentReqDto,
  ) {
    this.logger.enter('addDepartment');
    let response = null;
    try {
      const department: any = await this.departmentService.addDepartment(
        department_req,
      );
      if (department) {
        response = ResponseUtility.getResponse(
          department,
          Messages.ADD_DEPARTMENT,
          RequestMethod.POST,
        );
        this.logger.debug(`Department response ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Department response ${JSON.stringify(response)}`);
    this.logger.exit('addDepartment');
    return res.json(response);
  }

  /**
   * This end point use for add department in the system.
   * @param req request params
   * @param res api response
   * @param department_req data required for add department
   * @returns success or error with data or error messages.
   */
  @Post('department/editDepartment')
  async editDepartment(
    @Req() req: Request,
    @Res() res: Response,
    @Body() edit_department_req: DepartmentReqDto,
  ) {
    this.logger.enter('editDepartment');
    let response = null;
    try {
      const department: any = await this.departmentService.editDepartment(
        edit_department_req,
      );
      if (department) {
        response = ResponseUtility.getResponse(
          department,
          Messages.UPDATE_DEPT,
          RequestMethod.POST,
        );
        this.logger.debug(`Department response ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Department response ${JSON.stringify(response)}`);
    this.logger.exit('editDepartment');
    return res.json(response);
  }

  /**
   * This end point use for remove department in the system.
   * @param res For give response of the end point
   * @param req
   * @param id department id which we need to removed
   * @returns response with success or failed status
   */
  @Delete('department/deleteDepartment/:id')
  async deleteDepartment(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    this.logger.enter('deleteDepartment');
    let response = null;
    try {
      const department: any = await this.departmentService.deleteDepartment(id);
      if (department) {
        response = ResponseUtility.getResponse(
          department,
          Messages.REMOVE_DEPT,
          RequestMethod.DELETE,
        );
        this.logger.debug(`Department response ${JSON.stringify(response)}`);
      }
    } catch (error) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Department response ${JSON.stringify(response)}`);
    this.logger.exit('deleteDepartment');
    return res.json(response);
  }

  /**
   * This end point use for fatch department by id.
   * @param req
   * @param res departments and students
   * @returns all department with student details.
   */
   @Get('department/:id')
   async getDepartmentById(@Req() req: Request, @Res() res: Response, @Param('id') departmentId: string) {
     this.logger.enter('getDepartmentById');
     let response = null;
     try {
       const departments = await this.departmentService.getDepartmentById(departmentId);
       response = ResponseUtility.getResponse(
         departments,
         Messages.GET_DEPT,
         RequestMethod.GET,
       );
       this.logger.debug(`Department response ${JSON.stringify(response)}`);
     } catch (error) {
       this.logger.error('Error while getting on service', error);
       if (error instanceof CustomException) {
         response = ResponseUtility.getErrorResponse(error);
       } else {
         response = ResponseUtility.getErrorResponse(error);
       }
     }
     this.logger.debug(`Department response ${JSON.stringify(response)}`);
     this.logger.exit('getDepartmentById');
     return res.json(response);
   }
 

  /**
   * This end point use for fatch all departments.
   * @param req
   * @param res departments and students
   * @returns all department with student details.
   */
  @Get('department/getAllDepartment')
  async getAllDepartment(@Req() req: Request, @Res() res: Response) {
    this.logger.enter('getAllDepartment');
    let response = null;
    try {
      const departments = await this.departmentService.getAllDepartment();
      response = ResponseUtility.getResponse(
        departments,
        Messages.GET_DEPT,
        RequestMethod.GET,
      );
      this.logger.debug(`Department response ${JSON.stringify(response)}`);
    } catch (error) {
      this.logger.error('Error while getting on service', error);
      if (error instanceof CustomException) {
        response = ResponseUtility.getErrorResponse(error);
      } else {
        response = ResponseUtility.getErrorResponse(error);
      }
    }
    this.logger.debug(`Department response ${JSON.stringify(response)}`);
    this.logger.exit('getAllDepartment');
    return res.json(response);
  }
}
