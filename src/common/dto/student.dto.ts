import {
  Contains,
  IsArray,
  IsEmail,
  IsFQDN,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UUIDVersion } from 'uuid';
import { Course } from '../entity/course.entity';
import { Student } from '../entity/student.entity';

export class StudentDto implements Readonly<StudentDto> {
  @IsNotEmpty()
  @IsString()
  @IsEmail(undefined, { message: 'Email should be a email' })
  @MaxLength(25, { message: `Email length should be less than 45 character.` })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 16, {
    message: 'Password length must between 8 to 20 character. ',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID(UUIDVersion, { each: true, message: 'Not a valid uuid.' })
  department_id: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID(UUIDVersion, { each: true })
  courses: Course[];

  @MaxLength(16, { message: `Title length should be less than 45 character.` })
  @MinLength(8, { message: 'Title length should be greater than 2 character.' })
  title: string;

  @Contains('Hello', { message: 'Text should be contain "Hello" text.' })
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsFQDN()
  site: string;

  public static toEntity(dto: Partial<StudentDto>) {
    const it = new Student();
    it.email = dto.email;
    it.password = dto.password;
    it.department_id = dto.department_id;
    it.courses = dto.courses;
    return it;
  }
}
