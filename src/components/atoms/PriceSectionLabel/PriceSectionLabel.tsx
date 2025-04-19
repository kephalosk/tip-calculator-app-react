import "./PriceSectionLabel.scss";
import React, { ReactElement } from "react";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text: string;
}

const PriceSectionLabel: React.FC<Props> = React.memo(
  ({ text = "" }: Props): ReactElement => {
    if (!text && process.env.NODE_ENV === "development") {
      console.warn("Label text is empty!");
    }

    return (
      <label className="priceSectionLabel" aria-label={text}>
        {text}
      </label>
    );
  },
);

export default PriceSectionLabel;
