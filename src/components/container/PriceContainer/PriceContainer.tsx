import "./PriceContainer.scss";
import { ReactElement } from "react";
import PriceLabel from "@/components/atoms/PriceLabel/PriceLabel.tsx";
import PriceSectionLabel from "@/components/atoms/PriceSectionLabel/PriceSectionLabel.tsx";
import PriceSectionDivisorLabel from "@/components/atoms/PriceSectionDivisorLabel/PriceSectionDivisorLabel.tsx";
import { PRICE_SECTION_DIVISOR_TEXT } from "@/globals/constants/constants.ts";

export interface PriceContainerProps {
  priceType: string;
  priceAmount: string;
}

const PriceContainer: ({
  priceType,
  priceAmount,
}: PriceContainerProps) => ReactElement = ({
  priceType,
  priceAmount,
}: PriceContainerProps): ReactElement => {
  return (
    <div className="priceContainer">
      <div className="priceContainerSection">
        <PriceSectionLabel text={priceType} />
        <PriceSectionDivisorLabel text={PRICE_SECTION_DIVISOR_TEXT} />
      </div>
      <PriceLabel text={priceAmount} />
    </div>
  );
};

export default PriceContainer;
