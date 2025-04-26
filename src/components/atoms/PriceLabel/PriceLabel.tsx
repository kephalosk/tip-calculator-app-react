import "./PriceLabel.scss";
import React, { ReactElement } from "react";
import { EMPTY_PRICE_DECIMAL_STRING } from "@/globals/constants/constants.ts";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
}

const PriceLabel: React.FC<Props> = React.memo(
  ({ text = EMPTY_PRICE_DECIMAL_STRING }: Props): ReactElement => {
    if (!text && process.env.NODE_ENV === "development") {
      console.warn("Label text is empty!");
    }

    return (
      <label className="priceLabel" aria-label={`$${text}`}>
        ${text}
      </label>
    );
  },
);

export default PriceLabel;
