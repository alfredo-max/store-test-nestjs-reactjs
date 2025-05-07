import { GetAcceptanceTokensUseCase } from '../../domain/ports/inbound/get-acceptance-tokens.use-case';
import { ExternalTokenService } from '../../domain/ports/outbound/external-token.service';
import { AcceptanceTokens } from '../../domain/model/acceptance-tokens';

export class GetAcceptanceTokensUseCaseImpl implements GetAcceptanceTokensUseCase {
  constructor(private readonly externalService: ExternalTokenService) {}

  async execute(): Promise<AcceptanceTokens> {
    return await this.externalService.getAcceptanceTokens();
  }
}