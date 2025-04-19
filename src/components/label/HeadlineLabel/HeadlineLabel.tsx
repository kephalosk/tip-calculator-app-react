import "./HeadlineLabel.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text: string;
}

const HeadlineLabel: React.FC<Props> = React.memo(
  ({ text }: Props): ReactElement => {
    return (
      <span className="headlineLabel">
        <Label text={text} />
      </span>
    );
  },
);

export default HeadlineLabel;
