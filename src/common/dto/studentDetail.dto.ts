import { IsNotEmpty, IsString } from 'class-validator';
import { StudentDetails } from '../entity/studentDetail.entity';

export class StudentDetailDto implements Readonly<StudentDetailDto> {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  student_id: string;

  public static toEntity(dto: Partial<StudentDetailDto>) {
    const it = new StudentDetails();
    it.username = dto.username;
    it.first_name = dto.first_name;
    it.last_name = dto.last_name;
    it.gender = dto.gender;
    it.student_id = dto.student_id;
    return it;
  }
}
