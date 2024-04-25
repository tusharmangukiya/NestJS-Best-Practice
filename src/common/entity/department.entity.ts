import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';
@Entity({ name: 'department' })
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Student, (student) => student.department)
  student: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.department)
  teacher: Teacher[];
}
