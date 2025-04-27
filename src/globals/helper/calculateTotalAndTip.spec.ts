import calculateTotalAndTip from "@/globals/helper/calculateTotalAndTip.ts";
import {
  CALCULATE_TOTAL_AND_TIP_ERROR_MESSAGE,
  EMPTY_PRICE_DECIMAL_STRING,
} from "@/globals/constants/constants.ts";

jest.spyOn(console, "error").mockImplementation((): void | null => null);

describe("calculateTotalAndTip", (): void => {
  it("calculates tipTotal and totalSum for valid Input", (): void => {
    const billAmount: number = 1000;
    const tipAmount: number = 10;
    const peopleCount: number = 10;

    const expectedTipTotal: string = "10.00";
    const expectedTotalSum: string = "110.00";

    const { tipTotal, totalSum } = calculateTotalAndTip(
      billAmount,
      tipAmount,
      peopleCount,
    );

    expect(tipTotal).toEqual(expectedTipTotal);
    expect(totalSum).toEqual(expectedTotalSum);
  });

  it.each([
    [0, 1, 1],
    [1, -1, 1],
    [1, 1, 0],
    [-1, 1, 1],
    [1, -1, 1],
    [1, 1, -1],
  ])(
    "returns empty price strings if billAmount = %s, tipAmount = %s, peopleCount = %s",
    (billAmount: number, tipAmount: number, peopleCount: number): void => {
      const { tipTotal, totalSum } = calculateTotalAndTip(
        billAmount,
        tipAmount,
        peopleCount,
      );

      expect(tipTotal).toEqual(EMPTY_PRICE_DECIMAL_STRING);
      expect(totalSum).toEqual(EMPTY_PRICE_DECIMAL_STRING);
      expect(console.error).toHaveBeenCalledWith(
        CALCULATE_TOTAL_AND_TIP_ERROR_MESSAGE,
      );
    },
  );
});
