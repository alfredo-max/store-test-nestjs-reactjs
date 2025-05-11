import 'reflect-metadata';
import 'rxjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CardTokenService } from '../cardTokenService';
import axios from 'axios';

vi.mock('axios');

describe('CardTokenService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createCardToken', () => {
    it('debería crear un token de tarjeta exitosamente', async () => {
      const mockCardData = {
        number: '4242424242424242',
        cvc: '123',
        exp_month: '12',
        exp_year: '2025',
        card_holder: 'John Doe'
      };

      const mockResponse = {
        data: {
          id: 'tok_test_123',
          status: 'valid',
          card: {
            brand: 'visa',
            last_four: '4242'
          }
        }
      };

      const wompiApiMock = {
        post: vi.fn().mockResolvedValue(mockResponse)
      };
      vi.mocked(axios.create).mockReturnValue(wompiApiMock as any);

      const cardTokenService = new CardTokenService();
      const result = await cardTokenService.createCardToken(mockCardData);

      expect(result).toEqual(mockResponse.data);
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://api-sandbox.co.uat.wompi.dev/v1',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('debería manejar errores al crear un token de tarjeta', async () => {
      const mockCardData = {
        number: '4242424242424242',
        cvc: '123',
        exp_month: '12',
        exp_year: '2025',
        card_holder: 'John Doe'
      };

      const mockError = new Error('Error al crear token');

      const wompiApiMock = {
        post: vi.fn().mockRejectedValue(mockError)
      };
      vi.mocked(axios.create).mockReturnValue(wompiApiMock as any);

      const cardTokenService = new CardTokenService();
      await expect(cardTokenService.createCardToken(mockCardData)).rejects.toThrow('Error al crear token');
    });
  });
}); 