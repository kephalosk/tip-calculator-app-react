import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setTipValue } from "@/redux/slices/tipSlice.ts";
import { TipItem } from "@/globals/constants/TipItems.ts";
import { Dispatch } from "@reduxjs/toolkit";

export const useTipItems = (
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

  return { tipItems, handleTipItemClick, triggerReset, deactivateAllItems };
};
