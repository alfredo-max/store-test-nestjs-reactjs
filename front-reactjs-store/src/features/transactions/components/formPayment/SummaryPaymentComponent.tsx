import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface Props {
  onBack: () => void;
  onPay: () => void;
}

const SummaryPaymentComponent: React.FC<Props> = ({ onBack, onPay }) => {
  // Valores mockeados
  const productAmount = 120000;
  const baseFee = 4500;
  const deliveryFee = 8900;
  const total = productAmount + baseFee + deliveryFee;

  return (
    <div className="space-y-6 text-sm text-gray-800">
      <div className="flex items-center gap-2">
        <FaArrowLeft className="text-yellow-400 cursor-pointer" onClick={onBack} />
        <h2 className="text-lg font-semibold text-black">Resumen de tu pago</h2>
      </div>

      <div className="space-y-3 border border-gray-300 rounded p-4">
        <div className="flex justify-between">
          <span>Monto del producto:</span>
          <span>${productAmount.toLocaleString('es-CO')}</span>
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
        onClick={onPay}
        className="w-full bg-black text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-900 transition"
      >
        <img
          src="data:image/svg+xml;base64,..." // Replace with the actual SVG or image source
          alt="Secure payment icon"
          className="inline-block"
        />
        Confirmar y pagar
      </button>
    </div>
  );
};

export default SummaryPaymentComponent;
