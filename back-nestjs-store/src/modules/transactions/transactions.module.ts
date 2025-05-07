import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TransactionsController } from './infrastructure/adapters/inbound/rest/transactions.controller';
import { GetAcceptanceTokensUseCaseImpl } from './application/usecases/get-acceptance-tokens.use-case-impl';
import { ExternalTokenServiceImpl } from './infrastructure/adapters/inbound/outbound/services/external-token.service.impl';
import { TransactionService } from './application/services/transaction.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule,ConfigModule],
  controllers: [TransactionsController],
  providers: [
    TransactionService,
    {
      provide: 'GetAcceptanceTokensUseCase',
      useClass: GetAcceptanceTokensUseCaseImpl,
    },
    {
      provide: 'ExternalTokenService',
      useClass: ExternalTokenServiceImpl,
    },
  ],
})
export class TransactionsModule {}