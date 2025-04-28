import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTipValue } from "@/redux/slices/tipSlice.ts";
import { TipItem } from "@/globals/constants/TipItems.ts";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store.ts";

export const selectTipValue = (state: RootState) => state.tip.value;

const useTipItems = (
  initialItems: TipItem[],
): {
  handleTipItemClick: (selectedValue: number) => void;
  deactivateAllItems: () => void;
  tipItems: TipItem[];
  triggerReset: boolean;
} => {
  const dispatch: Dispatch = useDispatch();
  const [tipItems, setTipItems] = useState<TipItem[]>(initialItems);
  const [triggerReset, setTriggerReset] = useState<boolean>(false);

  const tipAmount: number = useSelector(selectTipValue);

  const handleTipItemClick = useCallback(
    (selectedValue: number): void => {
      setTipItems((prevItems: TipItem[]) =>
        prevItems.map(
          (item: TipItem): TipItem => ({
            ...item,
            isActive: item.value === selectedValue,
          }),
        ),
      );

      dispatch(setTipValue(selectedValue));
      setTriggerReset((prevState) => !prevState);
    },
    [dispatch],
  );

  const deactivateAllItems = useCallback((): void => {
    setTipItems((prevItems: TipItem[]) =>
      prevItems.map(
        (item: TipItem): TipItem => ({
          ...item,
          isActive: false,
        }),
      ),
    );
  }, []);

  useEffect((): void => {
    if (tipAmount === 0) {
      deactivateAllItems();
      setTriggerReset((prevState: boolean) => !prevState);
    }
  }, [deactivateAllItems, dispatch, tipAmount]);

  return { tipItems, handleTipItemClick, triggerReset, deactivateAllItems };
};

export default useTipItems;
