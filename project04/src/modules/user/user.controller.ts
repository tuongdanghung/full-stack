import {
  Controller,
  Get,
  Body,
  Put,
  UseInterceptors,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
  Req,
  UploadedFile,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserServices } from './user.service';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/verify_role.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../shared/utils/upload/cloudinary.service';

dotenv.config();

@Controller(`${process.env.API_KEY}/users`)
export class UserController {
  constructor(
    private readonly userController: UserServices,
    private sharedDataService: SharedDataService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async getAllUsers(
    @Query('email') email: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.userController.getAllUsers(email, page, limit);
  }

  @Get('/me')
  @UseGuards(CheckAuthenGuard)
  getDetailUser() {
    const currentToken = this.sharedDataService.getCurrentToken();
    return this.userController.getOneUser(currentToken.dataGenerateToken.id);
  }

  @Put('/update')
  @UseGuards(CheckAuthenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() formData: any,
  ): Promise<GlobalInterface> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = await this.cloudinaryService.uploadSingleFile(file);
    return this.userController.updateUser(
      {
        ...(data?.url && { avatar: data.url }),
        ...formData,
      },
      currentToken.dataGenerateToken.id,
    );
  }

  @Put('/updateByAdmin')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async updateUserByAdmin(@Body() data: any): Promise<GlobalInterface> {
    const currentToken = this.sharedDataService.getCurrentToken();
    return this.userController.updateUserByAdmin(
      data,
      currentToken.dataGenerateToken.id,
    );
  }
}
