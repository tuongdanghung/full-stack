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
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ProductServices } from './product.service';
import { ProductDTO, ProductCapacityDTO } from './dto/product.dto';
import { IsProductInterface } from './interface/product.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/shared/utils/upload/cloudinary.service';

// trong global class có bao nhiêu tham số thì ở đây truyền bấy nhiêu tham số
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
  async createProductCapacity(@Body() productCapacityDTO: ProductCapacityDTO) {
    return this.productService.createNewProductCapacity(productCapacityDTO);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() formData: any,
  ): Promise<any> {
    const dataProduct = {
      title: formData.title,
      description: formData.description,
      price: +formData.price,
      stock: +formData.stock,
      brandId: +formData.brandId,
      categoryId: +formData.categoryId,
    };
    const capacity = JSON.parse(formData.capacity);
    const dataImage = await this.cloudinaryService.uploadMultipleFiles(files);
    const newDataImage = dataImage?.map((file: any) => {
      return file.url;
    });
    return await this.productService.createProduct(
      dataProduct,
      newDataImage,
      capacity,
    );
  }

  @Put('/:id')
  updateProduct(
    @Body() product: IsProductInterface,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.productService.updateProduct(product, id);
  }

  @Put('block/:id')
  blockProduct(
    @Body() product: IsProductInterface,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.productService.blockProduct(product, id);
  }
  // update role

  @Put('/image/:id')
  @UseInterceptors(FileInterceptor('src'))
  async updateImge(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.cloudinaryService.uploadSingleFile(file);

    return this.productService.updateImage(id, data?.url);
  }

  @Delete('/productCapacity')
  async deleteProductCapacity(@Body() productCapacityDTO: ProductCapacityDTO) {
    this.productService.deleteProductCapacity(productCapacityDTO);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number): Promise<GlobalInterface> {
    return this.productService.deleteProduct(id);
  }
}
// nhận các request từ client gửi về server
// và nhận response từ server trả về client
