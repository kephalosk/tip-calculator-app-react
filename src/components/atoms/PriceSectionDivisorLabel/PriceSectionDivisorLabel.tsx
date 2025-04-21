import "./PriceSectionDivisorLabel.scss";
import React, { ReactElement } from "react";
import {
  LABEL_TEXT_EMPTY_MESSAGE,
  PRICE_SECTION_DEVISOR_PREFIX,
} from "@/globals/constants/constants.ts";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
}

const PriceSectionDivisorLabel: React.FC<Props> = React.memo(
  ({ text = "" }: Props): ReactElement => {
    if (!text && process.env.NODE_ENV === "development") {
      console.warn(LABEL_TEXT_EMPTY_MESSAGE);
    }

    return (
      <label
        className="priceSectionDivisorLabel"
        aria-label={`${PRICE_SECTION_DEVISOR_PREFIX} ${text}`}
      >
        {`${PRICE_SECTION_DEVISOR_PREFIX} ${text}`}
      </label>
    );
  },
);

export default PriceSectionDivisorLabel;
