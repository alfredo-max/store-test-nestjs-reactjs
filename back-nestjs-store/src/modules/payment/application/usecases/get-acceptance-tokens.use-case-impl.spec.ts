import { Test, TestingModule } from "@nestjs/testing";
import { GetAcceptanceTokensUseCaseImpl } from "./get-acceptance-tokens.use-case-impl";
import { ExternalTokenService } from "../../domain/ports/outbound/external-token.service";
import { AcceptanceTokens } from "../../domain/model/acceptance-tokens";

describe('GetAcceptanceTokensUseCaseImpl', () => {
  let useCase: GetAcceptanceTokensUseCaseImpl;
  let externalService: ExternalTokenService;

  const mockAcceptanceTokens: AcceptanceTokens = {
    presigned_acceptance: {
      acceptance_token: 'token123',
      permalink: 'http://link.com',
      type: 'acceptance',
    },
    presigned_personal_data_auth: {
      acceptance_token: 'token456',
      permalink: 'http://link2.com',
      type: 'personal_data_auth',
    },
  };

  const externalServiceMock = {
    getAcceptanceTokens: jest.fn().mockResolvedValue(mockAcceptanceTokens),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAcceptanceTokensUseCaseImpl,
        {
          provide: 'ExternalTokenService',
          useValue: externalServiceMock,
        },
      ],
    }).compile();

    useCase = module.get(GetAcceptanceTokensUseCaseImpl);
    externalService = module.get('ExternalTokenService');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call externalService.getAcceptanceTokens and return its result', async () => {
    const result = await useCase.execute();
    expect(externalService.getAcceptanceTokens).toHaveBeenCalled();
    expect(result).toEqual(mockAcceptanceTokens);
  });
});