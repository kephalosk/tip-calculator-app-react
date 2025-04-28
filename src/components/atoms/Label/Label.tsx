import "./Label.scss";
import React, { ReactElement } from "react";
import { useWarnIfEmptyText } from "@/hooks/useWarnIfEmptyText.ts";
import {
  EMPTY_STRING,
  EMPTY_STRING_TEXT,
} from "@/globals/constants/constants.ts";

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
}

const Label: React.FC<LabelProps> = React.memo(
  ({ text = EMPTY_STRING }: LabelProps): ReactElement => {
    useWarnIfEmptyText(text);

    return (
      <label className="label" aria-label={text ? text : EMPTY_STRING_TEXT}>
        {text}
      </label>
    );
  },
);

export default Label;
