import { IsNotEmpty, MaxLength } from 'class-validator';
export class RoleDTO {
  @MaxLength(50, {
    message: 'Role is too long',
  })
  @IsNotEmpty()
  code: string;
}
