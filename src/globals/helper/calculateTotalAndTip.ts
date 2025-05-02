import {
  CALCULATE_TOTAL_AND_TIP_ERROR_MESSAGE,
  EMPTY_PRICE_DECIMAL_STRING,
} from "@/globals/constants/constants.ts";

const calculateTotalAndTip = (
  billAmount: number,
  tipAmount: number,
  peopleCount: number,
): { tipTotal: string; totalSum: string } => {
  if (billAmount <= 0 || tipAmount < 0 || peopleCount <= 0) {
    console.error(CALCULATE_TOTAL_AND_TIP_ERROR_MESSAGE);
    return {
      tipTotal: EMPTY_PRICE_DECIMAL_STRING,
      totalSum: EMPTY_PRICE_DECIMAL_STRING,
    };
  }

  const calculatedTip: number = billAmount * tipAmount;
  const calculatedTipPerPerson: string = (calculatedTip / peopleCount).toFixed(
    2,
  );

  const total: number = billAmount + calculatedTip;
  const totalPerPerson: string = (total / peopleCount).toFixed(2);

  return { tipTotal: calculatedTipPerPerson, totalSum: totalPerPerson };
};

export default calculateTotalAndTip;
