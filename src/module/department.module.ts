import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentDao } from 'src/dao/department.dao';

import { Department } from '../common/entity/department.entity';
import { DepartmentController } from '../controller/department.controller';
import { DepartmentService } from '../service/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentDao],
  //exports: [DepartmentService ],
})
export class DepartmentModule {}
