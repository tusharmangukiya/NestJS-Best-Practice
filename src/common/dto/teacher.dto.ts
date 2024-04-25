import { IsNotEmpty, IsString } from 'class-validator';

export class TeacherDto implements Readonly<TeacherDto> {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  department_id: string;
}
