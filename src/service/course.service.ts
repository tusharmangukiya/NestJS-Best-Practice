import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { Log } from '../common/utility/logger/log';
import { CourseDao } from 'src/dao/course.dao';

@Injectable()
export class CourseService {
  private readonly logger = Log.getLogger(CourseService.name);
  constructor(private readonly courseDao: CourseDao) {}

  @Transactional()
  async addCourse(course_req: any) {
    try {
      this.logger.enter('addCourse service');
      const course = await this.courseDao.addCourse(course_req);
      this.logger.debug(`course service response ${JSON.stringify(course)}`);
      this.logger.exit('addCourse service');
      return course;
    } catch (error) {
      this.logger.error(`addCourse service :: ${error}`);
      throw error;
    }
  }

  @Transactional()
  async editCourse(edit_course_req: any) {
    try {
      this.logger.enter('editCourse service');
      const course_id = edit_course_req.course_id;
      delete edit_course_req.course_id;

      const course = await this.courseDao.editCourse(
        course_id,
        edit_course_req,
      );

      this.logger.debug(`course service response ${JSON.stringify(course)}`);
      this.logger.exit('editCourse service');
      return course;
    } catch (error) {
      this.logger.error(`editCourse service :: ${error}`);
      throw error;
    }
  }

  @Transactional()
  async deleteCourse(id: any) {
    try {
      this.logger.enter('deleteCourse service');

      const course = await this.courseDao.deleteCourse(id);

      this.logger.debug(`course service response ${JSON.stringify(course)}`);
      this.logger.exit('editCourse service');
      return course;
    } catch (error) {
      this.logger.error(`editCourse service :: ${error}`);
      throw error;
    }
  }

  @Transactional()
  async getAllCourse() {
    try {
      this.logger.enter('getAllCourse service');
      const courses = await this.courseDao.getAllCourse();
      this.logger.debug(`course service response ${JSON.stringify(courses)}`);
      this.logger.exit('getAllCourse service');
      return courses;
    } catch (error) {
      this.logger.error(`getAllCourse service :: ${error}`);
      throw error;
    }
  }
}
