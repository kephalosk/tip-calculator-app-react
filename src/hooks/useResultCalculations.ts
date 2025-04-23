import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import calculateTotalAndTip from "@/globals/helper/calculateTotalAndTip.ts";
import { EMPTY_STRING } from "@/globals/constants/constants.ts";

export const selectTipValue = (state: RootState) => state.tip.value;
export const selectBillValue = (state: RootState) => state.bill.value;
export const selectPeopleValue = (state: RootState) => state.people.value;

export const useResultCalculations = (): {
  tipTotal: string;
  totalSum: string;
} => {
  const [tipTotal, setTipTotal] = useState<string>("");
  const [totalSum, setTotalSum] = useState<string>("");

  const billAmount: number = useSelector(selectBillValue);
  const tipAmount: number = useSelector(selectTipValue);
  const peopleCount: number = useSelector(selectPeopleValue);

  useEffect((): void => {
    if (billAmount && tipAmount && peopleCount > 0) {
      const { tipTotal, totalSum } = calculateTotalAndTip(
        billAmount,
        tipAmount,
        peopleCount,
      );
      setTipTotal(tipTotal);
      setTotalSum(totalSum);
    } else {
      setTipTotal(EMPTY_STRING);
      setTotalSum(EMPTY_STRING);
    }
  }, [billAmount, tipAmount, peopleCount]);

  return { tipTotal, totalSum };
};
