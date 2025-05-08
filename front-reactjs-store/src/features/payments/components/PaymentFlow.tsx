import { useEffect, useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import Transaction from './Tansaction';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CardFormData } from '../models/CardFormData';
import { UserInfo } from '../models/UserInfo';


const PaymentFlow = () => {
    const {
        tokenizeUserCard,
        initiatePayment,
        startPollPaymentStatus,
        cardToken,
        transactionId,
        paymentStatus,
        resetPayment,
    } = usePayment();

    const cardFormData: (CardFormData | null) = useSelector((state: RootState) => state.formPayment.cardInfo);
    const userInfo: (UserInfo | null) = useSelector((state: RootState) => state.formPayment.userInfo);

    const [status, setStatus] = useState<PaymentStatusEnum>(PaymentStatusEnum.PENDING);

    useEffect(() => {
        const startTransactionFlow = async () => {
            if (cardFormData != null && userInfo !=null) {

                try {
                    await tokenizeUserCard(
                        {
                            number: cardFormData.cardNumber,
                            cvc: cardFormData.cvc,
                            exp_month: cardFormData.expMonth,
                            exp_year: cardFormData.expYear,
                            card_holder: userInfo.name,
                        }
                    );
                } catch {
                    setStatus(PaymentStatusEnum.ERROR);
                }
            }
        };

        startTransactionFlow();

        return () => {
            resetPayment(); // limpiar estado al desmontar
        };
    }, []);

    useEffect(() => {
        const runPayment = async () => {
            if (cardToken) {
                try {
                    //await initiatePayment({ ...paymentPayload, cardToken });
                } catch {
                    setStatus(PaymentStatusEnum.ERROR);
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
        if (paymentStatus === 'APPROVED') {
            setStatus(PaymentStatusEnum.APPROVED);
        } else if (paymentStatus === 'DECLINED') {
            setStatus(PaymentStatusEnum.ERROR);
        }
    }, [paymentStatus]);

    return <Transaction status={status} />;
};

export default PaymentFlow;
