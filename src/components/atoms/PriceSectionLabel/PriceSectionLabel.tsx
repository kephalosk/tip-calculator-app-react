import "./PriceSectionLabel.scss";
import React, { ReactElement } from "react";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";
import {
  EMPTY_PRICE_SECTION_LABEL_TEXT,
  EMPTY_STRING,
} from "@/globals/constants/constants.ts";

export interface PriceSectionLabelProps
  extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
}

const PriceSectionLabel: React.FC<PriceSectionLabelProps> = React.memo(
  ({ text = EMPTY_STRING }: PriceSectionLabelProps): ReactElement => {
    useWarnIfEmptyText(text);

    return (
      <label
        className="priceSectionLabel"
        aria-label={
          text === EMPTY_STRING ? EMPTY_PRICE_SECTION_LABEL_TEXT : text
        }
      >
        {text}
      </label>
    );
  },
);

export default PriceSectionLabel;
