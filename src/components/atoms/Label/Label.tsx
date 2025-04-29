import "./Label.scss";
import React, { ReactElement } from "react";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";
import { EMPTY_STRING } from "@/globals/constants/constants.ts";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import useLabelType from "@/hooks/useLabelType.ts";

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  type: LabelTypeEnum;
  text?: string;
}

const Label: React.FC<LabelProps> = React.memo(
  ({ type, text = EMPTY_STRING }: LabelProps): ReactElement => {
    const { ariaLabel, renderedText } = useLabelType(type, text);
    useWarnIfEmptyText(text);

    return (
      <label className={`label ${type}`} aria-label={ariaLabel}>
        {renderedText}
      </label>
    );
  },
);

export default Label;
