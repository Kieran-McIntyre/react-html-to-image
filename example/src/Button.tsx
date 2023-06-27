import classNames from "classnames";
import { LoadingSpinner } from "@example/LoadingSpinner";

export type ButtonProps = {
  loading?: boolean;
  label?: string;
  onClick?: () => void;
}

export const Button = ({
  loading = false,
  label,
  onClick,
}: ButtonProps) => {
  const buttonClasses = classNames({
    "select-none inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600": true,
    "hover:bg-indigo-500": !loading,
    "pointer-events-none opacity-50": loading,
  });

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
    >
      {label}

      {loading && (
        <LoadingSpinner className="ml-2" />
      )}
    </button>
  );
};