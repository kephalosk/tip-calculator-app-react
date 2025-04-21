import "./BillContainer.scss";
import { ReactElement } from "react";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import Input, { InputProps } from "@/components/atoms/Input/Input.tsx";
import {
  PEOPLE_ICON_ALT_TEXT,
  PEOPLE_INPUT_ID,
  PEOPLE_INPUT_NAME,
  PEOPLE_LABEL,
} from "@/globals/constants/constants.ts";
import { PEOPLE_INPUT_MAX_VALUE } from "@/globals/config.ts";
import usePeople from "@/hooks/redux/usePeople.ts";
import { PEOPLE_ICON_SRC } from "@/globals/constants/ressources.ts";

const PeopleContainer: () => ReactElement = (): ReactElement => {
  const { updatePeopleValue } = usePeople();

  const inputProps: InputProps = {
    allowDecimals: true,
    id: PEOPLE_INPUT_ID,
    name: PEOPLE_INPUT_NAME,
    maxValue: PEOPLE_INPUT_MAX_VALUE,
    propagateValue: updatePeopleValue,
  };

  return (
    <div className="peopleContainer">
      <HeadlineLabel text={PEOPLE_LABEL} />
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
