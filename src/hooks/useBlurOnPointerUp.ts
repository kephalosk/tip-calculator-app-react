import React, { useCallback } from "react";

export function useBlurOnPointerUp(ref: React.RefObject<HTMLElement | null>) {
  return useCallback((): void => {
    setTimeout(() => ref.current?.blur(), 0);
  }, [ref]);
}
