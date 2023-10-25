import { IsNotEmpty, MaxLength } from 'class-validator';
export class BrandDTO {
  @MaxLength(50, {
    message: 'Brand is too long',
  })
  @IsNotEmpty()
  title: string;
}
