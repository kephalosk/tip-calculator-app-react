import "./Button.scss";
import React, { ReactElement, useMemo, useRef } from "react";
import { useBlurOnPointerUp, useKeyClickBypass } from "@/hooks";

interface Props {
  text: string;
  handleButtonClick: () => void;
  isDisabled?: boolean;
}

const Button: React.MemoExoticComponent<
  ({ text, handleButtonClick, isDisabled }: Props) => ReactElement
> = React.memo(
  ({ text, handleButtonClick, isDisabled = false }: Props): ReactElement => {
    const buttonRef: React.RefObject<HTMLButtonElement | null> =
      useRef<HTMLButtonElement>(null);
    const textUppercase: string = useMemo(() => text.toUpperCase(), [text]);
    const { handleClick, handleKeyDown } = useKeyClickBypass(handleButtonClick);
    const handlePointerUp = useBlurOnPointerUp(buttonRef);

    return (
      <>
        <button
          ref={buttonRef}
          className={`button ${isDisabled ? "disabled" : ""}`}
          onClick={isDisabled ? undefined : handleClick}
          onKeyDown={
            isDisabled
              ? undefined
              : (event: React.KeyboardEvent<HTMLButtonElement>) =>
                  handleKeyDown(event)
          }
          onMouseDown={isDisabled ? undefined : handlePointerUp}
          aria-label={`button for: ${text}`}
          aria-hidden={false}
          tabIndex={isDisabled ? -1 : 0}
          disabled={isDisabled}
        >
          {textUppercase}
        </button>
      </>
    );
  },
);

export default Button;
