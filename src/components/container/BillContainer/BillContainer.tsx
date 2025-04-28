import "./BillContainer.scss";
import React, { ReactElement } from "react";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import Input, { InputProps } from "@/components/atoms/Input/Input.tsx";
import {
  BILL_ICON_ALT_TEXT,
  BILL_INPUT_ID,
  BILL_INPUT_NAME,
  BILL_LABEL,
} from "@/globals/constants/constants.ts";
import useBill from "@/hooks/redux/useBill.ts";
import { BILL_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { DOLLAR_ICON_SRC } from "@/globals/constants/ressources.ts";
import { useBillReset } from "@/hooks/redux/useBillReset.ts";

const BillContainer: React.FC = (): ReactElement => {
  const { updateBillValue } = useBill();
  const { triggerReset } = useBillReset();

  const inputProps: InputProps = {
    allowDecimals: true,
    id: BILL_INPUT_ID,
    name: BILL_INPUT_NAME,
    maxValue: BILL_INPUT_MAX_VALUE,
    propagateValue: updateBillValue,
    triggerReset,
  };

  return (
    <div className="billContainer">
      <HeadlineLabel text={BILL_LABEL} />
      <span className="billContainerInput">
        <Input {...inputProps} />
        <img
          className="billContainerInputIcon"
          src={DOLLAR_ICON_SRC}
          alt={BILL_ICON_ALT_TEXT}
          aria-hidden="true"
        />
      </span>
    </div>
  );
};

export default BillContainer;
