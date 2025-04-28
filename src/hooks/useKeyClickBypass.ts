import React, { useRef, useCallback } from "react";

const useKeyClickBypass = (
  action: () => void,
  triggerKey: string = "Enter",
): {
  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleClick: () => void;
} => {
  const keyActivatedRef: React.RefObject<boolean> = useRef(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
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

export default useKeyClickBypass;
