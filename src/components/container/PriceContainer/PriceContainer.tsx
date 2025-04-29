import "./PriceContainer.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import {
  EMPTY_PRICE_DECIMAL_STRING,
  PRICE_SECTION_DIVISOR_TEXT,
} from "@/globals/constants/constants.ts";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";

export interface PriceContainerProps {
  priceType: string;
  priceAmount: string;
}

const PriceContainer: React.FC<PriceContainerProps> = ({
  priceType,
  priceAmount,
}: PriceContainerProps): ReactElement => {
  return (
    <div className="priceContainer">
      <div className="priceContainerSection">
        <Label type={LabelTypeEnum.PRICE_SECTION_LABEL} text={priceType} />
        <Label
          type={LabelTypeEnum.PRICE_SECTION_DIVISOR_LABEL}
          text={PRICE_SECTION_DIVISOR_TEXT}
        />
      </div>
      <Label
        type={LabelTypeEnum.PRICE_LABEL}
        text={priceAmount.length ? priceAmount : EMPTY_PRICE_DECIMAL_STRING}
      />
    </div>
  );
};

export default PriceContainer;
