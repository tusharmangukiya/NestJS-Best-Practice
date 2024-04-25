import { IsNotEmpty, IsString } from 'class-validator';

export class TeacherDetailDto implements Readonly<TeacherDetailDto> {
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
  teacher_id: string;
}
