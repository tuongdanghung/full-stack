import { IsNotEmpty, MaxLength } from 'class-validator';
export class ColorDTO {
  @MaxLength(50, {
    message: 'Color is too long',
  })
  @IsNotEmpty()
  color: string;
}
