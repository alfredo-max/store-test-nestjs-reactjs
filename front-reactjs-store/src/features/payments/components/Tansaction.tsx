import { FaExclamationCircle } from "react-icons/fa";
import { PaymentStatusEnum } from "../enums/PaymentStatusEnum";
import { usePayment } from "../hooks/usePayment";

interface TransactionProps {
  onRetry: () => void;
}

const Transaction: React.FC<TransactionProps> = ({ onRetry }) => {

  const { paymentStatus, error } = usePayment();

  const getColor = () => {
    switch (paymentStatus) {
      case PaymentStatusEnum.APPROVED:
        return 'text-green-600';
      case PaymentStatusEnum.ERROR:
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case PaymentStatusEnum.PENDING:
        return (
          <div>
            <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            <div className={`font-semibold text-lg ${getColor()}`}>
              Procesando...
            </div>
          </div>
        );

      case PaymentStatusEnum.APPROVED:
        return (
          <div className={`font-semibold text-lg ${getColor()}`}>
            ¡Pago completado con éxito!
          </div>
        );

      case PaymentStatusEnum.ERROR:
        return (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded text-center max-w-md">
            <div className="flex flex-col items-center space-y-2">
              <FaExclamationCircle className="text-red-500 text-3xl" />
              <span className="font-semibold">
                Lo sentimos, ocurrió un error al procesar tu pago.
              </span>
              <span className="text-sm">
                Por favor, verifica los datos o intenta nuevamente.
              </span>

              {/* Mostrar el mensaje de error si existe */}
              {error && (
                <span className="text-xs text-gray-600 italic">
                  {error}
                </span>
              )}

              {onRetry && (
                <button
                  onClick={onRetry}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reintentar
                </button>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded text-center max-w-md">
            <div className="flex flex-col items-center space-y-2">
              <FaExclamationCircle className="text-red-500 text-3xl" />
              <span className="font-semibold">
                Estado de pago desconocido: {paymentStatus}
              </span>
              <span className="text-sm">Por favor, comunícate con soporte.</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      {renderPaymentStatus()}
    </div>
  );


};

export default Transaction;
