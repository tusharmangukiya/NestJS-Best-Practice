import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDao } from 'src/dao/course.dao';

import { Course } from '../common/entity/course.entity';
import { CourseController } from '../controller/course.controller';
import { CourseService } from '../service/course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService, CourseDao],
  exports: [CourseService],
})
export class CourseModule {}
