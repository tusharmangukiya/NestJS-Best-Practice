import { IsNotEmpty, IsString } from 'class-validator';
import { Department } from '../entity/department.entity';

export class DepartmentReqDto implements Readonly<DepartmentReqDto> {
  @IsNotEmpty()
  @IsString()
  name: string;

  public static toEntity(dto: Partial<DepartmentReqDto>) {
    const it = new Department();
    it.name = dto.name;
    return it;
  }
}
