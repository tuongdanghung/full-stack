import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MysqlModule } from './database/config.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { RoleModule } from './modules/role/role.module';
import { ColorModule } from './modules/color/color.module';
import { CapacityModule } from './modules/capacity/capacity.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.API_KEY;

@Module({
  imports: [
    MysqlModule,
    CategoryModule,
    BrandModule,
    RoleModule,
    ColorModule,
    CapacityModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: `${PORT}/roles`, method: RequestMethod.GET });
  }
}
