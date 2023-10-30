import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthServices } from './auth.service';
import { RegisterDTOController, LoginDTO } from './dto/auth.dto';
import { card_id } from './enum/user.enum';

dotenv.config();
@Controller(`${process.env.API_KEY}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthServices) {}

  @Post('/register')
  register(@Body() authDTOController: RegisterDTOController): Promise<any> {
    const req = { ...authDTOController, card_id };
    return this.authService.register(req);
  }

  @Put('verifyAccount/:id')
  verifyAccount(@Param('id') card_id: string) {
    return this.authService.verifyAccount(card_id);
  }

  @Post('/login')
  login(@Body() loginDTOController: LoginDTO): Promise<any> {
    return this.authService.login(loginDTOController);
  }
}
