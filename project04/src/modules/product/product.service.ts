// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {
  ProductCapacityDTO,
  ProductColorDTO,
  ProductDTO,
} from './dto/product.dto';
import { IsProductInterface } from './interface/product.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class ProductServices {
  constructor(private productRepo: ProductRepository) {}
  getAllProducts(
    title: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsProductInterface[]; currentPage: number }> {
    return this.productRepo.getAllProducts(title, page, limit);
  }

  getOneProduct(id: number): Promise<IsProductInterface> {
    return this.productRepo.getOneProduct(id);
  }

  async createProduct(
    dataProduct: IsProductInterface,
    newDataImage: any,
    capacity: number[],
    color: number[],
  ): Promise<GlobalInterface> {
    const responseProduct = await this.productRepo.createProduct(dataProduct);

    if (responseProduct) {
      const imageArray = newDataImage?.map((image: string) => ({
        src: image,
        productId: responseProduct?.id,
      }));

      const productCapacityArray = capacity?.map((item: number) => ({
        capacitiesId: item,
        productsId: responseProduct?.id,
      }));
      const productColorArray = capacity?.map((item: number) => ({
        colorsId: item,
        productsId: responseProduct?.id,
      }));

      for (const image of imageArray) {
        await this.productRepo.createImage(image);
      }
      for (const item of productCapacityArray) {
        await this.productRepo.createProductCapacity(item);
      }

      for (const item of productColorArray) {
        await this.productRepo.createProductColor(item);
      }
      return {
        success: true,
        message: 'Product created successfully',
      };
    }
    return {
      success: false,
      message: 'Create Product failed',
    };
  }

  async createNewProductCapacity(productCapacityDTO: ProductCapacityDTO) {
    await this.productRepo.createProductCapacity(productCapacityDTO);
  }

  async createNewProductColor(productColorDTO: ProductColorDTO) {
    await this.productRepo.createNewProductColor(productColorDTO);
  }

  async updateProduct(
    data: IsProductInterface,
    id: number,
  ): Promise<GlobalInterface> {
    const response = await this.productRepo.updateProduct(data, id);
    if (response) {
      return {
        success: true,
        message: 'Updated product successfully',
      };
    }
    return {
      success: false,
      message: 'update product failed',
    };
  }

  async blockProduct(
    data: IsProductInterface,
    id: number,
  ): Promise<GlobalInterface> {
    const response = await this.productRepo.blockProduct(data, id);
    if (response) {
      return {
        success: true,
        message: 'Block product successfully',
      };
    }
    return {
      success: false,
      message: 'Block product failed',
    };
  }

  async updateImage(
    id: number,
    data: IsProductInterface,
  ): Promise<GlobalInterface> {
    const response = await this.productRepo.updateImage(data, id);
    if (response) {
      return {
        success: true,
        message: 'Updated image successfully',
      };
    }
    return {
      success: false,
      message: 'Updated image failed',
    };
  }

  async deleteProduct(id: number): Promise<GlobalInterface> {
    const response = await this.productRepo.deleteProduct(id);

    if (!response) {
      return {
        success: false,
        message: 'Product deleted failed',
      };
    }
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }

  async deleteProductCapacity(productCapacityDTO: ProductCapacityDTO) {
    return this.productRepo.deleteProductCapacity(productCapacityDTO);
  }

  async deleteProductColor(productColorDTO: ProductColorDTO) {
    return this.productRepo.deleteProductColor(productColorDTO);
  }
}
