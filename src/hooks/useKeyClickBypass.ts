import React, { useRef, useCallback } from "react";

export const useKeyClickBypass = (
  action: () => void,
  triggerKey: string = "Enter",
): {
  handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleClick: () => void;
} => {
  const keyActivatedRef: React.RefObject<boolean> = useRef(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>): void => {
      if (event.key === triggerKey) {
        keyActivatedRef.current = true;
        action();
      }
    },
    [action, triggerKey],
  );

  const handleClick = useCallback((): void => {
    if (keyActivatedRef.current) {
      keyActivatedRef.current = false;
      return;
    }
    action();
  }, [action]);

  return { handleKeyDown, handleClick };
};
