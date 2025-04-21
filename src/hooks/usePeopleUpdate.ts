import { useState, useCallback } from "react";
import usePeople from "@/hooks/redux/usePeople.ts";

interface UsePeopleUpdate {
  hasError: boolean;
  handlePeopleUpdate: (newValue: number) => void;
}

const usePeopleUpdate = (): UsePeopleUpdate => {
  const { updatePeopleValue } = usePeople();
  const [hasError, setHasError] = useState<boolean>(false);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

  const handlePeopleUpdate = useCallback(
    (newValue: number): void => {
      if (isInitialRender) {
        setIsInitialRender(false);
        return;
      }

      if (newValue === 0) {
        setHasError(true);
      } else {
        setHasError(false);
      }
      updatePeopleValue(newValue);
    },
    [isInitialRender, updatePeopleValue],
  );

  return {
    hasError,
    handlePeopleUpdate,
  };
};

export default usePeopleUpdate;
