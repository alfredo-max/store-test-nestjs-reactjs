import { PaymentService } from "src/modules/payment/application/services/payment.service";
import { PaymentController } from "./payment.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { PaymentPayload } from "src/modules/payment/domain/model/payment-payload";
import { PresignedToken } from "src/modules/payment/domain/model/presigned-token.model";
import { AcceptanceTokens } from "src/modules/payment/domain/model/acceptance-tokens";

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            statusPayment: jest.fn(),
            makePayment: jest.fn(),
            getAcceptanceTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('statusPayment', () => {
    it('should call paymentService.statusPayment with correct id and return the result', async () => {
      const id = '123';
      const mockResult = 'PAID';

      (service.statusPayment as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.statusPayment(id);

      expect(service.statusPayment).toHaveBeenCalledWith(id);
      expect(result).toBe(mockResult);
    });
  });

  describe('makePayment', () => {
    it('should call paymentService.makePayment with the correct payload and return the result', async () => {
      const mockPayload: PaymentPayload = {
        acceptanceToken: 'token123',
        acceptPersonalAuth: 'yes',
        amountInCents: 100000,
        currency: 'COP',
        signature: 'firma123',
        customerEmail: 'test@example.com',
        paymentMethod: {
          type: 'CARD',
          installments: 1,
          token: 'card_token_abc',
        },
        reference: 'REF123',
        exp_month: '12',
        exp_year: '2026',
      };

      const mockResult = 'SUCCESS';

      (service.makePayment as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.makePayment(mockPayload);

      expect(service.makePayment).toHaveBeenCalledWith(mockPayload);
      expect(result).toBe(mockResult);
    });
  });

  describe('getTokens', () => {
    it('should return acceptance tokens from the payment service', async () => {
      const mockTokens: AcceptanceTokens = new AcceptanceTokens(
        new PresignedToken('token1', 'https://link1.com', 'terms'),
        new PresignedToken('token2', 'https://link2.com', 'personal_data'),
      );

      (service.getAcceptanceTokens as jest.Mock).mockResolvedValue(mockTokens);

      const result = await controller.getTokens();

      expect(service.getAcceptanceTokens).toHaveBeenCalled();
      expect(result).toBe(mockTokens);
    });
  });

});