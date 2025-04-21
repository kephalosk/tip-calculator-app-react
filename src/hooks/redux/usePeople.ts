import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { PEOPLE_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { setPeopleValue } from "@/redux/slices/peopleSlice.ts";
import { PEOPLE_VALUE_INVALID } from "@/globals/constants/constants.ts";

const usePeople = (): { updatePeopleValue: (value: number) => void } => {
  const dispatch: Dispatch = useDispatch();

  const updatePeopleValue = (update: number): void => {
    if (update < 0) {
      console.error(PEOPLE_VALUE_INVALID);
      return;
    }

    if (update > PEOPLE_INPUT_MAX_VALUE) {
      dispatch(setPeopleValue(PEOPLE_INPUT_MAX_VALUE));
      return;
    }

    dispatch(setPeopleValue(update));
  };

  return {
    updatePeopleValue,
  };
};

export default usePeople;
