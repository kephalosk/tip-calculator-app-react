import "./ErrorLabel.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text: string;
}

const ErrorLabel: React.FC<Props> = React.memo(
  ({ text }: Props): ReactElement => {
    return (
      <span className="errorLabel">
        <Label text={text} />
      </span>
    );
  },
);

export default ErrorLabel;
