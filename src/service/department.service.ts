import { Injectable } from '@nestjs/common';

import { CustomException } from 'src/common/exception/api.exception';
import { ErrorCodes } from 'src/common/exception/error-codes';
import { DepartmentDao } from 'src/dao/department.dao';
import { Transactional } from 'typeorm-transactional';
import { Log } from '../common/utility/logger/log';
import { ExceptionSource } from 'src/common/exception/exception.source';
import { DepartmentReqDto } from 'src/common/dto/department.dto';
import { Property } from 'src/common/utility/property.util';

@Injectable()
export class DepartmentService {
  private readonly logger = Log.getLogger(DepartmentService.name);
  private readonly property = new Property();
  constructor(private readonly departmentDao: DepartmentDao) {}

  /**
   * This method use for a add an department.
   * @param department_dto get required input data from the request params
   * @returns new added department or in case of any exception it's returns exception.
   */
  @Transactional()
  async addDepartment(departmentDto: DepartmentReqDto) {
    try {
      this.logger.enter('addDepartment');
      if (!departmentDto?.name) {
        throw CustomException.create(
          ErrorCodes.PARAM_NOT_FOUND,
          new ExceptionSource(this.constructor.name, 'addDepartment'),
        );
      }
      // this.logger.debug(this.property.host)
      const departmentEntity = DepartmentReqDto.toEntity(departmentDto);
      await this.departmentDao.addDepartment(departmentEntity);
      this.logger.debug(
        `Department service response :: ${JSON.stringify(departmentEntity)}`,
      );
      this.logger.exit('addDepartment');
      return departmentEntity;
    } catch (e) {
      /** Logged added */
      this.logger.error(e);
      if (e instanceof CustomException) {
        /** Handle dao label error */
        throw e;
      } else {
        const apiExp = CustomException.create(
          ErrorCodes.ADD_DEPARTMENT_ERROR,
          new ExceptionSource(this.constructor.name, 'addDepartment'),
          e,
        );
        apiExp.printStackTrace(this.logger);
        throw apiExp;
      }
    }
  }

  /**
   * This method is use for update the department details.
   * @param edit_department_req require params for edit the department.
   * @returns success result or exception in case of throw any error.
   */
  @Transactional()
  async editDepartment(edit_department_req: any) {
    try {
      this.logger.enter('editDepartment');
      const department_id = edit_department_req.department_id;
      delete edit_department_req.department_id;
      const department = await this.departmentDao.editDepartment(
        department_id,
        edit_department_req,
      );
      this.logger.debug(
        `department service response ${JSON.stringify(department)}`,
      );
      this.logger.exit('editDepartment');
      return department;
    } catch (e) {
      /** Logged added */
      this.logger.error('Error to edit department data', e);
      if (e instanceof CustomException) {
        /** Handle dao label error */
        throw e;
      } else {
        /** Throw unwanted error while perform operation in service */
        //throw new CustomException(ErrorCodes.EDIT_DEPARTMENT_ERROR, e)
        const t = CustomException.create(
          ErrorCodes.EDIT_DEPARTMENT_ERROR,
          new ExceptionSource(this.constructor.name, 'editDepartment'),
          e,
        );
        t.printStackTrace(this.logger);
      }
    }
  }

  /**
   * This method is use for remove department from the system.
   * @param id department id which we need to remove.
   * @returns success result or exception in case of throw any error.
   */
  @Transactional()
  async deleteDepartment(id: any) {
    try {
      this.logger.enter('deleteDepartment service');

      const department = await this.departmentDao.deleteDepartment(id);

      this.logger.debug(
        `department service response ${JSON.stringify(department)}`,
      );
      this.logger.exit('editDepartment service');
      return department;
    } catch (e) {
      /** Logged added */
      this.logger.error('Error to remove department data', e);
      if (e instanceof CustomException) {
        /** Handle dao label error */
        throw e;
      } else {
        /** Throw unwanted error while perform operation in service */
        throw new CustomException(ErrorCodes.DELETE_DEPARTMENT_ERROR, e);
      }
    }
  }

  /**
   * This method is use for fetch all department from database.
   * @returns department list with student and teacher list.
   */
  @Transactional()
  async getAllDepartment() {
    try {
      this.logger.enter('getAllDepartment');

      const departments = await this.departmentDao.getAllDepartment();
      this.logger.debug(
        `department service response ${JSON.stringify(departments)}`,
      );
      this.logger.exit('getAllDepartment');
      return departments;
    } catch (e) {
      /** Logged added */
      this.logger.error('Error in fetch department data', e);
      if (e instanceof CustomException) {
        /** Handle dao label error */
        throw e;
      } else {
        /** Throw unwanted error while perform operation in service */
        throw new CustomException(ErrorCodes.FETCH_DB_DATA_ERROR, e);
      }
    }
  }

  /**
   * This method is use for fetch all department from database.
   * @returns requested department.
   */
   @Transactional()
   async getDepartmentById(departmentId: any) {
     try {
       this.logger.enter('getDepartmentById');
 
       const departments = await this.departmentDao.getDepartment(departmentId);
       this.logger.debug(
         `department service response ${JSON.stringify(departments)}`,
       );
       this.logger.exit('getDepartmentById');
       return departments;
     } catch (e) {
       /** Logged added */
       this.logger.error('Error in fatch department data', e);
       if (e instanceof CustomException) {
         /** Handle dao label error */
         throw e;
       } else {
         /** Throw unwanted error while perform operation in service */
         throw new CustomException(ErrorCodes.FETCH_DB_DATA_ERROR, e);
       }
     }
   }
}
