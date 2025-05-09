import React, { useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { usePayment } from '../hooks/usePayment';
import Transaction from './Tansaction';
import { Product } from '../../products/models/Product';
import { PaymentPayload } from '../models/PaymentPayload';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';

interface Props {
    onRetry: () => void;
}

const PaymentFlow: React.FC<Props> = ({ onRetry }) => {
    const {
        acceptanceTokens,
        userForm,
        cardForm,
        tokenizeUserCard,
        initiatePayment,
        startPollPaymentStatus,
        setStatus,
    } = usePayment();

    const productSelected: Product | null = useSelector((state: RootState) => state.selectedProductPayment.selectedProduct);
    const hasRunRef = useRef(false);
    useEffect(() => {
        if (hasRunRef.current) return;
        hasRunRef.current = true;
        setStatus(PaymentStatusEnum.PENDING);
        const startTransactionFlow = async () => {
            if (!cardForm || !userForm || !productSelected) return;

            try {
                const token = await tokenizeUserCard({
                    number: cardForm.cardNumber,
                    cvc: cardForm.cvc,
                    exp_month: cardForm.expMonth,
                    exp_year: cardForm.expYear,
                    card_holder: userForm.name,
                }).unwrap();

                if (!token) return;

                const paymentPayload = createPaymentPayload(productSelected.price, token);
                const paymentId = await initiatePayment(paymentPayload).unwrap();

                if (!paymentId) return;

                pollUntilResolvedPayment(paymentId);
            } catch (error) {
                console.error("Error en la transacción:", error);
            }
        };

        startTransactionFlow();
    }, []);

    const pollUntilResolvedPayment = async (paymentId:string) => {
        let status = PaymentStatusEnum.PENDING;
        while (status==PaymentStatusEnum.PENDING) {
            try {
                status = await startPollPaymentStatus(paymentId).unwrap();
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error("Error al verificar el estado del pago:", error);
                break;
            }
        }
    }

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
        reference: ''
    });

    return <Transaction onRetry={() => onRetry()} />;
};

export default PaymentFlow;
