import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CapacityServices } from './capacity.service';
import { CapacityDTO } from './dto/capacity.dto';
import { IsCapacityInterface } from './interface/capacity.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/verify_role.guard';

dotenv.config();
@Controller(`${process.env.API_KEY}/capacities`)
export class CapacityController {
  constructor(private readonly capacityService: CapacityServices) {}
  @Get()
  async getAllCapacities(
    @Query('size') size: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: IsCapacityInterface[]; currentPage: number }> {
    let parsedSize = parseInt(size);
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.capacityService.getAllCapacities(parsedSize, page, limit);
  }
  // get all capacity

  @Get('/:id')
  getDetailCapacity(@Param('id') id: number): Promise<IsCapacityInterface> {
    return this.capacityService.getOneCapacity(id);
  }
  // get one capacity

  @Post()
  createCapacity(@Body() capacityDTO: CapacityDTO): Promise<GlobalInterface> {
    return this.capacityService.createCapacity(capacityDTO);
  }
  // create capacity

  @Put('/:id')
  updateCapacity(
    @Body() capacityDTO: CapacityDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.capacityService.updateCapacity(capacityDTO, id);
  }
  // update capacity

  @Delete('/:id')
  deleteCapacity(@Param('id') id: number): Promise<GlobalInterface> {
    return this.capacityService.deleteCapacity(id);
  }
  // delete capacity
}
