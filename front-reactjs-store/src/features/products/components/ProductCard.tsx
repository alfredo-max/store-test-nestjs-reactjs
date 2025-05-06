import React, { useState } from "react";
import { Product } from "../models/Product";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { resetPaymentData } from "../../payments/redux/paymentSlice";
import { UserInfoForm } from "./forms/UserInfoForm";
import CardPaymentForm from "./forms/CardPaymentForm";

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
          {modalStep === 1 ? (
             <div className="max-h-[70vh] overflow-y-auto p-4 w-full max-w-md mx-auto scrollbar-none">
                <UserInfoForm onContinue={() => setModalStep(2)} onBack={() => setIsModalOpen(false)} />
             </div>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto p-4 w-full max-w-md mx-auto">
              <CardPaymentForm onBack={() => setModalStep(1)} />
            </div>
          )}
      </Modal>
    </>
  );
};

export default ProductCard;
