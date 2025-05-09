import { Inject, Injectable } from '@nestjs/common';
import { ExternalTokenService } from '../../domain/ports/outbound/external-token.service';
import { StatusTransactionUseCase } from '../../domain/ports/inbound/status-transaction.use-case';

@Injectable()
export class StatusTransactionUseCaseImpl implements StatusTransactionUseCase{
    
    constructor(
        @Inject('ExternalTokenService')
        private readonly externalService: ExternalTokenService) {}
        
    async execute(id: string): Promise<string> {
        return await this.externalService.statusPayment(id);
    }

    
}