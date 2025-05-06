import { useForm } from "react-hook-form";
import { FaCcVisa, FaCcMastercard, FaArrowLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { setCardInfo } from "../../../payments/redux/paymentSlice";

interface Props {
  onBack: () => void;
}

interface CardFormData {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  nameOnCard: string;
  idType: string;
  idNumber: string;
  installments: string;
  acceptedTerms: boolean;
  acceptedDataPolicy: boolean;
}


const CardPaymentForm: React.FC<Props> = ({ onBack }) => {
  const userInfo = useSelector((state: RootState) => state.payment.userInfo);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>();


  const onSubmit = (data: CardFormData) => {
    dispatch(setCardInfo(data));
    console.log("Información del usuario:", userInfo);
    console.log("Formulario:", data);
    alert("Pago procesado correctamente ✅");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm text-gray-800">
      <div className="flex items-center gap-2">
        <FaArrowLeft className="text-yellow-400 cursor-pointer" onClick={onBack} />
        <span className="text-black">💳</span> Paga con tu tarjeta
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Aceptamos</p>
        <div className="flex items-center gap-4">
          <FaCcMastercard className="text-3xl text-red-600" />
          <FaCcVisa className="text-3xl text-blue-700" />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Número de la tarjeta</label>
        <input
          type="text"
          {...register("cardNumber", {
            required: "El número es obligatorio",
            minLength: { value: 16, message: "Debe tener al menos 16 dígitos" },
            maxLength: { value: 19, message: "Máximo 19 dígitos" },
            pattern: { value: /^\d+$/, message: "Solo se permiten números" },
          })}
          placeholder="•••• •••• •••• ••••"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
        />
         {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex-2 w-2/3">
          <label className="block mb-1 text-gray-600">Expira el</label>
          <div className="flex gap-2">
            <select
              {...register("expMonth", { required: "El mes es obligatorio" })}
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
              {...register("expYear", { required: "El año es obligatorio" })}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
            >
              <option value="">Año</option>
              {[...Array(10)].map((_, i) => {
                const year = new Date().getFullYear() + i;
                return <option key={i} value={year}>{year}</option>;
              })}
            </select>
          </div>
          {errors.expYear && <p className="text-red-500 text-xs mt-1">{errors.expYear.message}</p>}
          {errors.expMonth && <p className="text-red-500 text-xs mt-1">{errors.expMonth.message}</p>}
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-gray-600 flex items-center gap-1">
            CVC <IoMdInformationCircleOutline className="text-gray-500" />
          </label>
          <input
            type="text"
            {...register("cvc", { required: "El CVC es obligatorio" })}
            placeholder="123"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          />
          {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc.message}</p>}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Nombre en la tarjeta</label>
        <input
          type="text"
          {...register("nameOnCard", { required: "El nombre es obligatorio" })}
          placeholder="Como aparece en la tarjeta"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
        />
        {errors.nameOnCard && <p className="text-red-500 text-xs mt-1">{errors.nameOnCard.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Identificación del tarjetahabiente</label>
        <div className="flex gap-2">
          <select
            {...register("idType", { required: "El tipo de documento es obligatorio" })}
            className="w-1/3 px-3 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          >
            <option value="">Tipo</option>
            <option value="CC">CC</option>
            <option value="CE">CE</option>
            <option value="TI">TI</option>
          </select>
          <input
            type="text"
            {...register("idNumber", { required: "El número de documento es obligatorio" })}
            placeholder="Ingresa tu documento"
            className="w-2/3 px-4 py-2 border border-gray-300 rounded focus:ring-yellow-400 focus:outline-none"
          />
        </div>
        {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType.message}</p>}
        {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Número de cuotas</label>
        <select
          {...register("installments")}
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
          {...register("acceptedTerms", { required: "Debe aceptar los terminos de politica de privacidad" })}
          className="mt-1"
        />
        <label className="text-sm text-gray-600">
          Acepto haber leído los{" "}
          <span className="font-semibold underline">reglamentos</span> y la{" "}
          <span className="font-semibold underline">política de privacidad</span>.
        </label>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          {...register("acceptedDataPolicy", { required: "Debe aceptar la política de datos personales" })}
          className="mt-1"
        />
        <label className="text-sm text-gray-600">
          Acepto la{" "}
          <span className="font-semibold underline">
            autorización para la administración de datos personales
          </span>.
        </label>
      </div>
      {errors.acceptedTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptedTerms.message}</p>}
      {errors.acceptedDataPolicy && <p className="text-red-500 text-xs mt-1">{errors.acceptedDataPolicy.message}</p>}
      
      {Object.keys(errors).length > 0 && (
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
          Por favor, verifique los datos ingresados.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-900 transition"
      >
        💰 Pagar
      </button>
    </form>
  );
};

export default CardPaymentForm;
