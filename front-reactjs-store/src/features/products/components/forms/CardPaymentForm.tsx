import React from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaArrowLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
  onBack: () => void;
}

const CardPaymentForm: React.FC<Props> = ({ onBack }) => {
  return (
    <form className="space-y-6 text-sm text-gray-800">
      <div className="flex items-center gap-2">
              <FaArrowLeft className="text-yellow-400" onClick={onBack}/>
              <span className="text-black">💳</span> Paga con tu tarjeta
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Aceptamos</p>
        <div className="flex items-center gap-4">
          <FaCcMastercard className="text-3xl text-red-600" />
          <FaCcVisa className="text-3xl text-blue-700" />
          <FaCcAmex className="text-3xl text-blue-500" />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Número de la tarjeta</label>
        <input
          type="text"
          placeholder="•••• •••• •••• ••••"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-2">
          <label className="block mb-1 text-gray-600">Expira el</label>
          <div className="flex gap-2">
            <select className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none">
              <option>Mes</option>
            </select>
            <select className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none">
              <option>Año</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-gray-600 flex items-center gap-1">
            CVC
            <IoMdInformationCircleOutline className="text-gray-500" />
          </label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Nombre en la tarjeta</label>
        <input
          type="text"
          placeholder="Como aparece en la tarjeta"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Identificación del tarjetahabiente</label>
        <div className="flex gap-2">
          <select className="w-1/3 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none">
            <option>Tipo</option>
            <option>CC</option>
            <option>CE</option>
            <option>TI</option>
          </select>
          <input
            type="text"
            placeholder="Ingresa tu documento"
            className="w-2/3 px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Número de cuotas</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      <div className="flex items-start gap-2">
        <input type="checkbox" className="mt-1" />
        <label className="text-sm text-gray-600">
          Acepto haber leído los{" "}
          <span className="font-semibold underline">términos y condiciones</span> y la{" "}
          <span className="font-semibold underline">política de privacidad</span> para hacer este pago.
        </label>
      </div>
    </form>
  );
};

export default CardPaymentForm;
