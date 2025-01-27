const InputErrorMessage = ({
  error,
  message,
}: {
  error?: boolean;
  message?: string;
}) => {
  if (!error) return null;
  return (
    <p
      data-testid="input-error"
      className="absolute left-0.5 flex mt-1 text-xs font-medium text-red-600 -bottom-5"
    >
      {message}
    </p>
  );
};

export default InputErrorMessage;
