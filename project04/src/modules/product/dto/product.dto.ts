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

export class ProductCapacityDTO {
  @IsNotEmpty()
  @IsNumber()
  productsId: number;

  @IsNotEmpty()
  @IsNumber()
  capacitiesId: number;
}

export class ProductColorDTO {
  @IsNotEmpty()
  @IsNumber()
  productsId: number;

  @IsNotEmpty()
  @IsNumber()
  colorsId: number;
}
export class ProductImageDTO {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  src: string;
}
