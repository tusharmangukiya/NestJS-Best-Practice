import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Department } from './department.entity';
import { TeacherDetails } from './teacherDetail.entity';

@Entity({ name: 'teacher' })
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'uuid' })
  department_id: string;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department: Department;

  @OneToOne(() => TeacherDetails, (detail) => detail.teacher_detail)
  teacher_detail: TeacherDetails;

  @ManyToMany(() => Course, (Course) => Course.id, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'teacher_courses' })
  courses: Course[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
