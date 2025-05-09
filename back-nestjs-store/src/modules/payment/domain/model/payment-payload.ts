export interface PaymentMethod {
    type: string;
    installments: number;
    token: string;
}

export interface PaymentPayload {
    acceptanceToken: string;
    acceptPersonalAuth: string;
    amountInCents: number;
    currency: string;
    signature: string;
    customerEmail: string;
    paymentMethod: PaymentMethod;
    reference: string;
    exp_month:string;
    exp_year:string;
}