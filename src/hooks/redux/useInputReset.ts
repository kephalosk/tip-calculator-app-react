import { useEffect } from "react";

export const useInputReset = (
  triggerReset: boolean,
  handleInputChange: (value: string) => void,
): void => {
  useEffect((): void => {
    handleInputChange("");
  }, [triggerReset]);
};
