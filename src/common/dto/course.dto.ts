import { IsNotEmpty, IsString } from 'class-validator';

export class CourseDto implements Readonly<CourseDto> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
