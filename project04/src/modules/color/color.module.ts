import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorController } from './color.controller';
import { ColorServices } from './color.service';
import { ColorRepository } from './color.repository';
import { ColorEntity } from './entities/color.entity';
@Module({
  controllers: [ColorController],
  imports: [TypeOrmModule.forFeature([ColorEntity, ColorRepository])],
  providers: [ColorServices, ColorRepository],
})
export class ColorModule {}
