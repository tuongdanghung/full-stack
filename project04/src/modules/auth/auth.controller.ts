import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Get,
  Req,
  Inject,
  Res,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthServices } from './auth.service';
import { RegisterDTOController, LoginDTO } from './dto/auth.dto';
import { card_id } from './enum/user.enum';
import { AuthGuard } from '@nestjs/passport';
import { SocketGateway } from 'src/socket';

dotenv.config();
@Controller(`${process.env.API_KEY}/auth`)
export class AuthController {
  constructor(
    private readonly authService: AuthServices,
    @Inject(SocketGateway) private readonly socketGateway: SocketGateway,
  ) {}

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
    const result = this.authService.login(loginDTOController);
    return result;
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const response = await this.authService.googleLogin(req);

    if (response && response.access_token) {
      const token = response.access_token;

      return res.redirect(`http://127.0.0.1:3000/verifyGoogle/${token}/V1`);
    }
  }
}
