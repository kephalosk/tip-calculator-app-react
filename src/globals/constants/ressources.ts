import { ENVIRONMENT_DEVELOPMENT } from "@/globals/constants/constants.ts";

export const PEOPLE_ICON_SRC: string =
  import.meta.env.MODE === ENVIRONMENT_DEVELOPMENT
    ? "./src/assets/images/icon-person.svg"
    : "./images/icon-person.svg";
export const DOLLAR_ICON_SRC: string =
  import.meta.env.MODE === ENVIRONMENT_DEVELOPMENT
    ? "./src/assets/images/icon-dollar.svg"
    : "./images/icon-dollar.svg";
export const LOGO_ICON_SRC: string =
  import.meta.env.MODE === ENVIRONMENT_DEVELOPMENT
    ? "./src/assets/images/logo.svg"
    : "./images/logo.svg";
