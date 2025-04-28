import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setTipValue } from "@/redux/slices/tipSlice.ts";
import { Dispatch } from "@reduxjs/toolkit";

const useInputValue = (
  deactivateAllItems: () => void,
): {
  handleInputChange: (
    value: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} => {
  const dispatch: Dispatch = useDispatch();

  const handleInputChange = useCallback(
    (value: number, event?: React.ChangeEvent<HTMLInputElement>) => {
      if (!event) return;

      deactivateAllItems();
      dispatch(setTipValue(value));
    },
    [dispatch, deactivateAllItems],
  );

  return { handleInputChange };
};

export default useInputValue;
