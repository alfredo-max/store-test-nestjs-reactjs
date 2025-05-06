// features/products/components/forms/UserInfoForm.tsx
import React from "react";

interface Props {
  onContinue: () => void;
}

const UserInfoForm: React.FC<Props> = ({ onContinue }) => {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold">Ingresa tus datos</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={onContinue}
        className="w-full bg-black text-white py-2 rounded-full"
      >
        Continuar con tu pago
      </button>
    </form>
  );
};

export default UserInfoForm;
