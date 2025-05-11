import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { AcceptanceTokens } from '../../domain/model/acceptance-tokens';
import { PaymentPayload } from '../../domain/model/payment-payload';

describe('PaymentService', () => {
  let service: PaymentService;

  const mockGetAcceptanceTokensUseCase = {
    execute: jest.fn(),
  };

  const mockMakePaymentUseCase = {
    execute: jest.fn(),
  };

  const mockStatusTransactionUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: 'GetAcceptanceTokensUseCase',
          useValue: mockGetAcceptanceTokensUseCase,
        },
        {
          provide: 'MakePaymentUseCase',
          useValue: mockMakePaymentUseCase,
        },
        {
          provide: 'StatusTransactionUseCase',
          useValue: mockStatusTransactionUseCase,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAcceptanceTokens', () => {
    it('should return acceptance tokens', async () => {
      const expectedTokens: AcceptanceTokens = { token: '12345' } as any;
      mockGetAcceptanceTokensUseCase.execute.mockResolvedValue(expectedTokens);

      const result = await service.getAcceptanceTokens();
      expect(result).toEqual(expectedTokens);
      expect(mockGetAcceptanceTokensUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('makePayment', () => {
    it('should return payment confirmation string', async () => {
      const payload: PaymentPayload = { amount: 100 } as any;
      const expectedResponse = 'payment-success';
      mockMakePaymentUseCase.execute.mockResolvedValue(expectedResponse);

      const result = await service.makePayment(payload);
      expect(result).toBe(expectedResponse);
      expect(mockMakePaymentUseCase.execute).toHaveBeenCalledWith(payload);
    });
  });

  describe('statusPayment', () => {
    it('should return payment status string', async () => {
      const id = 'abc123';
      const expectedStatus = 'paid';
      mockStatusTransactionUseCase.execute.mockResolvedValue(expectedStatus);

      const result = await service.statusPayment(id);
      expect(result).toBe(expectedStatus);
      expect(mockStatusTransactionUseCase.execute).toHaveBeenCalledWith(id);
    });
  });
});
