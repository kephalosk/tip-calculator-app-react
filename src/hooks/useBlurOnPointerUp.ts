import React, { useCallback } from "react";

const useBlurOnPointerUp = (ref: React.RefObject<HTMLElement | null>) => {
  return useCallback((): void => {
    setTimeout(() => ref.current?.blur(), 0);
  }, [ref]);
};

export default useBlurOnPointerUp;
