import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Cấu hình transporter
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true nếu sử dụng SSL/TLS
      auth: {
        user: 'hungtuongcode@gmail.com',
        pass: 'didprvawsylysjkb',
      },
    });
  }

  async sendEmail(
    recipient: string,
    subject: string,
    content: string,
  ): Promise<void> {
    try {
      // Gửi email
      await this.transporter.sendMail({
        from: '"Technology store nestjs 👻" <no-relply@hung.com>',
        to: recipient,
        subject,
        html: content,
      });
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
