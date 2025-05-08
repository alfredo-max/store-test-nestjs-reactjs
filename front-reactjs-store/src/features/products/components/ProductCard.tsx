import React, { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Modal from "../../payments/components/Modal";
import { useDispatch } from "react-redux";
import { UserInfoForm } from "../../payments/components/UserInfoForm";
import CardPaymentForm from "../../payments/components/CardPaymentForm";
import { resetPaymentData } from "../../payments/redux/slices/slices/formPaymentSlice";
import { PaymentStepEnum } from "../../payments/enums/PaymentStepEnum";
import { resetSelectedProduct, setSelectedProduct } from "../redux/slices/selectedProductPaymentSlice";
import SummaryPaymentComponent from "../../payments/components/SummaryPaymentComponent";
import PaymentFlow from "../../payments/components/PaymentFlow";


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalStep(PaymentStepEnum.USER_INFO);
  }, []);

  const handlePayClick = () => {
    dispatch(setSelectedProduct(product));
    setIsModalOpen(true);
  };
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
          onClick={() => handlePayClick()}>
          Pay with credit card
        </button>
      </div>

      <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            dispatch(resetPaymentData());
            dispatch(resetSelectedProduct())
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
                  <SummaryPaymentComponent onBack={() => setModalStep(PaymentStepEnum.CARD_FORM)} onContinue={() => setModalStep(PaymentStepEnum.PAYMENT)}/>
                </div>
              );          
            }else if (modalStep === PaymentStepEnum.PAYMENT) {
              content = (
                <div className="max-h-[70vh] overflow-y-auto p-4 w-full max-w-md mx-auto">
                  <PaymentFlow onRetry={() => setModalStep(PaymentStepEnum.USER_INFO)}></PaymentFlow>
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
