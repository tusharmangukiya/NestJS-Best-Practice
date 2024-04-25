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
import { StudentDetails } from './studentDetail.entity';

@Entity({ name: 'student' })
export class Student extends BaseEntity {
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

  @OneToOne(
    () => StudentDetails,
    (student_detail) => student_detail.student_detail,
  )
  student_detail: StudentDetails;

  @ManyToMany(() => Course, (Course) => Course.id, {
    cascade: true,
    eager: false,
  })
  @JoinTable({ name: 'student_courses' })
  courses: Course[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
