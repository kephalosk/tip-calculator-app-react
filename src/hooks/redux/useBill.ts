import { useDispatch } from "react-redux";
import { setBillValue } from "@/redux/slices/billSlice.ts";
import { Dispatch } from "@reduxjs/toolkit";
import { BILL_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { BILL_VALUE_INVALID } from "@/globals/constants/constants.ts";

const useBill = (): { updateBillValue: (value: number) => void } => {
  const dispatch: Dispatch = useDispatch();

  const updateBillValue = (update: number): void => {
    if (update < 0) {
      console.error(BILL_VALUE_INVALID);
      return;
    }

    if (update > BILL_INPUT_MAX_VALUE) {
      dispatch(setBillValue(BILL_INPUT_MAX_VALUE));
      return;
    }

    dispatch(setBillValue(update));
  };

  return {
    updateBillValue,
  };
};

export default useBill;
