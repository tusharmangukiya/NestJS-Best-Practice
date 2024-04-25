import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Course } from 'src/common/entity/course.entity';
import { Department } from 'src/common/entity/department.entity';
import { Student } from 'src/common/entity/student.entity';
import { StudentDetails } from 'src/common/entity/studentDetail.entity';
import { Teacher } from 'src/common/entity/teacher.entity';
import { TeacherDetails } from 'src/common/entity/teacherDetail.entity';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { AppConfig } from './app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return DbConfig.getDbConf();
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [ConfigService],
    }),
  ],
})

/**
 * This class helps to perform all DB related operation like db configuration and
 * other require stuff
 *
 * <p>
 * We defined DB related function and variable use it for the project configuration *
 * @author      GWL
 * @since       1.0
 */
export class DbConfig {
  /**
   * Get DB configuration value from AppConfig we are fetching data on behalf of
   * key based on property path
   *
   * @returns TypeOrmModuleOptions which helps to set database connectivity
   */
  public static getDbConf(): TypeOrmModuleOptions {
    return {
      type: AppConfig.get('DB.TYPE'),
      host: AppConfig.get('DB.HOST'),
      port: AppConfig.get('DB.PORT'),
      username: AppConfig.get('DB_USERNAME'),
      password: AppConfig.get('DB_PASSWORD'),
      database: AppConfig.get('DB.NAME'),
      synchronize: AppConfig.get('DB.SYNCHRONIZE') === 'true',
      entities: [
        Department,
        Student,
        Teacher,
        StudentDetails,
        TeacherDetails,
        Course,
      ],
    };
  }
}
