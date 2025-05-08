import { FaExclamationCircle } from "react-icons/fa";
import { PaymentStatusEnum } from "../enums/PaymentStatusEnum";

interface TransactionProps {
  status: PaymentStatusEnum;
  onRetry: () => void;
}

const Transaction: React.FC<TransactionProps> = ({ status = PaymentStatusEnum.PENDING, onRetry }) => {
  const getColor = () => {
    switch (status) {
      case PaymentStatusEnum.APPROVED:
        return 'text-green-600';
      case PaymentStatusEnum.ERROR:
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      {status === PaymentStatusEnum.PENDING && (
        <div>
          <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          <div className={`font-semibold text-lg ${getColor()}`}>
            Procesando...
          </div>
        </div>
      )}

      {status === PaymentStatusEnum.APPROVED && (
        <div className={`font-semibold text-lg ${getColor()}`}>
          ¡Pago completado con éxito!
        </div>
      )}

      {status === PaymentStatusEnum.ERROR && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded text-center max-w-md">
          <div className="flex flex-col items-center space-y-2">
            <FaExclamationCircle className="text-red-500 text-3xl" />
            <span className="font-semibold">
              Lo sentimos, ocurrió un error al procesar tu pago.
            </span>
            <span className="text-sm">Por favor, verifica los datos o intenta nuevamente.</span>
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
      )}
    </div>
  );
};

export default Transaction;
