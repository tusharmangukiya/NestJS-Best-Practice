import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity({ name: 'teacher_detail' })
export class TeacherDetails extends BaseEntity {
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
  teacher_id: string;

  @OneToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher_detail: Teacher;
}
