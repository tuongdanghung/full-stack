import * as makeToken from 'uniqid';

export enum UserEnum {
  avatar = 'https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi3LTAwMi1wLnBuZw.png',
  status = 'true',
}

const cardEncryption = makeToken();
export const card_id: string = cardEncryption;

export const role: number = 1;
