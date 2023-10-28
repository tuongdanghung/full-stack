import { IsNotEmpty, MaxLength, IsEmail, IsNumber } from 'class-validator';
export class AuthDTOController {
  @MaxLength(50, {
    message: 'User is too long',
  })
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthDTOServices {
  @MaxLength(50, {
    message: 'User is too long',
  })
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  status: string;

  @IsNumber()
  role: number;

  @IsNumber()
  card_id: string;
}
