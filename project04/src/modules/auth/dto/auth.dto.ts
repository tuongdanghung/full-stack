import { IsNotEmpty, MaxLength, IsEmail, IsNumber } from 'class-validator';
export class RegisterDTOController {
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

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class VerifyDTOServices {}
