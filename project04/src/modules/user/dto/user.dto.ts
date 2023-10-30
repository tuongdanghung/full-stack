import { IsNotEmpty, MaxLength, IsEmail, IsNumber } from 'class-validator';
export class UserDTO {
  @MaxLength(50, {
    message: 'User is too long',
  })
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  avatar: string;

  @IsNotEmpty()
  card_id: string;

  @IsNumber()
  RoleId: number;
}

export class RegisterDTOServices {
  @MaxLength(50, {
    message: 'User is too long',
  })
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  card_id: string;
}
