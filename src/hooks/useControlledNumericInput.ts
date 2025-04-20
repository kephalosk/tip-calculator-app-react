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

  const removePercentageSign = useCallback((value: string): string => {
    return value.replace("%", "");
  }, []);

  const handleInputChange: (newValue: string) => void = useCallback(
    (newValue: string): void => {
      const rawValue: string = removePercentageSign(newValue);

      if (
        parseFloat(rawValue) === 0 &&
        rawValue !== "0." &&
        rawValue !== "0.0" &&
        rawValue !== "0.00"
      ) {
        setValue("0");
        propagateValue(0);
        return;
      }

      if (rawValue === "" || parseFloat(rawValue) === 0) {
        setValue(rawValue);
        propagateValue(0);
        return;
      }

      if (!validateInput(rawValue)) {
        return;
      }

      setValue(rawValue);

      const parsed: number = parseFloat(rawValue);
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
