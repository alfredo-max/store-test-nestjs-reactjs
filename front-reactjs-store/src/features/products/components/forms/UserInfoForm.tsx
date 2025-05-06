import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../payments/redux/paymentSlice";
import { RootState } from "../../../../app/store";

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

type FormData = {
  email: string;
  name: string;
  phone: string;
};

export const UserInfoForm: React.FC<Props> = ({ onContinue, onBack }) => {
  const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormData>();
  const userInfo = useSelector((state: RootState) => state.payment.userInfo);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (userInfo) {
      setValue("email", userInfo.email);
      setValue("name", userInfo.name);
      setValue("phone", userInfo.phone);
    }
  }, [userInfo, setValue]);
  
  const onSubmit = (data: FormData) => {
    dispatch(setUserInfo(data));
    onContinue();
  };

  return (
    <form className="space-y-6 text-sm text-gray-800" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-2">
        <FaArrowLeft className="text-yellow-400 cursor-pointer" onClick={onBack} />
        <h2 className="text-lg font-semibold text-black">Ingresa tus datos</h2>
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Correo electrónico</label>
        <input
          type="email"
          {...register("email", { required: "El correo es obligatorio" })}
          placeholder="correo@ejemplo.com"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Nombres y Apellidos</label>
        <input
          type="text"
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="Nombre completo"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
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
            {...register("phone", { required: "El número es obligatorio" })}
            placeholder="3001234567"
            className="flex-1 px-4 py-2 focus:outline-none"
          />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-900 transition"
      >
        <span role="img" aria-label="lock"><RiSecurePaymentFill /></span> Continuar con tu pago
      </button>
    </form>
  );
};