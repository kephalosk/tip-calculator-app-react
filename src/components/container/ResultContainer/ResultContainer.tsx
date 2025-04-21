import "./ResultContainer.scss";
import { ReactElement, useCallback, useEffect, useState } from "react";
import PriceContainer from "@/components/container/PriceContainer/PriceContainer.tsx";
import Button from "@/components/atoms/Button/Button.tsx";
import {
  BUTTON_TEXT_RESET,
  PRICE_SECTION_LABEL_TEXT_AMOUNT,
  PRICE_SECTION_LABEL_TEXT_TOTAL,
} from "@/globals/constants/constants.ts";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { resetBillValue } from "@/redux/slices/billSlice.ts";
import { resetTipValue } from "@/redux/slices/tipSlice.ts";
import { resetPeopleValue } from "@/redux/slices/peopleSlice.ts";

const selectTipValue = (state: RootState) => state.tip.tipValue;
const selectBillValue = (state: RootState) => state.bill.value;
const selectPeopleValue = (state: RootState) => state.people.value;

const ResultContainer = (): ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const [tipTotal, setTipTotal] = useState<string>("");
  const [totalSum, setTotalSum] = useState<string>("");

  const tipAmount: number = useSelector(selectTipValue);
  const billAmount: number = useSelector(selectBillValue);
  const peopleCount: number = useSelector(selectPeopleValue);

  useEffect(() => {
    if (billAmount && tipAmount && peopleCount > 0) {
      const calculatedTip: number = billAmount * (tipAmount / 100);
      const calculatedTipPerPerson: string = (
        calculatedTip / peopleCount
      ).toFixed(2);
      setTipTotal(calculatedTipPerPerson);

      const total: number = billAmount + calculatedTip;
      const totalPerPerson: string = (total / peopleCount).toFixed(2);
      setTotalSum(totalPerPerson);
    } else {
      setTipTotal("");
      setTotalSum("");
    }
  }, [billAmount, tipAmount, peopleCount]);

  const resetAllFields = useCallback((): void => {
    dispatch(resetBillValue());
    dispatch(resetTipValue());
    dispatch(resetPeopleValue());
  }, [dispatch]);

  return (
    <div className="resultContainer">
      <PriceContainer
        priceType={PRICE_SECTION_LABEL_TEXT_AMOUNT}
        priceAmount={tipTotal}
      />
      <div className="resultContainerSpace">
        <PriceContainer
          priceType={PRICE_SECTION_LABEL_TEXT_TOTAL}
          priceAmount={totalSum}
        />
      </div>
      <Button
        text={BUTTON_TEXT_RESET}
        handleButtonClick={resetAllFields}
        isDisabled={!(tipTotal && totalSum)}
      />
    </div>
  );
};

export default ResultContainer;
