import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";


  const PaymentLoadingScreen: React.FC = () => {
    const userInfo = useSelector((state: RootState) => state.payment.userInfo);
    const cardInfo = useSelector((state: RootState) => state.payment.cardInfo);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="text-white text-lg">
          Procesando pago para {userInfo ? userInfo.name : "el usuario"}...
          <div className="mt-4">
            <p>Detalles de la tarjeta:</p>
            <p>Número de tarjeta: {cardInfo ? cardInfo.cardNumber : "N/A"}</p>
            <p>Nombre en la tarjeta: {cardInfo ? cardInfo.nameOnCard : "N/A"}</p>
            <p>Fecha de expiración: {cardInfo ? `${cardInfo.expMonth}/${cardInfo.expYear}` : "N/A"}</p>
            </div>
        </div>
      </div>
    );
  };
  
  export default PaymentLoadingScreen;