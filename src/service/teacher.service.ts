import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional';
import { Log } from '../common/utility/logger/log';
import { Teacher } from '../common/entity/teacher.entity';
import { TeacherDetails } from '../common/entity/teacherDetail.entity';

@Injectable()
export class TeacherService {
  private readonly logger = Log.getLogger(TeacherService.name);
  constructor(
    @InjectRepository(Teacher)
    private TeacherRepository: Repository<Teacher>,
    @InjectRepository(TeacherDetails)
    private TeacherDetailRepository: Repository<TeacherDetails>,
  ) {}

  @Transactional()
  async addTeacher(teacher_req: any) {
    try {
      this.logger.enter('addTeacher service');
      teacher_req.courses = teacher_req.courses.map((id) => ({ id }));
      const teacher = await this.TeacherRepository.save(teacher_req);
      this.logger.debug(`teacher service response ${JSON.stringify(teacher)}`);
      this.logger.exit('addTeacher service');
      return teacher;
    } catch (error) {
      this.logger.error(`addTeacher service :: ${error}`);
      throw error;
    }
  }

  @Transactional()
  async addTeacherDetail(teacher_detail_req: any) {
    try {
      this.logger.enter('addTeacherDetail service');
      const teacher = await this.TeacherDetailRepository.save(
        teacher_detail_req,
      );
      this.logger.debug(
        `teacher detail service response ${JSON.stringify(teacher)}`,
      );
      this.logger.exit('addTeacherDetail service');
      return teacher;
    } catch (error) {
      this.logger.error(`addTeacherDetail service :: ${error}`);
      throw error;
    }
  }

  @Transactional()
  async getAllTeacher() {
    try {
      this.logger.enter('getAllTeacher service');
      const teachers = await this.TeacherRepository.find({
        relations: ['department', 'teacher_detail'],
        where: {},
      });
      this.logger.debug(`teacher service response ${JSON.stringify(teachers)}`);
      this.logger.exit('getAllTeacher service');
      return teachers;
    } catch (error) {
      this.logger.error(`addTeacher service :: ${error}`);
      throw error;
    }
  }
}
