import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";

interface Props {
  onContinue: () => void;
}

const UserInfoForm: React.FC<Props> = ({ onContinue }) => {
  return (
    <form className="space-y-6 text-sm text-gray-800">
      <div className="flex items-center gap-2">
        <FaArrowLeft className="text-yellow-400" />
        <h2 className="text-lg font-semibold text-black">Ingresa tus datos</h2>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Correo electrónico</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Nombres y Apellidos</label>
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Celular o Número telefónico</label>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <span className="px-3 bg-gray-100 text-sm text-gray-700 flex items-center gap-1">
            +57
            <img
              src="https://flagcdn.com/w40/co.png"
              alt="Colombia"
              className="w-5 h-3 object-cover"
            />
          </span>

          <input
            type="tel"
            placeholder="3001234567"
            className="flex-1 px-4 py-2 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full bg-black text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-900 transition"
      >
        <span role="img" aria-label="lock"><RiSecurePaymentFill /></span> Continuar con tu pago
      </button>
    </form>
  );
};

export default UserInfoForm;
