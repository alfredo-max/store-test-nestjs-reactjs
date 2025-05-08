import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { Product } from '../../../products/models/Product';
import { RiSecurePaymentFill } from 'react-icons/ri';
import PaymentLoadingScreen from '../PaymentLoadingScreen';
import { CardFormData } from '../../models/CardFormData';
import { UserInfo } from '../../models/UserInfo';


interface Props {
  onBack: () => void;

}

const onPay = async (cardInfoCard: CardFormData | null, infoUser: UserInfo | null) => {
  if (!cardInfoCard || !infoUser) {
    console.error('Información de tarjeta o usuario incompleta.');
    return;
  }

  // try {
  //   const response = await tokenizeAndPay(cardInfoCard,infoUser);
  //   console.log('Pago exitoso:', response);
  // } catch (error) {
  //   console.error('Error en el proceso:', error);
  // }
};

const SummaryPaymentComponent: React.FC<Props> = ({ onBack }) => {
  const productSelected:Product | null = useSelector((state: RootState) => state.selectedProductPayment.selectedProduct);
  const cardInfoCard : CardFormData | null = useSelector((state: RootState) => state.formPayment.cardInfo)
  const infoUser : UserInfo | null = useSelector((state: RootState) => state.formPayment.userInfo)
  
  const [isLoading, setIsLoading] = useState(false);
  const productAmount = productSelected?.price;
  const baseFee = 4500;
  const deliveryFee = 3000;
  const total = (productAmount ?? 0) + baseFee + deliveryFee;

  return (
    <>
    {isLoading && <PaymentLoadingScreen />}
      <div className="space-y-6 text-sm text-gray-800">
        <div className="flex items-center gap-2">
          <FaArrowLeft className="text-yellow-400 cursor-pointer" onClick={onBack} />
          <h2 className="text-lg font-semibold text-black">Resumen de tu pago</h2>
        </div>

        <div className="space-y-3 border border-gray-300 rounded p-4">
          <div className="flex justify-between">
            <span>Monto del producto:</span>
            <span>${(productAmount ?? 0).toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between">
            <span>Comisión base:</span>
            <span>${baseFee.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío:</span>
            <span>${deliveryFee.toLocaleString('es-CO')}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-black text-base">
            <span>Total a pagar:</span>
            <span>${total.toLocaleString('es-CO')}</span>
          </div>
        </div>

        <button
          onClick={() => onPay(cardInfoCard, infoUser)}
          className="w-full bg-black text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-900 transition"
        >
        <span><RiSecurePaymentFill /></span>  Confirmar y pagar
        </button>
      </div>
    </>
  );
};

export default SummaryPaymentComponent;