import { EMPTY_TEXT_WARNING_MESSAGE } from "@/globals/constants/constants.ts";

const useWarnIfEmptyText = (text: string): void => {
  if (!text && process.env.NODE_ENV === "development") {
    console.warn(EMPTY_TEXT_WARNING_MESSAGE);
  }
};

export default useWarnIfEmptyText;
