import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UploadedFiles,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ProductServices } from './product.service';
import { ProductCapacityDTO, ProductColorDTO } from './dto/product.dto';
import { IsProductInterface } from './interface/product.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/shared/utils/upload/cloudinary.service';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/verify_role.guard';

dotenv.config();
@Controller(`${process.env.API_KEY}/products`)
export class ProductController {
  constructor(
    private readonly productService: ProductServices,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async getAllProducts(
    @Query('title') title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: IsProductInterface[]; currentPage: number }> {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.productService.getAllProducts(title, page, limit);
  }

  @Get('/:id')
  getDetailRole(@Param('id') id: number): Promise<IsProductInterface> {
    return this.productService.getOneProduct(id);
  }

  @Post('/productCapacity')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async createProductCapacity(@Body() productCapacityDTO: ProductCapacityDTO) {
    return this.productService.createNewProductCapacity(productCapacityDTO);
  }

  @Post('/productColor')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async createNewProductColor(@Body() productColorDTO: ProductColorDTO) {
    return this.productService.createNewProductColor(productColorDTO);
  }

  @Post('/image')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  @UseInterceptors(FileInterceptor('src'))
  async createNewImageProduct(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = await this.cloudinaryService.uploadSingleFile(file);

    const data = {
      src: image.url,
      productId: +body.productId,
    };
    return this.productService.createNewImageProduct(data);
  }

  @Post()
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  @UseInterceptors(FilesInterceptor('image'))
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() formData: any,
  ): Promise<any> {
    const dataProduct = {
      title: formData.title,
      description: formData.description,
      price: +formData.price,
      stock: +formData.quantity,
      brandId: +formData.brand,
      categoryId: +formData.category,
    };

    const capacity = JSON.parse(formData.capacity);
    const color = JSON.parse(formData.color);
    const dataImage = await this.cloudinaryService.uploadMultipleFiles(files);
    const newDataImage = dataImage?.map((file: any) => {
      return file.url;
    });
    return await this.productService.createProduct(
      dataProduct,
      newDataImage,
      capacity,
      color,
    );
  }

  @Put('/:id')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  updateProduct(
    @Body() product: IsProductInterface,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.productService.updateProduct(product, id);
  }

  @Put('block/:id')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  blockProduct(
    @Body() product: IsProductInterface,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.productService.blockProduct(product, id);
  }

  @Put('/image/:id')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  @UseInterceptors(FileInterceptor('src'))
  async updateImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.cloudinaryService.uploadSingleFile(file);

    return this.productService.updateImage(id, data?.url);
  }

  @Delete('/productCapacity')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async deleteProductCapacity(@Body() productCapacityDTO: ProductCapacityDTO) {
    this.productService.deleteProductCapacity(productCapacityDTO);
  }

  @Delete('/productColor')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async deleteProductColor(@Body() productColorDTO: ProductColorDTO) {
    this.productService.deleteProductColor(productColorDTO);
  }
  @Delete('/image/:id')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async deleteImage(@Param('id') id: number) {
    this.productService.deleteImage(id);
  }

  @Delete('/:id')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async deleteProduct(@Param('id') id: number): Promise<GlobalInterface> {
    return this.productService.deleteProduct(id);
  }
}
