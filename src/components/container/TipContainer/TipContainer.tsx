import "./TipContainer.scss";
import { ReactElement, useState } from "react";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import {
  TIP_INPUT_ID,
  TIP_INPUT_NAME,
  TIP_INPUT_PLACEHOLDER,
  TIP_LABEL,
} from "@/globals/constants/constants.ts";
import TipFieldLabel from "@/components/atoms/TipFieldLabel/TipFieldLabel.tsx";
import Input, { InputProps } from "@/components/atoms/Input/Input.tsx";
import { TIP_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { TipItem, TipItems } from "@/globals/constants/TipItems.ts";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTipValue } from "@/redux/slices/tipSlice.ts";

const TipContainer: () => ReactElement = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();

  const [tipItems, setTipItems] = useState<TipItem[]>(TipItems);

  const handleTipItemClick = (selectedValue: number): void => {
    setTipItems((prevItems: TipItem[]) =>
      prevItems.map(
        (item: TipItem): TipItem => ({
          ...item,
          isActive: item.value === selectedValue,
        }),
      ),
    );
    dispatch(setTipValue(selectedValue));
    //trigger input reset here
  };

  const handleInputChange = (value: number): void => {
    setTipItems((prevItems: TipItem[]) =>
      prevItems.map(
        (item: TipItem): TipItem => ({
          ...item,
          isActive: false,
        }),
      ),
    );
    dispatch(setTipValue(value));
  };

  const inputProps: InputProps = {
    allowDecimals: true,
    id: TIP_INPUT_ID,
    name: TIP_INPUT_NAME,
    maxValue: TIP_INPUT_MAX_VALUE,
    propagateValue: (value: number) => handleInputChange(value / 100),
    placeholder: TIP_INPUT_PLACEHOLDER,
    withPercentageSign: true,
    //define new function here to reset input value
  };
  return (
    <div className="tipContainer">
      <HeadlineLabel text={TIP_LABEL} />
      <div className="tipContainerGrid">
        {tipItems.map((item: TipItem) => (
          <TipFieldLabel
            key={item.text}
            text={item.text}
            isActive={item.isActive}
            propagateChange={() => handleTipItemClick(item.value)}
          />
        ))}
        <Input {...inputProps} />
      </div>
    </div>
  );
};

export default TipContainer;
