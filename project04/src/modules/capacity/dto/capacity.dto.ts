import { IsNotEmpty } from 'class-validator';
export class CapacityDTO {
  @IsNotEmpty()
  size: number;

  @IsNotEmpty()
  percent: number;
}
