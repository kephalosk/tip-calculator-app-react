import React, { useCallback, useRef } from "react";

const useCursorPositionInCaseOfPercentage = (
  withPercentageSign: boolean,
): {
  handleCursorPosition: (currentValue: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
} => {
  const inputRef: React.RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);

  const handleCursorPosition = useCallback(
    (currentValue: string): void => {
      if (!withPercentageSign) {
        return;
      }

      const rawCurrentValue: string = currentValue.replace("%", "");

      const cursorPosition: number = inputRef.current?.selectionStart || 0;

      if (inputRef.current && cursorPosition === rawCurrentValue.length) {
        setTimeout((): void => {
          inputRef.current?.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
      }
    },
    [withPercentageSign],
  );

  return {
    inputRef,
    handleCursorPosition,
  };
};

export default useCursorPositionInCaseOfPercentage;
