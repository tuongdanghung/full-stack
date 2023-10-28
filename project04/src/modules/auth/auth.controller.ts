import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthServices } from './auth.service';
import { AuthDTOController } from './dto/auth.dto';
import { UserEnum, card_id, role } from './enum/user.enum';
//   import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';

dotenv.config();
@Controller(`${process.env.API_KEY}/auth/register`)
export class AuthController {
  constructor(private readonly authService: AuthServices) {}

  @Post()
  register(@Body() authDTOController: AuthDTOController): Promise<any> {
    const req = { ...authDTOController, ...UserEnum, card_id, role };

    return this.authService.register(req);
  }
}
