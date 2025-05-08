import { useEffect, useState } from 'react';
import { usePayment } from './usePayment';
import { Card } from '../models/Card';
//import { PaymentPayload } from '../models/PaymentPayload';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';

export const useTransactionFlow = (cardData: Card) => {
    const {
    tokenizeUserCard,
    initiatePayment,
    startPollPaymentStatus,
    cardToken,
    transactionId,
    paymentStatus,
    resetPayment,
  } = usePayment();

  const [status, setStatus] = useState<PaymentStatusEnum>(PaymentStatusEnum.PENDING);

  // Paso 1: Tokenizar tarjeta
  useEffect(() => {
    const startTokenization = async () => {
        console.log("se empieza a tokenizar la tarjeta")
      try {
        await tokenizeUserCard(cardData);
      } catch {
        setStatus(PaymentStatusEnum.ERROR);
      }
    };

    startTokenization();

    return () => {
      resetPayment(); // limpia el estado si se desmonta
    };
  }, []);

  // Paso 2: Iniciar pago
  useEffect(() => {
    const sendPayment = async () => {
      console.log("se recibe el token de la card:"+cardToken)
      if (cardToken) {
        try {
          //await initiatePayment({ ...paymentPayload, cardToken });
        } catch {
          setStatus(PaymentStatusEnum.ERROR);
        }
      }
    };

    sendPayment();
  }, [cardToken]);

  // Paso 3: Iniciar polling
  useEffect(() => {
    console.log("se inicia el polling con tranId: "+transactionId)
    if (transactionId) {
      startPollPaymentStatus(transactionId);
    }
  }, [transactionId]);

  // Paso 4: Evaluar estado final
  useEffect(() => {
    console.log("estado finalizado: "+paymentStatus)
    if (paymentStatus === 'APPROVED') {
      setStatus(PaymentStatusEnum.APPROVED);
    } else{
      setStatus(PaymentStatusEnum.ERROR);
    }
  }, [paymentStatus]);

  return { status };
};
