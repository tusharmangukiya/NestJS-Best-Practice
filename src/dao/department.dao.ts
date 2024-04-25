import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RedisKeyNotFound, RedisInvalidDatabase} from "redis-best-practice/dist/src/common/custom_exception"

import { Department } from '../common/entity/department.entity';
import { Log } from '../common/utility/logger/log';
import { CustomException } from 'src/common/exception/api.exception';
import { ErrorCodes } from 'src/common/exception/error-codes';
import { ExceptionSource } from 'src/common/exception/exception.source';
import { DepartmentReqDto } from 'src/common/dto/department.dto';
import DepartmentCache from 'src/common/redis/department_cache';
import { Connection } from "typeorm"; 

@Injectable()
export class DepartmentDao {
  private readonly logger = Log.getLogger(DepartmentDao.name);
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private connection: Connection
    
  ) {}

  /**
   * database operations for the add departments
   * @param department_req
   * @returns return department details after add department in database.
   */
  async addDepartment(department_req: any): Promise<Department> {
    try {
      this.logger.enter('addDepartment');
      const department = await this.departmentRepository.save(
        DepartmentReqDto.toEntity(department_req),
      );
      this.logger.exit('addDepartment');
      // this.result = await this.confif_cache.get(Connection)
      // console.log("===========result======= :: ", this.result);
      
      return department;
    } catch (e) {
      this.logger.error(`addDepartment in dao `, e);
      throw CustomException.create(
        ErrorCodes.ADD_DEPARTMENT_ERROR,
        new ExceptionSource(this.constructor.name, 'addDepartment'),
        e,
      );
    }
  }

  /**
   * database operations for the edit departments
   * @param department_req
   * @returns return department details after edit department in database.
   */
  async editDepartment(department_id: string, edit_department_req: any) {
    try {
      this.logger.enter('editDepartment');
      const department = await this.departmentRepository.update(
        {
          id: department_id,
        },
        edit_department_req,
      );
      this.logger.exit('editDepartment');
      return department;
    } catch (error) {
      this.logger.error(`editDepartment in dao :: ${error}`);
      throw error;
    }
  }

  /**
   * database operations for the edit departments
   * @param department_req
   * @returns return department details after edit department in database.
   */
  async deleteDepartment(id: string) {
    try {
      this.logger.enter('deleteDepartment');
      const department = await this.departmentRepository.delete({
        id: id,
      });
      this.logger.exit('deleteDepartment');
      return department;
    } catch (error) {
      this.logger.error(`deleteDepartment in dao :: ${error}`);
      throw error;
    }
  }

  /**
   * database operations for the fetch departments
   * @param department_req
   * @returns return all department list.
   */
  async getAllDepartment() {
    try {
      this.logger.enter('getAllDepartment');
      const department = await this.departmentRepository.find({
        relations: ['student'],
        where: {},
      });
      this.logger.exit('getAllDepartment');
      return department;
    } catch (error) {
      this.logger.error(`getAllDepartment in dao :: ${error}`);
      throw error;
    }
  }

  /**
   * database operations for the fatch departments
   * @param department_req
   * @returns return all department list.
   */
   async getDepartment(departmentId: any) {
    try {
      this.logger.enter('getAllDepartment in dao');
      // create object of cache class
      const department_obj = new DepartmentCache(departmentId)

      // call get method with database connection object
      const department = await department_obj.get(this.connection)
      
      if (!department) {
        console.log("=====RedisInvalidDatabase=== :: ", new RedisInvalidDatabase);
        return new RedisInvalidDatabase()
      }
      console.log("=====department==== :: \n", department);

      // const department = await this.departmentRepository.find({
      //   relations: ['student'],
      //   where: {id: departmentId},
      // });
      this.logger.exit('getAllDepartment in dao');
      return department;
    } catch (error) {
      this.logger.error(`getAllDepartment in dao :: ${error}`);
      throw error;
    }
  }
}
