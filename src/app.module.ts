import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'resources/configuration.module';
import { DbConfig } from 'resources/db.config';
import { CommonModule } from './module/common.module';
import { CourseModule } from './module/course.module';
import { DepartmentModule } from './module/department.module';
import { StudentModule } from './module/student.module';
import { TeacherModule } from './module/teacher.module';

@Module({
  imports: [
    ConfigurationModule,
    DbConfig,
    DepartmentModule,
    StudentModule,
    TeacherModule,
    CourseModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
