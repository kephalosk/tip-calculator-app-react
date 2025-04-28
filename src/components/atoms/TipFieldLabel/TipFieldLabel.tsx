import "./TipFieldLabel.scss";
import React, { ReactElement } from "react";
import clsx from "clsx";
import useKeyClickBypass from "@/hooks/useKeyClickBypass.ts";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";
import { EMPTY_STRING } from "@/globals/constants/constants.ts";

export interface TipFieldLabelProps extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
  isActive?: boolean;
  propagateChange: () => void;
}

const TipFieldLabel: React.FC<TipFieldLabelProps> = React.memo(
  ({
    text = EMPTY_STRING,
    isActive = false,
    propagateChange,
  }: TipFieldLabelProps): ReactElement => {
    const { handleClick, handleKeyDown } = useKeyClickBypass(propagateChange);
    useWarnIfEmptyText(text);

    return (
      <label
        className={clsx("tipFieldLabel", { active: isActive })}
        onClick={handleClick}
        onKeyDown={(event: React.KeyboardEvent<HTMLLabelElement>) =>
          handleKeyDown(event)
        }
        tabIndex={0}
        aria-label={text}
      >
        {text}
      </label>
    );
  },
);

export default TipFieldLabel;
