// features/products/components/forms/CardPaymentForm.tsx
import React from "react";

interface Props {
  onBack: () => void;
}

const CardPaymentForm: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Paga con tu tarjeta</h2>
      <p>Aquí irá el formulario de tarjeta...</p>
      <button
        type="button"
        onClick={onBack}
        className="text-sm underline text-blue-600"
      >
        Volver
      </button>
    </div>
  );
};

export default CardPaymentForm;
