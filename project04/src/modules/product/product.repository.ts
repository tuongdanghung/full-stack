// lấy data để trả về controller
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProductCapacityDTO,
  ProductDTO,
  ProductColorDTO,
} from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { ImageEntity } from './entities/image.entity';
import { IsProductInterface } from './interface/product.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
import { ProductCapacityEntity } from './entities/productCapacity.entity';
import { ProductColorEntity } from './entities/productColor.entity';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    public productRepository: Repository<ProductEntity>,
    @InjectRepository(ImageEntity)
    public imageRepository: Repository<ImageEntity>,
    @InjectRepository(ProductCapacityEntity)
    public productCapacityEntity: Repository<ProductCapacityEntity>,
    @InjectRepository(ProductColorEntity)
    public productColorEntity: Repository<ProductColorEntity>,
  ) {}

  async getAllProducts(
    title: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsProductInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.productRepository.find({
      where: title && { title: ILike(`%${title}%`) },
      relations: ['images', 'category', 'brand', 'capacities', 'colors'],
      skip,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  async getOneProduct(id: number): Promise<any> {
    return await this.productRepository.findOne({
      where: { id },
      relations: [
        'images',
        'category',
        'brand',
        'capacities',
        'colors',
        'orderItems',
      ],
    });
  }

  async createProduct(data: IsProductInterface): Promise<IsProductInterface> {
    this.productRepository.create(data);
    return await this.productRepository.save(data);
  }

  async createImage(data: any) {
    await this.imageRepository.create(data);
    await this.imageRepository.save(data);
  }

  async createProductCapacity(data: any) {
    await this.productCapacityEntity.create(data);
    await this.productCapacityEntity.save(data);
  }

  async createProductColor(data: any) {
    await this.productColorEntity.create(data);
    await this.productColorEntity.save(data);
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
    await this.productCapacityEntity.delete({ productsId: id });
    await this.productColorEntity.delete({ productsId: id });
    return await this.productRepository.delete(id);
  }

  async deleteProductCapacity(
    productCapacityDTO: ProductCapacityDTO,
  ): Promise<boolean | any> {
    const options = {
      productsId: productCapacityDTO.productsId,
      capacitiesId: productCapacityDTO.capacitiesId,
    };
    await this.productCapacityEntity.delete(options);
  }

  async deleteProductColor(
    productColorDTO: ProductColorDTO,
  ): Promise<boolean | any> {
    const options = {
      productsId: productColorDTO.productsId,
      colorsId: productColorDTO.colorsId,
    };
    await this.productColorEntity.delete(options);
  }

  async deleteImage(id: number): Promise<any> {
    await this.imageRepository.delete(id);
  }
}
