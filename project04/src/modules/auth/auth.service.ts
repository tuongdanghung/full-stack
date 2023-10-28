// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { AuthDTOServices } from './dto/auth.dto';
import { EmailService } from '../../shared/utils/mail.service';
// import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class AuthServices {
  constructor(
    private authRepo: AuthRepository,
    private emailService: EmailService,
  ) {}

  async register(req: AuthDTOServices): Promise<void> {
    const hashPassword = (password: string) =>
      bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = { ...req, password: hashPassword(req.password) };
    const response = await this.authRepo.register(user);
    // check da co email hay chua. neu chua thi gui mail
    if (response) {
      const html = `<h2>Register code:</h2><br/><button type="button" onclick="sendRequest()">Click here to confirm your registration</button>`;
      const data = {
        email: req.email,
        html,
        subject: 'Confirm your registration',
      };
      await this.emailService.sendEmail(data.email, data.subject, data.html);
    }
  }
}
