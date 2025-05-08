import { PaymentStatusEnum } from "../enums/PaymentStatusEnum";

interface TransactionProps {
  status: PaymentStatusEnum;
}

const Transaction: React.FC<TransactionProps> = ({ status = PaymentStatusEnum.PENDING }) => {
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
    <div className="flex flex-col items-center space-y-2 mt-4">
      {status === PaymentStatusEnum.PENDING && (
        <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      )}
      <div className={`font-semibold text-lg ${getColor()}`}>
        {status}
      </div>
    </div>
  );
};

export default Transaction;
