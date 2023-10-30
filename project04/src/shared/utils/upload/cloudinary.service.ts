import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './interface/cloudinary.response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  // Hàm này có tác dụng lưu trữ ảnh upload và trả về file ảnh đó

  // xử lý 1 ảnh
  uploadSingleFile(file?: Express.Multer.File): Promise<CloudinaryResponse> {
    if (!file) {
      return Promise.resolve(null);
    }
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadOptions = {
        folder: 'Project-NestJs',
      };
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer)?.pipe(uploadStream);
    });
  }
  // // xử lý nhiều ảnh
  // uploadMultipleFiles(files: Express.Multer.File[]): any {
  //   // Promise.all() => để đợi cho tất cả các Promise trong mảng hoàn thành.
  //   return Promise.all(
  //     files.map((file) => {
  //       return new Promise<CloudinaryResponse>((resolve, reject) => {
  //         const uploadOptions = {
  //           folder: 'Project-NestJs',
  //         };
  //         const uploadStream = cloudinary.uploader.upload_stream(
  //           uploadOptions,
  //           (error, result) => {
  //             if (error) return reject(error);
  //             resolve(result);
  //           },
  //         );
  //         streamifier.createReadStream(file.buffer)?.pipe(uploadStream);
  //       });
  //     }),
  //   );
  // }
}
