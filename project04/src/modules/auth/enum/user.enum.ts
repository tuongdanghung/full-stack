import * as makeToken from 'uniqid';

const cardEncryption = makeToken();
export const card_id: string = cardEncryption;
