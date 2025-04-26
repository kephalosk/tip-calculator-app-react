import { AppDispatch } from "@/redux/store.ts";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { resetBillValue } from "@/redux/slices/billSlice.ts";
import { resetPeopleValue } from "@/redux/slices/peopleSlice.ts";
import { resetTipValue } from "@/redux/slices/tipSlice.ts";

export const useResetFields = (): (() => void) => {
  const dispatch: AppDispatch = useDispatch();

  return useCallback(() => {
    dispatch(resetBillValue());
    dispatch(resetTipValue());
    dispatch(resetPeopleValue());
  }, [dispatch]);
};
