import clsx from "clsx";
import styles from "./from.module.css";
import { formType } from "@/types/fromType";
import React, { useState } from "react";

const Form = (props: formType) => {
  const { type, className, required, label, name  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={clsx(styles.inputBox, className)}>
      <input
        type={type}
        className={clsx(styles.inputField, { [styles.focused]: isFocused })}
        required={required}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label className={clsx(styles.label, { [styles.focused]: isFocused })}>
        {label}
      </label>
    </div>
  );
};

export default Form;
