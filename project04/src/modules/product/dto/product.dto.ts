import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
export class ProductDTO {
  @MaxLength(50, {
    message: 'Color is too long',
  })
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  brandId: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  stock: string;
}
