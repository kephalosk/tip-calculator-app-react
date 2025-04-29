import "./PeopleContainer.scss";
import React, { ReactElement } from "react";
import Input, { InputProps } from "@/components/atoms/Input/Input.tsx";
import {
  PEOPLE_ICON_ALT_TEXT,
  PEOPLE_INPUT_ERROR_MESSAGE,
  PEOPLE_INPUT_ID,
  PEOPLE_INPUT_NAME,
  PEOPLE_LABEL,
} from "@/globals/constants/constants.ts";
import { PEOPLE_INPUT_MAX_VALUE } from "@/globals/config.ts";
import usePeopleUpdate from "@/hooks/redux/usePeopleUpdate.ts";
import { usePeopleReset } from "@/hooks/redux/usePeopleReset.ts";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import { PEOPLE_ICON_SRC } from "@/globals/constants/ressources.ts";

const PeopleContainer: React.FC = (): ReactElement => {
  const { hasError, handlePeopleUpdate } = usePeopleUpdate();
  const { triggerReset } = usePeopleReset();

  const inputProps: InputProps = {
    id: PEOPLE_INPUT_ID,
    name: PEOPLE_INPUT_NAME,
    maxValue: PEOPLE_INPUT_MAX_VALUE,
    propagateValue: handlePeopleUpdate,
    allowDecimals: false,
    hasError: hasError,
    triggerReset,
  };

  return (
    <div className="peopleContainer">
      <div className="peopleContainerHeader">
        <Label type={LabelTypeEnum.HEADLINE_LABEL} text={PEOPLE_LABEL} />
        {hasError && (
          <Label
            type={LabelTypeEnum.ERROR_LABEL}
            text={PEOPLE_INPUT_ERROR_MESSAGE}
          />
        )}
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
