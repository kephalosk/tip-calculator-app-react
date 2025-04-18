import "./Input.scss";
import React, { ReactElement } from "react";
import useControlledNumericInput from "@/hooks/useControlledNumericInput";
import clsx from "clsx";

interface Props {
  id: string;
  name: string;
  maxValue: number;
  propagateValue: (newValue: number) => void;
  placeholder?: string;
  allowDecimals?: boolean;
  hasError?: boolean;
}

const Input: React.FC<Props> = React.memo(
  ({
    id,
    name,
    maxValue,
    propagateValue,
    placeholder = "",
    allowDecimals = false,
    hasError = false,
  }: Props): ReactElement => {
    const { value, handleInputChange } = useControlledNumericInput({
      maxValue,
      propagateValue,
      allowDecimals,
    });

    return (
      <input
        id={id}
        name={name}
        className={clsx("input", { error: hasError })}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event.target.value)
        }
        inputMode="decimal"
        pattern={allowDecimals ? "^\\d+(\\.\\d{0,2})?$" : "^\\d*$"}
        aria-label={placeholder ? undefined : `Input field for ${name}`}
        aria-invalid={hasError}
        autoComplete="off"
      />
    );
  },
);

export default Input;
