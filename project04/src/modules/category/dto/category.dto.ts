import { IsNotEmpty, MaxLength } from 'class-validator';
export class CategoryDTO {
  @MaxLength(50, {
    message: 'Category is too long',
  })
  @IsNotEmpty()
  title: string;
}
