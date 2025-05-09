import { useEffect, useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import Transaction from './Tansaction';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Product } from '../../products/models/Product';
import { PaymentPayload } from '../models/PaymentPayload';


interface Props {
    onRetry: () => void;
}

const PaymentFlow : React.FC<Props> = ({onRetry}) => {
    
    const {
        acceptanceTokens,
        paymentError,
        cardToken,
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

    useEffect(() => {
        const startTransactionFlow = async () => {
            if (cardForm != null && userForm !=null) {
                try {
                    await tokenizeUserCard(
                        {
                            number: cardForm.cardNumber,
                            cvc: cardForm.cvc,
                            exp_month: cardForm.expMonth,
                            exp_year: cardForm.expYear,
                            card_holder: userForm.name,
                        }
                    );
                } catch {
                    handlePaymentError();
                } finally{
                    if(paymentError!=null){
                        handlePaymentError()
                    }
                }
            }
        };

        startTransactionFlow();
    }, []);

    useEffect(() => {
        const runPayment = async () => {
            if (cardToken) {
                try {
                    const productSelected:Product | null = useSelector((state: RootState) => state.selectedProductPayment.selectedProduct);
                    if (productSelected && cardForm && userForm) {
                        const paymentPayload = createPaymentPayload(productSelected.price);
                        await initiatePayment(paymentPayload);
                    } else {
                        handlePaymentError();
                    }
                } catch {
                    handlePaymentError();
                }
            }
        };

        runPayment();
    }, [cardToken]);

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

    const createPaymentPayload = (price:number): PaymentPayload => ({
        acceptanceToken: acceptanceTokens?.presigned_acceptance.acceptance_token || '',
        acceptPersonalAuth: acceptanceTokens?.presigned_personal_data_auth.acceptance_token || '',
        amountInCents: price,
        currency: 'COP',
        signature: '',
        customerEmail: userForm?.email || "",
        paymentMethod: {
            type: 'CARD',
            installments: Number(cardForm?.installments) || 1,
            token: cardToken || "",
        },
        reference:"",
    });

    return <Transaction status={status} onRetry={() => onRetry()} />;
};

export default PaymentFlow;
