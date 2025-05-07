import React, { useState } from "react";
import { Product } from "../models/Product";
import Modal from "../../transactions/components/formPayment/Modal";
import { useDispatch } from "react-redux";
import { UserInfoForm } from "../../transactions/components/formPayment/UserInfoForm";
import CardPaymentForm from "../../transactions/components/formPayment/CardPaymentForm";
import { resetPaymentData } from "../../transactions/redux/paymentSlice";
import { PaymentStepEnum } from "../../transactions/enums/PaymentStepEnum";
import SummaryPaymentComponent from "../../transactions/components/formPayment/SummaryPaymentComponent";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center space-y-4">
        <img
          src={product.urlImage}
          alt={product.title}
          className="w-40 h-40 object-contain rounded-lg"
        />
        <div className="text-sm text-gray-500">{product.category}</div>
        <div className="font-semibold text-center">{product.title}</div>
        <div className="text-lg font-bold">${product.price}</div>
        <p className="text-gray-600 text-sm text-center">
          {product.description}
        </p>
        <button 
          className="bg-black text-white py-2 px-4 rounded-full mt-2 w-full"
          onClick={() => setIsModalOpen(true)}>
          Pay with credit card
        </button>
      </div>

      <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            dispatch(resetPaymentData());
          }}
          title="Confirmar compra"
        >
          {(() => {
            let content;
            if (modalStep === PaymentStepEnum.USER_INFO) {
              content = (
                <div className="max-h-[70vh] overflow-y-auto p-4 w-full max-w-md mx-auto scrollbar-none">
                  <UserInfoForm onContinue={() => setModalStep(PaymentStepEnum.CARD_FORM)} onBack={() => setIsModalOpen(false)} />
                </div>
              );
            } else if (modalStep === PaymentStepEnum.CARD_FORM) {
              content = (
                <div className="max-h-[70vh] overflow-y-auto p-4 w-full max-w-md mx-auto">
                  <CardPaymentForm onContinue={() => setModalStep(PaymentStepEnum.SUMMARY)} onBack={() => setModalStep(PaymentStepEnum.USER_INFO)} />
                </div>
              );
            } else if (modalStep === PaymentStepEnum.SUMMARY) {
              content = (
                <div className="max-h-[70vh] overflow-y-auto p-4 w-full max-w-md mx-auto">
                  {/* <h2 className="text-lg font-semibold text-black">Resumen de tu pago</h2> */}
                  <SummaryPaymentComponent onBack={() => setModalStep(PaymentStepEnum.CARD_FORM)} onPay={() => {}} />
                </div>
              );          
            }
            return content;
          })()}
      </Modal>
    </>
  );
};

export default ProductCard;
