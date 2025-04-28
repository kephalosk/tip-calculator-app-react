import "./PriceLabel.scss";
import React, { ReactElement } from "react";
import {
  EMPTY_PRICE_DECIMAL_STRING,
  EMPTY_PRICE_LABEL_TEXT,
} from "@/globals/constants/constants.ts";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";

export interface PriceLabelProps extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
}

const PriceLabel: React.FC<PriceLabelProps> = React.memo(
  ({ text = EMPTY_PRICE_DECIMAL_STRING }: PriceLabelProps): ReactElement => {
    useWarnIfEmptyText(text);

    return (
      <label
        className="priceLabel"
        aria-label={
          text === EMPTY_PRICE_DECIMAL_STRING
            ? EMPTY_PRICE_LABEL_TEXT
            : `$${text}`
        }
      >
        ${text}
      </label>
    );
  },
);

export default PriceLabel;
