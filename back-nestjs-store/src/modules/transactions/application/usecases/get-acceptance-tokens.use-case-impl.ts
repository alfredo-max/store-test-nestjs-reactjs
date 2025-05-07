import { GetAcceptanceTokensUseCase } from '../../domain/ports/inbound/get-acceptance-tokens.use-case';
import { ExternalTokenService } from '../../domain/ports/outbound/external-token.service';
import { AcceptanceTokens } from '../../domain/model/acceptance-tokens';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAcceptanceTokensUseCaseImpl implements GetAcceptanceTokensUseCase {
  constructor(
    @Inject('ExternalTokenService')
    private readonly externalService: ExternalTokenService) {}

  async execute(): Promise<AcceptanceTokens> {
    return await this.externalService.getAcceptanceTokens();
  }
}