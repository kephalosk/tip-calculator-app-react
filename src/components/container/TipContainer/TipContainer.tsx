import "./TipContainer.scss";
import { ReactElement } from "react";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import {
  TIP_INPUT_ID,
  TIP_INPUT_NAME,
  TIP_INPUT_PLACEHOLDER,
  TIP_LABEL,
} from "@/globals/constants.ts";
import TipFieldLabel from "@/components/atoms/TipFieldLabel/TipFieldLabel.tsx";
import Input, { InputProps } from "@/components/atoms/Input/Input.tsx";
import { TIP_INPUT_MAX_VALUE } from "@/globals/config.ts";

const TipContainer: () => ReactElement = (): ReactElement => {
  const inputProps: InputProps = {
    allowDecimals: true,
    id: TIP_INPUT_ID,
    name: TIP_INPUT_NAME,
    maxValue: TIP_INPUT_MAX_VALUE,
    propagateValue: () => {},
    placeholder: TIP_INPUT_PLACEHOLDER,
    withPercentageSign: true,
  };
  return (
    <div className="tipContainer">
      <HeadlineLabel text={TIP_LABEL} />
      <div className="tipContainerGrid">
        <TipFieldLabel text="5%" isActive={false} propagateChange={() => {}} />
        <TipFieldLabel text="10%" isActive={false} propagateChange={() => {}} />
        <TipFieldLabel text="15%" isActive={false} propagateChange={() => {}} />
        <TipFieldLabel text="25%" isActive={false} propagateChange={() => {}} />
        <TipFieldLabel text="50%" isActive={false} propagateChange={() => {}} />
        <Input {...inputProps} />
      </div>
    </div>
  );
};

export default TipContainer;
