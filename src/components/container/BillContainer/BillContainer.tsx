import "./BillContainer.scss";
import { ReactElement } from "react";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import Input, { InputProps } from "@/components/atoms/Input/Input.tsx";
import {
  BILL_INPUT_ID,
  BILL_INPUT_NAME,
  BILL_LABEL,
} from "@/globals/constants/constants.ts";
import useBill from "@/hooks/redux/useBill.ts";
import { BILL_INPUT_MAX_VALUE } from "@/globals/config.ts";

const BillContainer: () => ReactElement = (): ReactElement => {
  const { updateBillValue } = useBill();

  const inputProps: InputProps = {
    allowDecimals: true,
    id: BILL_INPUT_ID,
    name: BILL_INPUT_NAME,
    maxValue: BILL_INPUT_MAX_VALUE,
    propagateValue: updateBillValue,
  };

  return (
    <div className="billContainer">
      <HeadlineLabel text={BILL_LABEL} />
      <span className="billContainerInput">
        <Input {...inputProps} />
        <img
          className="billContainerInputIcon"
          src="src/assets/images/icon-dollar.svg"
          alt="Dollar Icon for Input Field"
          aria-hidden="true"
        />
      </span>
    </div>
  );
};

export default BillContainer;
