import "./ResultContainer.scss";
import { ReactElement } from "react";
import PriceContainer from "@/components/container/PriceContainer/PriceContainer.tsx";
import Button from "@/components/atoms/Button/Button.tsx";
import {
  BUTTON_TEXT_RESET,
  PRICE_SECTION_LABEL_TEXT_AMOUNT,
  PRICE_SECTION_LABEL_TEXT_TOTAL,
} from "@/globals/constants/constants.ts";
import { useResultCalculations } from "@/hooks/useResultCalculations.ts";
import { useResetFields } from "@/hooks/redux/useResetFields.ts";

const ResultContainer = (): ReactElement => {
  const { tipTotal, totalSum } = useResultCalculations();
  const resetAllFields = useResetFields();

  return (
    <div className="resultContainer">
      <PriceContainer
        priceType={PRICE_SECTION_LABEL_TEXT_AMOUNT}
        priceAmount={tipTotal}
      />
      <div className="resultContainerSpace">
        <PriceContainer
          priceType={PRICE_SECTION_LABEL_TEXT_TOTAL}
          priceAmount={totalSum}
        />
      </div>
      <Button
        text={BUTTON_TEXT_RESET}
        handleButtonClick={resetAllFields}
        isDisabled={!(tipTotal && totalSum)}
      />
    </div>
  );
};

export default ResultContainer;
