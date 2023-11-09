import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PaypalStrategy } from './paypal.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'paypal' })],
  providers: [PaypalStrategy],
})
export class PaypalModule {}
