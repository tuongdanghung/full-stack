// lấy data để trả về controller
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { ImageEntity } from './entities/image.entity';
import { IsProductInterface } from './interface/product.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    public productRepository: Repository<ProductEntity>,
    @InjectRepository(ImageEntity)
    public imageRepository: Repository<ImageEntity>,
  ) {}

  async getAllProducts(
    title: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsProductInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.productRepository.find({
      where: title && { title: ILike(`%${title}%`) },
      relations: ['images', 'category', 'brand'],
      skip,
      take: limit,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  async getOneProduct(id: number): Promise<any> {
    return await this.productRepository.find({
      where: { id },
      relations: ['images', 'category', 'brand'],
    });
  }

  async createProduct(data: IsProductInterface): Promise<IsProductInterface> {
    this.productRepository.create(data);
    return await this.productRepository.save(data);
  }

  async createImage(data: any) {
    this.imageRepository.create(data);
    this.imageRepository.save(data);
  }

  async updateProduct(data: IsProductInterface, id: number): Promise<any> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      return false;
    }
    return await this.productRepository.update(id, data);
  }

  async updateImage(data: any, id: number): Promise<any> {
    const image = await this.imageRepository.findOneBy({ id });
    if (!image) {
      return false;
    }
    return await this.imageRepository.update(id, { src: data });
  }

  async blockProduct(data: IsProductInterface, id: number): Promise<any> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      return false;
    }
    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id: number): Promise<boolean | any> {
    let productItem = await this.productRepository.findOneBy({ id });
    if (productItem === null) {
      return false;
    }
    await this.imageRepository.delete({ productId: id });
    return await this.productRepository.delete(id);
  }
}
