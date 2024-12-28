const InputErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="flex text-xs font-medium text-red-600">{message}</p>;
};

export default InputErrorMessage;
