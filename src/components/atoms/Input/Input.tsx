import "./Input.scss";
import React, { ReactElement } from "react";
import useControlledNumericInput from "@/hooks/useControlledNumericInput";
import clsx from "clsx";
import { useCursorPositionInCaseOfPercentage } from "@/hooks/useCursorPositionInCaseOfPercentage.ts";
import useInputReset from "@/hooks/redux/useInputReset.ts";

export interface InputProps {
  id: string;
  name: string;
  maxValue: number;
  propagateValue: (
    newValue: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  placeholder?: string;
  allowDecimals?: boolean;
  hasError?: boolean;
  withPercentageSign?: boolean;
  triggerReset?: boolean;
}

const Input: React.FC<InputProps> = React.memo(
  ({
    id,
    name,
    maxValue,
    propagateValue,
    placeholder = "",
    allowDecimals = false,
    hasError = false,
    withPercentageSign = false,
    triggerReset = false,
  }: InputProps): ReactElement => {
    const { value, handleInputChange } = useControlledNumericInput({
      maxValue,
      propagateValue,
      allowDecimals,
    });
    const { inputRef, handleCursorPosition } =
      useCursorPositionInCaseOfPercentage(withPercentageSign);
    useInputReset(triggerReset, handleInputChange);

    return (
      <input
        ref={inputRef}
        id={id}
        name={name}
        className={clsx("input", { error: hasError })}
        type="text"
        value={withPercentageSign && !!value ? `${value}%` : value}
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event.target.value, event)
        }
        onInput={(event: React.FormEvent<HTMLInputElement>) =>
          handleCursorPosition((event.target as HTMLInputElement).value)
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
