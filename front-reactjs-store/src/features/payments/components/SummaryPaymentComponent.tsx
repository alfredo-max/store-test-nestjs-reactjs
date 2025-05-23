import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Product } from '../../products/models/Product';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Charge } from '../enums/chargeEnum';


interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const SummaryPaymentComponent: React.FC<Props> = ({ onBack,onContinue}) => {
  const productSelected:Product | null = useSelector((state: RootState) => state.selectedProductPayment.selectedProduct);
  const productAmount = productSelected?.price;
  const total = (productAmount ?? 0) + Charge.BASE + Charge.SHIPPING;

  return (
      <div className="space-y-6 text-sm text-gray-800">
        <div className="flex items-center gap-2">
          <FaArrowLeft data-testid="back-arrow" className="text-yellow-400 cursor-pointer" onClick={onBack} />
          <h2 className="text-lg font-semibold text-black">Resumen de tu pago</h2>
        </div>

        <div className="space-y-3 border border-gray-300 rounded p-4">
          <div className="flex justify-between">
            <span>Monto del producto:</span>
            <span>${(productAmount ?? 0).toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between">
            <span>Comisión base:</span>
            <span>${Charge.BASE.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío:</span>
            <span>${Charge.SHIPPING.toLocaleString('es-CO')}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-black text-base">
            <span>Total a pagar:</span>
            <span>${total.toLocaleString('es-CO')}</span>
          </div>
        </div>

        <button
          onClick={() => onContinue()}
          className="w-full bg-black text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-900 transition"
        >
        <span><RiSecurePaymentFill /></span>  Confirmar y pagar
        </button>
      </div>
  );
};

export default SummaryPaymentComponent;