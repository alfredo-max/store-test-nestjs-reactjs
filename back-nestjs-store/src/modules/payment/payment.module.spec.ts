import { Test, TestingModule } from "@nestjs/testing";
import { PaymentService } from "./application/services/payment.service";
import { GetAcceptanceTokensUseCaseImpl } from "./application/usecases/get-acceptance-tokens.use-case-impl";
import { MakePaymentUseCaseImpl } from "./application/usecases/make-payment.use-case-impl";
import { StatusTransactionUseCaseImpl } from "./application/usecases/status-transaction.use-case-impl";
import { PaymentController } from "./infrastructure/adapters/inbound/rest/payment.controller";
import { ExternalTokenServiceImpl } from "./infrastructure/adapters/outbound/services/external-token.service.impl";
import { PaymentModule } from "./payment.module";

describe('PaymentModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PaymentModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should resolve PaymentService', () => {
    const service = module.get<PaymentService>(PaymentService);
    expect(service).toBeDefined();
  });

  it('should resolve GetAcceptanceTokensUseCase', () => {
    const useCase = module.get('GetAcceptanceTokensUseCase');
    expect(useCase).toBeInstanceOf(GetAcceptanceTokensUseCaseImpl);
  });

  it('should resolve MakePaymentUseCase', () => {
    const useCase = module.get('MakePaymentUseCase');
    expect(useCase).toBeInstanceOf(MakePaymentUseCaseImpl);
  });

  it('should resolve StatusTransactionUseCase', () => {
    const useCase = module.get('StatusTransactionUseCase');
    expect(useCase).toBeInstanceOf(StatusTransactionUseCaseImpl);
  });

  it('should resolve ExternalTokenService', () => {
    const service = module.get('ExternalTokenService');
    expect(service).toBeInstanceOf(ExternalTokenServiceImpl);
  });

  it('should resolve PaymentController', () => {
    const controller = module.get<PaymentController>(PaymentController);
    expect(controller).toBeDefined();
  });
});