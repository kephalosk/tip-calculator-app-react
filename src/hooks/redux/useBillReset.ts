import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

export const selectBillValue = (state: RootState) => state.bill.value;

export const useBillReset = (): {
  triggerReset: boolean;
} => {
  const [triggerReset, setTriggerReset] = useState<boolean>(false);

  const billAmount: number = useSelector(selectBillValue);

  useEffect((): void => {
    if (billAmount === 0) {
      setTriggerReset((prevState: boolean) => !prevState);
    }
  }, [billAmount]);

  return {
    triggerReset,
  };
};
