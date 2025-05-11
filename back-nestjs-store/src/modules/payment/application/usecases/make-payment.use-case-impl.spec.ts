import { Test, TestingModule } from "@nestjs/testing";
import { MakePaymentUseCaseImpl } from "./make-payment.use-case-impl";
import { ExternalTokenService } from "../../domain/ports/outbound/external-token.service";
import { PaymentPayload } from "../../domain/model/payment-payload";

describe('MakePaymentUseCaseImpl', () => {
  let useCase: MakePaymentUseCaseImpl;
  let externalService: ExternalTokenService;

  const mockPaymentPayload: PaymentPayload = {
    acceptanceToken: 'acceptance_token_123',
    acceptPersonalAuth: 'personal_auth_456',
    amountInCents: 5000,
    currency: 'COP',
    signature: 'signature_xyz',
    customerEmail: 'user@example.com',
    paymentMethod: {
      type: 'CARD',
      installments: 1,
      token: 'card_token_abc',
    },
    reference: 'ref_001',
    exp_month: '12',
    exp_year: '2025',
  };

  const externalServiceMock = {
    makePayment: jest.fn().mockResolvedValue('payment_successful'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MakePaymentUseCaseImpl,
        {
          provide: 'ExternalTokenService',
          useValue: externalServiceMock,
        },
      ],
    }).compile();

    useCase = module.get(MakePaymentUseCaseImpl);
    externalService = module.get('ExternalTokenService');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call externalService.makePayment with payload and return result', async () => {
    const result = await useCase.execute(mockPaymentPayload);
    expect(externalService.makePayment).toHaveBeenCalledWith(mockPaymentPayload);
    expect(result).toBe('payment_successful');
  });
});