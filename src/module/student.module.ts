import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/common/entity/course.entity';
import { Student } from 'src/common/entity/student.entity';
import { StudentDetails } from 'src/common/entity/studentDetail.entity';
import { StudentController } from 'src/controller/student.controller';
import { StudentDao } from 'src/dao/student.dao';
import { StudentService } from 'src/service/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentDetails, Course])],
  controllers: [StudentController],
  providers: [StudentService, StudentDao],
  exports: [StudentService],
})
export class StudentModule {}
