import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { Log } from '../common/utility/logger/log';
import { ErrorCodes } from '../common/exception/error-codes';
import { CommonUtils } from '../common/utility/common.utils';
import { Course } from 'src/common/entity/course.entity';

@Injectable()
export class CourseDao {
  private readonly logger = Log.getLogger(CourseDao.name);
  constructor(
    @InjectRepository(Course)
    private CourseRepository: Repository<Course>,
  ) {}

  /**
   * database operations for the add course
   * @param course_req
   * @returns return course details after add course in database.
   */
  async addCourse(course_req: any) {
    try {
      this.logger.enter('addCourse');
      const course = await this.CourseRepository.save(course_req);
      this.logger.exit('addCourse');
      return course;
    } catch (e) {
      this.logger.error(`addCourse in dao `, e);
      // const source =new SourceException(this.logger.getClassName(), this.logger.getMethodName())
      CommonUtils.throwException(
        ErrorCodes.ADD_DEPARTMENT_ERROR,
        e,
        this.logger,
      );
    }
  }

  /**
   * database operations for the edit course
   * @param course_req
   * @returns return course details after edit course in database.
   */
  async editCourse(course_id: string, edit_course_req: any) {
    try {
      this.logger.enter('editCourse');
      const course = await this.CourseRepository.update(
        {
          id: course_id,
        },
        edit_course_req,
      );
      this.logger.exit('editCourse');
      return course;
    } catch (e) {
      this.logger.error(`editCourse in dao `, e);
      // const source =new SourceException(this.logger.getClassName(), this.logger.getMethodName())
      CommonUtils.throwException(
        ErrorCodes.ADD_DEPARTMENT_ERROR,
        e,
        this.logger,
      );
    }
  }

  /**
   * database operations for the delete course
   * @param course_req
   * @returns return course details after delete course in database.
   */
  async deleteCourse(id: string) {
    try {
      this.logger.enter('deleteCourse');
      const course = await this.CourseRepository.delete({
        id: id,
      });
      this.logger.exit('deleteCourse');
      return course;
    } catch (e) {
      this.logger.error(`deleteCourse in dao `, e);
      // const source =new SourceException(this.logger.getClassName(), this.logger.getMethodName())
      CommonUtils.throwException(
        ErrorCodes.ADD_DEPARTMENT_ERROR,
        e,
        this.logger,
      );
    }
  }

  /**
   * database operations for the delete course
   * @param course_req
   * @returns return course details after delete course in database.
   */
  async getAllCourse() {
    try {
      this.logger.enter('getAllCourse');
      const courses = await this.CourseRepository.find();
      this.logger.exit('getAllCourse');
      return courses;
    } catch (e) {
      this.logger.error(`getAllCourse in dao `, e);
      // const source =new SourceException(this.logger.getClassName(), this.logger.getMethodName())
      CommonUtils.throwException(
        ErrorCodes.ADD_DEPARTMENT_ERROR,
        e,
        this.logger,
      );
    }
  }
}
