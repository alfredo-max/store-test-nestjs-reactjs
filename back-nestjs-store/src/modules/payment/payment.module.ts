import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GetAcceptanceTokensUseCaseImpl } from './application/usecases/get-acceptance-tokens.use-case-impl';
import { ExternalTokenServiceImpl } from './infrastructure/adapters/outbound/services/external-token.service.impl';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './infrastructure/adapters/inbound/rest/payment.controller';
import { PaymentService } from './application/services/payment.service';

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
      provide: 'ExternalTokenService',
      useClass: ExternalTokenServiceImpl,
    },
  ],
})
export class PaymentModule {}