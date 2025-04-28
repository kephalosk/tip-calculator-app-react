import "./Button.scss";
import React, { ReactElement, useRef } from "react";
import clsx from "clsx";
import { BUTTON_ARIA_LABEL_PREFIX } from "@/globals/constants/constants.ts";
import useKeyClickBypass from "@/hooks/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/useBlurOnPointerUp.ts";

export interface ButtonProps {
  text: string;
  handleButtonClick: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    text,
    handleButtonClick,
    isDisabled = false,
  }: ButtonProps): ReactElement => {
    const buttonRef: React.RefObject<HTMLButtonElement | null> =
      useRef<HTMLButtonElement>(null);
    const { handleClick, handleKeyDown } = useKeyClickBypass(handleButtonClick);
    const handlePointerUp = useBlurOnPointerUp(buttonRef);

    return (
      <button
        ref={buttonRef}
        className={clsx("button", { disabled: isDisabled })}
        type="button"
        onClick={isDisabled ? undefined : handleClick}
        onKeyDown={
          isDisabled
            ? undefined
            : (event: React.KeyboardEvent<HTMLButtonElement>) =>
                handleKeyDown(event)
        }
        onMouseDown={isDisabled ? undefined : handlePointerUp}
        aria-label={`${BUTTON_ARIA_LABEL_PREFIX}${text}`}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        disabled={isDisabled}
      >
        {text}
      </button>
    );
  },
);

export default Button;
