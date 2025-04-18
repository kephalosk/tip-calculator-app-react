import "./Button.scss";
import React, { ReactElement, useRef } from "react";
import { useBlurOnPointerUp, useKeyClickBypass } from "@/hooks";
import clsx from "clsx";

interface Props {
  text: string;
  handleButtonClick: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<Props> = React.memo(
  ({ text, handleButtonClick, isDisabled = false }: Props): ReactElement => {
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
        aria-label={`button for: ${text}`}
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
