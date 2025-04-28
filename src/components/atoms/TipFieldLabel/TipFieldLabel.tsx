import "./TipFieldLabel.scss";
import React, { ReactElement } from "react";
import clsx from "clsx";
import useKeyClickBypass from "@/hooks/useKeyClickBypass.ts";
import { ENVIRONMENT_DEVELOPMENT } from "@/globals/constants/constants.ts";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
  isActive?: boolean;
  propagateChange: () => void;
}

const TipFieldLabel: React.FC<Props> = React.memo(
  ({ text = "", isActive = false, propagateChange }: Props): ReactElement => {
    const { handleClick, handleKeyDown } = useKeyClickBypass(propagateChange);

    if (!text && process.env.NODE_ENV === ENVIRONMENT_DEVELOPMENT) {
      console.warn("Label text is empty!");
    }

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
