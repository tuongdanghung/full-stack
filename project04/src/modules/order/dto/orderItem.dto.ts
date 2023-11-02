import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDTO {
  @IsNotEmpty()
  @IsString()
  status: string;
}
