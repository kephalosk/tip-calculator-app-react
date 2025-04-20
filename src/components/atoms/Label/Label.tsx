import "./Label.scss";
import React, { ReactElement } from "react";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
}

const Label: React.FC<Props> = React.memo(
  ({ text = "" }: Props): ReactElement => {
    if (!text && process.env.NODE_ENV === "development") {
      console.warn("Label text is empty!");
    }

    return (
      <label className="label" aria-label={text}>
        {text}
      </label>
    );
  },
);

export default Label;
