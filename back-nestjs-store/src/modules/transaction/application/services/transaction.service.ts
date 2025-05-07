import { Inject, Injectable } from '@nestjs/common';
import { GetAcceptanceTokensUseCase } from '../../domain/ports/inbound/get-acceptance-tokens.use-case';
import { AcceptanceTokens } from '../../domain/model/acceptance-tokens';

@Injectable()
export class TransactionService {

    constructor(
        @Inject('GetAcceptanceTokensUseCase')
        private readonly getAcceptanceTokensUseCase: GetAcceptanceTokensUseCase,
    ) {}

    async getAcceptanceTokens(): Promise<AcceptanceTokens> {
        return this.getAcceptanceTokensUseCase.execute();
    }
}


