import {
  EMPTY_TEXT_WARNING_MESSAGE,
  ENVIRONMENT_DEVELOPMENT,
} from "@/globals/constants/constants.ts";

const useWarnIfEmptyText = (text: string): void => {
  if (!text && process.env.NODE_ENV === ENVIRONMENT_DEVELOPMENT) {
    console.warn(EMPTY_TEXT_WARNING_MESSAGE);
  }
};

export default useWarnIfEmptyText;
