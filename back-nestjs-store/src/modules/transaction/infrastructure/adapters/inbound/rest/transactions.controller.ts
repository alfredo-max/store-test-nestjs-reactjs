import { Controller, Get} from '@nestjs/common';
import { TransactionService } from 'src/modules/transaction/application/services/transaction.service';
import { AcceptanceTokens } from 'src/modules/transaction/domain/model/acceptance-tokens';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get('acceptance-tokens')
    async getTokens():Promise<AcceptanceTokens> {
        return await this.transactionService.getAcceptanceTokens();
    }
}
