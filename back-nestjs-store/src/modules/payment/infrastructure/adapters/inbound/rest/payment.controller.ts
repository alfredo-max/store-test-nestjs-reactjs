import { Body, Controller, Get, Post} from '@nestjs/common';
import { PaymentService } from 'src/modules/payment/application/services/payment.service';
import { AcceptanceTokens } from 'src/modules/payment/domain/model/acceptance-tokens';
import { PaymentPayload } from 'src/modules/payment/domain/model/payment-payload';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('acceptance-tokens')
    async getTokens():Promise<AcceptanceTokens> {
        return await this.paymentService.getAcceptanceTokens();
    }

    @Post('make-payment')
    async makePayment(@Body() paymentPayload: PaymentPayload): Promise<string> {
        return await this.paymentService.makePayment(paymentPayload);
    }
}
