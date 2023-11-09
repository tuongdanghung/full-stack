import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-paypal';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaypalStrategy extends PassportStrategy(Strategy, 'paypal') {
  constructor() {
    super({
      clientID:
        'AZbWChaFQdzWuXC3_lWT4p0EFY3voGhmxYwkiIJ6lFxr8E8OtCmXTIiznvgylIsex9qiJaZ6W-YuGs-y',
      clientSecret:
        'EH2UiGUlDohqA2A7Hlmmzch-4hQ3r6ViRKPGlj7kB558AjEgjnoxS9aa6BhT0GUU1v77n5uVdyWtL_kv',
      callbackURL: 'YOUR_CALLBACK_URL',
      scope: ['openid', 'email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    return profile;
  }
}
