import { Test, TestingModule } from "@nestjs/testing";
import { StatusTransactionUseCaseImpl } from "./status-transaction.use-case-impl";
import { ExternalTokenService } from "../../domain/ports/outbound/external-token.service";

describe('StatusTransactionUseCaseImpl', () => {
  let useCase: StatusTransactionUseCaseImpl;
  let externalService: ExternalTokenService;

  const mockTransactionId = 'txn_123456';
  const mockStatus = 'APPROVED';

  const externalServiceMock = {
    statusPayment: jest.fn().mockResolvedValue(mockStatus),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusTransactionUseCaseImpl,
        {
          provide: 'ExternalTokenService',
          useValue: externalServiceMock,
        },
      ],
    }).compile();

    useCase = module.get(StatusTransactionUseCaseImpl);
    externalService = module.get('ExternalTokenService');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call externalService.statusPayment with id and return status', async () => {
    const result = await useCase.execute(mockTransactionId);
    expect(externalService.statusPayment).toHaveBeenCalledWith(mockTransactionId);
    expect(result).toBe(mockStatus);
  });
});