import { useCallback, useState } from "react";

interface UseControlledNumericInputProps {
  maxValue: number;
  propagateValue: (value: number) => void;
  allowDecimals?: boolean;
}

export const useControlledNumericInput = ({
  maxValue,
  propagateValue,
  allowDecimals = false,
}: UseControlledNumericInputProps): {
  value: string;
  handleInputChange: (newValue: string) => void;
} => {
  const [value, setValue] = useState("");

  const validateInput: (input: string) => boolean = useCallback(
    (input: string): boolean => {
      const regex: RegExp = allowDecimals ? /^\d+(\.\d{0,2})?$/ : /^\d*$/;

      return regex.test(input);
    },
    [allowDecimals],
  );

  const handleInputChange: (newValue: string) => void = useCallback(
    (newValue: string): void => {
      if (
        parseFloat(newValue) === 0 &&
        newValue !== "0." &&
        newValue !== "0.0" &&
        newValue !== "0.00"
      ) {
        setValue("0");
        propagateValue(0);
        return;
      }

      if (newValue === "" || parseFloat(newValue) === 0) {
        setValue(newValue);
        propagateValue(0);
        return;
      }

      if (!validateInput(newValue)) {
        return;
      }

      setValue(newValue);

      const parsed: number = parseFloat(newValue);
      if (parsed >= maxValue) {
        setValue(maxValue.toString());
        propagateValue(maxValue);
      } else {
        propagateValue(parsed);
      }
    },
    [validateInput, maxValue, propagateValue, allowDecimals],
  );

  return {
    value,
    handleInputChange,
  };
};

export default useControlledNumericInput;
