import { Injectable } from '@nestjs/common';

import { Transactional } from 'typeorm-transactional';
import { Log } from '../common/utility/logger/log';
import { CustomException } from '../common/exception/api.exception';
import { ErrorCodes } from '../common/exception/error-codes';
import { StudentDao } from 'src/dao/student.dao';

@Injectable()
export class StudentService {
  private readonly logger = Log.getLogger(StudentService.name);
  constructor(private readonly studentDao: StudentDao) {}

  /**
   * This method is use for add student in database.
   * @param student_req require data for add student
   * @returns new added student with success message.
   */
  @Transactional()
  async addStudent(student_req: any) {
    try {
      this.logger.enter('addStudent');
      student_req.courses = student_req.courses.map((id) => ({ id }));
      const student = await this.studentDao.addStudent(student_req);
      this.logger.debug(`student service response ${JSON.stringify(student)}`);
      this.logger.exit('addStudent');
      return student;
    } catch (e) {
      /** Logged added */
      this.logger.error('Error to add student data', e);
      if (e instanceof CustomException) {
        /** Handle dao label error */
        throw e;
      } else {
        /** Throw unwanted error while perform operation in service */
        throw new CustomException(ErrorCodes.ADD_STUDENT_ERROR, e);
        // throw new CustomException(ErrorCodes.ADD_DEPARTMENT_ERROR, e, source)
      }
    }
  }

  /**
   * This method is use for edit department details.
   * @param student_detail_req updated request params with student id.
   * @returns success or error base on db operation.
   */
  @Transactional()
  async addStudentDetail(student_detail_req: any) {
    try {
      this.logger.enter('addStudentDetail service');
      const student = await this.studentDao.addStudentDetail(
        student_detail_req,
      );
      this.logger.debug(
        `student detail service response ${JSON.stringify(student)}`,
      );
      this.logger.exit('addStudentDetail service');
      return student;
    } catch (e) {
      /** Logged added */
      this.logger.error('Error to add student data', e);
      if (e instanceof CustomException) {
        /** Handle dao label error */
        throw e;
      } else {
        /** Throw unwanted error while perform operation in service */
        throw new CustomException(ErrorCodes.ADD_STUDENT_DETAIL_ERROR, e);
        // throw new CustomException(ErrorCodes.ADD_DEPARTMENT_ERROR, e, source)
      }
    }
  }

  /**
   * this method is use for get list of all students.
   * @returns list of available students in database
   */
  @Transactional()
  async getAllStudent() {
    try {
      this.logger.enter('getAllStudent service');
      const students = await this.studentDao.getAllStudent();
      this.logger.debug(`student service response ${JSON.stringify(students)}`);
      this.logger.exit('getAllStudent service');
      return students;
    } catch (e) {
      /** Logged added */
      this.logger.error('Error to add student data', e);
      if (e instanceof CustomException) {
        /** Handle dao label error */
        throw e;
      } else {
        /** Throw unwanted error while perform operation in service */
        throw new CustomException(ErrorCodes.GET_STUDENT_ERROR, e);
        // throw new CustomException(ErrorCodes.ADD_DEPARTMENT_ERROR, e, source)
      }
    }
  }

  @Transactional()
  async editStudentDetail(edit_student_detail_req: any) {
    try {
      this.logger.enter('editStudentDetail service');
      const student_id = edit_student_detail_req.student_id;
      delete edit_student_detail_req.student_id;

      const studentDetail = await this.studentDao.editStudentDetail(
        student_id,
        edit_student_detail_req,
      );

      this.logger.debug(
        `studentDetail service response ${JSON.stringify(studentDetail)}`,
      );
      this.logger.exit('editStudentDetail service');
      return studentDetail;
    } catch (error) {
      this.logger.error(`editStudentDetail service :: ${error}`);
      throw error;
    }
  }

  @Transactional()
  async editStudent(edit_student_req: any) {
    try {
      this.logger.enter('editStudentDetail service');
      const student_id = edit_student_req.student_id;
      delete edit_student_req.student_id;

      const student = await this.studentDao.editStudent(
        student_id,
        edit_student_req,
      );

      this.logger.debug(`student service response ${JSON.stringify(student)}`);
      this.logger.exit('editStudentDetail service');
      return student;
    } catch (error) {
      this.logger.error(`editStudentDetail service :: ${error}`);
      throw error;
    }
  }
}
