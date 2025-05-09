import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GetAcceptanceTokensUseCaseImpl } from './application/usecases/get-acceptance-tokens.use-case-impl';
import { ExternalTokenServiceImpl } from './infrastructure/adapters/outbound/services/external-token.service.impl';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './infrastructure/adapters/inbound/rest/payment.controller';
import { PaymentService } from './application/services/payment.service';
import { MakePaymentUseCaseImpl } from './application/usecases/make-payment.use-case-impl';
import { StatusTransactionUseCaseImpl } from './application/usecases/status-transaction.use-case-impl';

@Module({
  imports: [HttpModule,ConfigModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'GetAcceptanceTokensUseCase',
      useClass: GetAcceptanceTokensUseCaseImpl,
    },
    {
      provide: 'MakePaymentUseCase',
      useClass: MakePaymentUseCaseImpl,
    },

    {
      provide: 'StatusTransactionUseCase',
      useClass: StatusTransactionUseCaseImpl,
    },
    {
      provide: 'ExternalTokenService',
      useClass: ExternalTokenServiceImpl,
    },
  ],
})
export class PaymentModule {}