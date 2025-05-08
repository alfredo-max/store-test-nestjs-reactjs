import { useEffect, useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import Transaction from './Tansaction';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CardFormData } from '../models/CardFormData';
import { UserInfo } from '../models/UserInfo';


interface Props {
    onRetry: () => void;
}

const PaymentFlow : React.FC<Props> = ({onRetry}) => {
    
    const {
        paymentError,
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
            console.log("entrando funcion hacer pago: "+cardToken)
            if (cardToken) {
                console.log("card token es diferente de null")
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
        } else {
            setStatus(PaymentStatusEnum.ERROR);
        }
    }, [paymentStatus]);

    const handlePaymentError = () => {
        resetPayment();
        setStatus(PaymentStatusEnum.ERROR);
    };

    return <Transaction status={status} onRetry={() => onRetry()} />;
};

export default PaymentFlow;
