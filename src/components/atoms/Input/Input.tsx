import "./Input.scss";
import React, { ReactElement } from "react";
import { useControlledNumericInput } from "@/hooks/useControlledNumericInput";
import clsx from "clsx";
import { useCursorPositionInCaseOfPercentage } from "@/hooks/useCursorPositionInCaseOfPercentage.ts";
import { useInputReset } from "@/hooks/redux/useInputReset.ts";
import {
  INPUT_ARIA_LABEL_PREFIX,
  REGEXP_FOR_DECIMALS,
  REGEXP_FOR_WHOLE_NUMBERS,
} from "@/globals/constants/constants.ts";

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
        pattern={allowDecimals ? REGEXP_FOR_DECIMALS : REGEXP_FOR_WHOLE_NUMBERS}
        aria-label={
          placeholder ? undefined : `${INPUT_ARIA_LABEL_PREFIX}${name}`
        }
        aria-invalid={hasError}
        autoComplete="off"
      />
    );
  },
);

export default Input;
