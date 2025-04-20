import React, { useCallback, useMemo, useState } from "react";

interface UseControlledNumericInputProps {
  maxValue: number;
  propagateValue: (
    value: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  allowDecimals?: boolean;
}

const useControlledNumericInput = ({
  maxValue,
  propagateValue,
  allowDecimals = false,
}: UseControlledNumericInputProps): {
  value: string;
  handleInputChange: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} => {
  const [value, setValue] = useState("");

  const decimalWithMax2Digits: RegExp = useMemo((): RegExp => {
    return /^\d+(\.\d{1,2})?$|^\d+\.$/;
  }, []);
  const wholeNumber: RegExp = useMemo((): RegExp => {
    return /^\d*$/;
  }, []);

  const validateInput: (input: string) => boolean = useCallback(
    (input: string): boolean => {
      const regex: RegExp = allowDecimals ? decimalWithMax2Digits : wholeNumber;

      return regex.test(input);
    },
    [allowDecimals, decimalWithMax2Digits, wholeNumber],
  );

  const removePercentageSign = useCallback((value: string): string => {
    return value.replace("%", "");
  }, []);

  const hasValueEndingPoint = useCallback((value: string): boolean => {
    return /^[0-9]+\.$/.test(value);
  }, []);

  const removeLeadingZerosFromDecimal = useCallback((value: string): string => {
    return value.replace(/^0+(?=\d)/, "");
  }, []);

  const removeLeadingZeros = useCallback(
    (value: string): string => {
      if (value === "0" || value === "0.") {
        return value;
      }

      if (hasValueEndingPoint(value)) {
        return value;
      }

      if (value.includes(".")) {
        return removeLeadingZerosFromDecimal(value);
      }

      if (value === "") {
        return value;
      }

      return value.replace(/^0+/, "") || "0";
    },
    [hasValueEndingPoint],
  );

  const handleInputChange: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void = useCallback(
    (newValue: string, event?: React.ChangeEvent<HTMLInputElement>): void => {
      const rawValue: string = removePercentageSign(newValue);
      const rawValueWithoutLeadingZeros: string = removeLeadingZeros(rawValue);

      if (
        parseFloat(rawValueWithoutLeadingZeros) === 0 &&
        rawValueWithoutLeadingZeros !== "0." &&
        rawValueWithoutLeadingZeros !== "0.0" &&
        rawValueWithoutLeadingZeros !== "0.00"
      ) {
        setValue("0");
        propagateValue(0, event);
        return;
      }

      if (
        rawValueWithoutLeadingZeros === "" ||
        parseFloat(rawValueWithoutLeadingZeros) === 0
      ) {
        setValue(rawValueWithoutLeadingZeros);
        propagateValue(0, event);
        return;
      }

      if (!validateInput(rawValueWithoutLeadingZeros)) {
        return;
      }

      setValue(rawValueWithoutLeadingZeros);

      const parsed: number = parseFloat(rawValueWithoutLeadingZeros);
      if (parsed >= maxValue) {
        setValue(maxValue.toString());
        propagateValue(maxValue, event);
      } else {
        propagateValue(parsed, event);
      }
    },
    [
      removePercentageSign,
      removeLeadingZeros,
      validateInput,
      maxValue,
      propagateValue,
    ],
  );

  return {
    value,
    handleInputChange,
  };
};

export default useControlledNumericInput;
