import React, { useState, useEffect } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaArrowLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
  onBack: () => void;
}

const CardPaymentForm: React.FC<Props> = ({ onBack }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [installments, setInstallments] = useState("1");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const handlePay = () => {
    if (
      !cardNumber ||
      !expMonth ||
      !expYear ||
      !cvc ||
      !nameOnCard ||
      !idType ||
      !idNumber ||
      !acceptedTerms
    ) {
      setError("Por favor, completa todos los campos y acepta los términos.");
      return;
    }
    setError("");
    alert("Pago procesado correctamente ✅");
  };

  useEffect(() => {
    if (
      cardNumber &&
      expMonth &&
      expYear &&
      cvc &&
      nameOnCard &&
      idType &&
      idNumber &&
      acceptedTerms
    ) {
      setError("");
    }
  }, [cardNumber, expMonth, expYear, cvc, nameOnCard, idType, idNumber, acceptedTerms]);

  return (
    <form className="space-y-6 text-sm text-gray-800">
      <div className="flex items-center gap-2">
        <FaArrowLeft className="text-yellow-400 cursor-pointer" onClick={onBack} />
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
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="•••• •••• •••• ••••"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-2">
          <label className="block mb-1 text-gray-600">Expira el</label>
          <div className="flex gap-2">
            <select
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
            >
              <option value="">Mes</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                  {(i + 1).toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
            >
              <option value="">Año</option>
              {[...Array(10)].map((_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={i} value={year}>{year}</option>
                );
              })}
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
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Nombre en la tarjeta</label>
        <input
          type="text"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="Como aparece en la tarjeta"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Identificación del tarjetahabiente</label>
        <div className="flex gap-2">
          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="w-1/3 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          >
            <option value="">Tipo</option>
            <option>CC</option>
            <option>CE</option>
            <option>TI</option>
          </select>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="Ingresa tu documento"
            className="w-2/3 px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Número de cuotas</label>
        <select
          value={installments}
          onChange={(e) => setInstallments(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-1"
        />
        <label className="text-sm text-gray-600">
          Acepto haber leído los{" "}
          <span className="font-semibold underline">términos y condiciones</span> y la{" "}
          <span className="font-semibold underline">política de privacidad</span> para hacer este pago.
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handlePay}
        className="w-full bg-black text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-900 transition"
      >
        💰 Pagar
      </button>
    </form>
  );
};

export default CardPaymentForm;
