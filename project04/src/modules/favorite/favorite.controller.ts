import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { FavoriteServices } from './favorite.service';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { FavoriteDTO } from './dto/favorite.dto';

dotenv.config();
@Controller(`${process.env.API_KEY}/favorites`)
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteServices,
    public sharedDataService: SharedDataService,
  ) {}
  @Get()
  @UseGuards(CheckAuthenGuard)
  async getAllFavorites() {
    const currentToken = this.sharedDataService.getCurrentToken();
    return this.favoriteService.getAllFavorite(
      currentToken.dataGenerateToken.id,
    );
  }
  // get all favorite
  @Post()
  @UseGuards(CheckAuthenGuard)
  createFavorite(@Body() favoriteDTO: any) {
    const currentToken = this.sharedDataService.getCurrentToken();
    const favorite = {
      ...favoriteDTO,
      userId: currentToken.dataGenerateToken.id,
    };
    console.log(favorite);

    return this.favoriteService.createFavorite(favorite);
  }
  // create favorite

  @Delete('/:id')
  @UseGuards(CheckAuthenGuard)
  deleteFavorite(@Param('id') id: number): Promise<GlobalInterface> {
    return this.favoriteService.deleteFavorite(id);
  }
  // delete favorite
}
