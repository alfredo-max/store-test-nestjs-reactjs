import { Controller, Get } from '@nestjs/common';
import { TransactionService } from 'src/modules/transactions/application/services/transaction.service';
import { AcceptanceTokens } from 'src/modules/transactions/domain/model/acceptance-tokens';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get('acceptance-tokens')
    async getTokens():Promise<AcceptanceTokens> {
        return await this.transactionService.getAcceptanceTokens();
    }

}
