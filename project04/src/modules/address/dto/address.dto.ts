import { IsNotEmpty, MaxLength } from 'class-validator';
export class AddressDTO {
  @MaxLength(50, {
    message: 'Address is too long',
  })
  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  ward: string;

  @IsNotEmpty()
  phone: string;
}
