import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/common/entity/teacher.entity';
import { TeacherDetails } from 'src/common/entity/teacherDetail.entity';
import { TeacherController } from 'src/controller/teacher.controller';
import { TeacherService } from 'src/service/teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, TeacherDetails])],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
