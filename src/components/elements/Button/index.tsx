import clsx from "clsx";

interface ButtonType {
  type: "button" | "submit" | "reset";
  children?: any;
  onClick?: () => void;
  className?: string;
  value?: string;
  disabled?: boolean;
}

function Button(props: ButtonType) {
  const { className, children, type, onClick = () => {}, disabled } = props;
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "bg-secondary flex items-center gap-x-2 rounded text-center",
        className,
      )}
    >
      <p>{children}</p>
    </button>
  );
}

export default Button;
