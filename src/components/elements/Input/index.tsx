import clsx from "clsx";
import { type } from "os";

interface InputType {
  type: "text" | "email" | "password";
  placeholder: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name ? : string
}

const Input = (props : InputType) => {
  const { type, placeholder, className, onChange, name } = props;
  return (
    <input
      type={type}
      name={name}
      className={clsx("text-primary flex px-2 py-1 rounded", className)}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;