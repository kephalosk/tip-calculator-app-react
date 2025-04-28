import "./HeadlineLabel.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelType.ts";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text: string;
}

const HeadlineLabel: React.FC<Props> = React.memo(
  ({ text }: Props): ReactElement => {
    return (
      <span className="headlineLabel">
        <Label type={LabelTypeEnum.LABEL} text={text} />
      </span>
    );
  },
);

export default HeadlineLabel;
