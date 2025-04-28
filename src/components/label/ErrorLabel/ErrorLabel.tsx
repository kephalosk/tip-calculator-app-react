import "./ErrorLabel.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelType.ts";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text: string;
}

const ErrorLabel: React.FC<Props> = React.memo(
  ({ text }: Props): ReactElement => {
    return (
      <span className="errorLabel">
        <Label type={LabelTypeEnum.LABEL} text={text} />
      </span>
    );
  },
);

export default ErrorLabel;
