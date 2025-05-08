import { Controller, Get} from '@nestjs/common';
import { PaymentService } from 'src/modules/payment/application/services/payment.service';
import { AcceptanceTokens } from 'src/modules/payment/domain/model/acceptance-tokens';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('acceptance-tokens')
    async getTokens():Promise<AcceptanceTokens> {
        return await this.paymentService.getAcceptanceTokens();
    }
}
