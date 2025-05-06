import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CardTokenService {
  private readonly wompiApi = axios.create({
    baseURL: 'https://api-sandbox.co.uat.wompi.dev/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async createCardToken(cardData: {
    number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
  }) {
    const response = await this.wompiApi.post('/tokens/cards', cardData);
    return response.data;
  }
}