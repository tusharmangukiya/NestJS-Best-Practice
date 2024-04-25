import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { Student } from '../common/entity/student.entity';
import { Log } from '../common/utility/logger/log';
import { CustomException } from 'src/common/exception/api.exception';
import { ErrorCodes } from 'src/common/exception/error-codes';
import { ExceptionSource } from 'src/common/exception/exception.source';
import { StudentDto } from 'src/common/dto/student.dto';
import { StudentDetails } from 'src/common/entity/studentDetail.entity';
import { StudentDetailDto } from 'src/common/dto/studentDetail.dto';

@Injectable()
export class StudentDao {
  private readonly logger = Log.getLogger(StudentDao.name);
  constructor(
    @InjectRepository(Student)
    private StudentRepository: Repository<Student>,
    @InjectRepository(StudentDetails)
    private StudentDetailRepository: Repository<StudentDetails>,
  ) {}

  /**
   * database operations for the add students
   * @param student_req
   * @returns return student details after add student in database.
   */
  async addStudent(student_req: any): Promise<Student> {
    try {
      this.logger.enter('addStudent');
      const student = await this.StudentRepository.save(
        StudentDto.toEntity(student_req),
      );
      this.logger.exit('addStudent');
      return student;
    } catch (e) {
      this.logger.error(`addStudent in dao `, e);
      throw CustomException.create(
        ErrorCodes.ADD_STUDENT_ERROR,
        new ExceptionSource(this.constructor.name, 'addStudent'),
        e,
      );
    }
  }

  /**
   * database operations for the add student details.
   * @param student_req
   * @returns return student details after add student details in database.
   */
  async addStudentDetail(student_detail_req: any): Promise<StudentDetails> {
    try {
      this.logger.enter('addStudentDetail');
      const student = await this.StudentRepository.save(
        StudentDetailDto.toEntity(student_detail_req),
      );
      this.logger.exit('addStudentDetail');
      return student;
    } catch (e) {
      this.logger.error(`addStudentDetail in dao `, e);
      throw CustomException.create(
        ErrorCodes.ADD_STUDENT_ERROR,
        new ExceptionSource(this.constructor.name, 'addStudentDetail'),
        e,
      );
    }
  }

  /**
   * database operations for the get all students
   * @param student_req
   * @returns return student details after get student in database.
   */
  async getAllStudent() {
    try {
      this.logger.enter('getAllStudent');
      const students = await this.StudentRepository.find({
        relations: ['department', 'student_detail', 'courses'],
        where: {},
      });
      this.logger.exit('getAllStudent');
      return students;
    } catch (e) {
      this.logger.error(`getAllStudent in dao `, e);
      throw CustomException.create(
        ErrorCodes.ADD_STUDENT_ERROR,
        new ExceptionSource(this.constructor.name, 'getAllStudent'),
        e,
      );
    }
  }

  /**
   * database operations for the update students
   * @param student_req
   * @returns return student details after update student in database.
   */
  async editStudentDetail(student_id: string, edit_student_detail_req: any) {
    try {
      this.logger.enter('editStudentDetail');
      const studentDetail = await this.StudentDetailRepository.update(
        {
          student_id: student_id,
        },
        edit_student_detail_req,
      );
      this.logger.exit('editStudentDetail');
      return studentDetail;
    } catch (e) {
      this.logger.error(`editStudentDetail in dao `, e);
      throw CustomException.create(
        ErrorCodes.ADD_STUDENT_ERROR,
        new ExceptionSource(this.constructor.name, 'editStudentDetail'),
        e,
      );
    }
  }

  /**
   * database operations for the update students
   * @param student_req
   * @returns return student details after update student in database.
   */
  async editStudent(student_id: string, edit_student_req: any) {
    try {
      this.logger.enter('editStudent');
      const student = await this.StudentRepository.update(
        {
          id: student_id,
        },
        edit_student_req,
      );
      this.logger.exit('editStudent');
      return student;
    } catch (e) {
      this.logger.error(`editStudent in dao `, e);
      throw CustomException.create(
        ErrorCodes.ADD_STUDENT_ERROR,
        new ExceptionSource(this.constructor.name, 'editStudent'),
        e,
      );
    }
  }
}
