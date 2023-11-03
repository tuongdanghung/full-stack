import { IsNotEmpty, IsNumber } from 'class-validator';
export class FavoriteDTO {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  colorId: number;

  @IsNotEmpty()
  @IsNumber()
  capacityId: number;
}
