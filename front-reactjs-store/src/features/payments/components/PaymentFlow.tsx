import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { usePayment } from '../hooks/usePayment';
import Transaction from './Tansaction';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';
import { Product } from '../../products/models/Product';
import { PaymentPayload } from '../models/PaymentPayload';

interface Props {
    onRetry: () => void;
}

const PaymentFlow: React.FC<Props> = ({ onRetry }) => {
    const {
        acceptanceTokens,
        cardToken,
        paymentError,
        transactionId,
        paymentStatus,
        userForm,
        cardForm,
        tokenizeUserCard,
        initiatePayment,
        startPollPaymentStatus,
        resetPayment,
    } = usePayment();

    const [status, setStatus] = useState<PaymentStatusEnum>(PaymentStatusEnum.PENDING);
    const productSelected: Product | null = useSelector((state: RootState) => state.selectedProductPayment.selectedProduct);

    useEffect(() => {
        const startTransactionFlow = async () => {
            if (cardForm && userForm && productSelected) {
                try {
                    // Tokenizar la tarjeta
                    const token = await tokenizeUserCard({
                        number: cardForm.cardNumber,
                        cvc: cardForm.cvc,
                        exp_month: cardForm.expMonth,
                        exp_year: cardForm.expYear,
                        card_holder: userForm.name,
                    }).unwrap();

                    // Iniciar el pago con el token obtenido
                    debugger
                    const paymentPayload = createPaymentPayload(productSelected.price,token );
                    await initiatePayment(paymentPayload);
                } catch {
                    handlePaymentError();
                }
            } else {
                handlePaymentError();
            }
        };

        startTransactionFlow();
    }, []); // Solo se ejecuta una vez

    useEffect(() => {
        if (transactionId) {
            startPollPaymentStatus(transactionId);
        }
    }, [transactionId]);

    useEffect(() => {
        setStatus(PaymentStatusEnum[paymentStatus as keyof typeof PaymentStatusEnum] || PaymentStatusEnum.ERROR);
    }, [paymentStatus]);

    const handlePaymentError = () => {
        resetPayment();
        setStatus(PaymentStatusEnum.ERROR);
    };

    const createPaymentPayload = (price: number, token: string): PaymentPayload => ({
        acceptanceToken: acceptanceTokens?.presigned_acceptance.acceptance_token || '',
        acceptPersonalAuth: acceptanceTokens?.presigned_personal_data_auth.acceptance_token || '',
        amountInCents: price,
        currency: 'COP',
        signature: '',
        customerEmail: userForm?.email || '',
        paymentMethod: {
            type: 'CARD',
            installments: Number(cardForm?.installments) || 1,
            token,
        },
        reference: '',
    });

    return <Transaction status={status} onRetry={() => onRetry()} />;
};

export default PaymentFlow;
