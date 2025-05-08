const Transaction = ({ status = 'processing' }) => {
  
  const getColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      {status === 'processing' && (
        <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      )}
      <div className={`font-semibold text-lg ${getColor()}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
};

export default Transaction;