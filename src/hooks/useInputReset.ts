import { useEffect } from "react";

const useInputReset = (
  triggerReset: boolean,
  handleInputChange: (value: string) => void,
): void => {
  useEffect((): void => {
    handleInputChange("");
  }, [triggerReset]);
};

export default useInputReset;
