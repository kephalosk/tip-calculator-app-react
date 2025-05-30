import "./TipContainer.scss";
import React, { ReactElement } from "react";
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
import useTipItems from "@/hooks/redux/useTipItems.ts";
import useInputValue from "@/hooks/redux/useInputValue.ts";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import Label from "@/components/atoms/Label/Label.tsx";

const TipContainer: () => ReactElement = (): ReactElement => {
  const { tipItems, handleTipItemClick, triggerReset, deactivateAllItems } =
    useTipItems(TipItems);
  const { handleInputChange } = useInputValue(deactivateAllItems);

  const inputProps: InputProps = {
    id: TIP_INPUT_ID,
    name: TIP_INPUT_NAME,
    maxValue: TIP_INPUT_MAX_VALUE,
    propagateValue: (
      value: number,
      event?: React.ChangeEvent<HTMLInputElement>,
    ) => handleInputChange(value / 100, event),
    placeholder: TIP_INPUT_PLACEHOLDER,
    allowDecimals: true,
    withPercentageSign: true,
    triggerReset,
  };

  return (
    <div className="tipContainer">
      <Label type={LabelTypeEnum.HEADLINE_LABEL} text={TIP_LABEL} />
      <div className="tipContainerGrid">
        {tipItems.map((item: TipItem, index: number) => (
          <TipFieldLabel
            key={index}
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
