import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'student_detail' })
export class StudentDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'uuid' })
  student_id: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student_detail: Student;
}
