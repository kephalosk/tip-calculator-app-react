import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

export const selectPeopleValue = (state: RootState) => state.people.value;

export const usePeopleReset = (): {
  triggerReset: boolean;
} => {
  const [triggerReset, setTriggerReset] = useState<boolean>(false);

  const peopleAmount: number = useSelector(selectPeopleValue);

  useEffect((): void => {
    if (peopleAmount <= 0) {
      setTriggerReset((prevState: boolean) => !prevState);
    }
  }, [peopleAmount]);

  return {
    triggerReset,
  };
};
