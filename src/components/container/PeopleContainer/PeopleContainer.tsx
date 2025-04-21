import "./PeopleContainer.scss";
import { ReactElement } from "react";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import Input, { InputProps } from "@/components/atoms/Input/Input.tsx";
import {
  PEOPLE_ICON_ALT_TEXT,
  PEOPLE_INPUT_ERROR_MESSAGE,
  PEOPLE_INPUT_ID,
  PEOPLE_INPUT_NAME,
  PEOPLE_LABEL,
} from "@/globals/constants/constants.ts";
import { PEOPLE_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { PEOPLE_ICON_SRC } from "@/globals/constants/ressources.ts";
import ErrorLabel from "@/components/label/ErrorLabel/ErrorLabel.tsx";
import usePeopleUpdate from "@/hooks/usePeopleUpdate.ts";

const PeopleContainer: () => ReactElement = (): ReactElement => {
  const { hasError, handlePeopleUpdate } = usePeopleUpdate();

  const inputProps: InputProps = {
    id: PEOPLE_INPUT_ID,
    name: PEOPLE_INPUT_NAME,
    maxValue: PEOPLE_INPUT_MAX_VALUE,
    propagateValue: handlePeopleUpdate,
    allowDecimals: false,
    hasError: hasError,
  };

  return (
    <div className="peopleContainer">
      <div className="peopleContainerHeader">
        <HeadlineLabel text={PEOPLE_LABEL} />
        {hasError && <ErrorLabel text={PEOPLE_INPUT_ERROR_MESSAGE} />}
      </div>
      <span className="peopleContainerInput">
        <Input {...inputProps} />
        <img
          className="peopleContainerInputIcon"
          src={PEOPLE_ICON_SRC}
          alt={PEOPLE_ICON_ALT_TEXT}
          aria-hidden="true"
        />
      </span>
    </div>
  );
};

export default PeopleContainer;
