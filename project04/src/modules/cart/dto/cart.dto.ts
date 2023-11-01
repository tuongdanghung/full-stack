import { IsNotEmpty, IsNumber } from 'class-validator';
export class CartDTO {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  colorId: number;

  @IsNotEmpty()
  @IsNumber()
  capacityId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
