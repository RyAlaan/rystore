import clsx from "clsx";

interface ButtonType {
  type: "button" | "submit" | "reset";
  children?: any;
  onClick?: () => void; // Corrected the function type
  className?: string;
}

function Button(props: ButtonType) {
  const { className, children, type, onClick = () => {} } = props;
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
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
