import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import calculateTotalAndTip from "@/globals/helper/calculateTotalAndTip.ts";
import useResultCalculations from "@/hooks/useResultCalculations.ts";

// Mocking of necessary functions and hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@/globals/helper/calculateTotalAndTip.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("useResultCalculations Hook", () => {
  const mockCalculateTotalAndTip = calculateTotalAndTip as jest.Mock;

  beforeEach(() => {
    // Reset the mock before each test
    mockCalculateTotalAndTip.mockReset();
  });

  it("calculates tipTotal and totalSum correctly when values are provided", () => {
    const mockState: RootState = {
      bill: { value: 100 },
      tip: { tipValue: 20 },
      people: { value: 5 },
    };

    // Mock useSelector to return values from mockState
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState),
    );

    // Mock the calculateTotalAndTip function to return expected values
    mockCalculateTotalAndTip.mockReturnValue({
      tipTotal: "4.00", // expected tip per person
      totalSum: "20.00", // expected total per person
    });

    // Using the hook to test the behavior
    const { tipTotal, totalSum } = useResultCalculations();

    // Assert that the calculated tipTotal and totalSum are correct
    expect(tipTotal).toBe("4.00");
    expect(totalSum).toBe("20.00");

    // Ensure the calculation function was called with correct parameters
    expect(mockCalculateTotalAndTip).toHaveBeenCalledWith(
      100, // billAmount
      20, // tipAmount
      5, // peopleCount
    );
  });

  it("returns empty strings when one of the values is missing", () => {
    const mockState: RootState = {
      bill: { value: 100 },
      tip: { tipValue: 20 },
      people: { value: 0 }, // peopleCount is 0, which should reset the values
    };

    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState),
    );

    mockCalculateTotalAndTip.mockReturnValue({
      tipTotal: "4.00",
      totalSum: "20.00",
    });

    const { tipTotal, totalSum } = useResultCalculations();

    expect(tipTotal).toBe(""); // Since peopleCount is 0, we expect empty values
    expect(totalSum).toBe("");

    // Ensure that the calculation function was not called due to invalid data
    expect(mockCalculateTotalAndTip).not.toHaveBeenCalled();
  });

  it("does not call calculateTotalAndTip if billAmount, tipAmount or peopleCount are zero", () => {
    const mockState: RootState = {
      bill: { value: 0 },
      tip: { tipValue: 0 },
      people: { value: 5 },
    };

    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState),
    );

    const { tipTotal, totalSum } = useResultCalculations();

    expect(tipTotal).toBe(""); // Since billAmount and tipAmount are zero, we expect empty values
    expect(totalSum).toBe("");

    // Ensure that the calculation function was not called
    expect(mockCalculateTotalAndTip).not.toHaveBeenCalled();
  });

  it("recalculates values when billAmount, tipAmount or peopleCount changes", () => {
    const mockState: RootState = {
      bill: { value: 100 },
      tip: { tipValue: 20 },
      people: { value: 5 },
    };

    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState),
    );

    mockCalculateTotalAndTip.mockReturnValue({
      tipTotal: "4.00",
      totalSum: "20.00",
    });

    const { tipTotal, totalSum } = useResultCalculations();

    expect(tipTotal).toBe("4.00");
    expect(totalSum).toBe("20.00");

    // Simulate state change by mocking different values
    const mockStateChanged: RootState = {
      bill: { value: 200 },
      tip: { tipValue: 15 },
      people: { value: 4 },
    };

    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockStateChanged),
    );

    const { tipTotal: newTipTotal, totalSum: newTotalSum } =
      useResultCalculations();

    expect(newTipTotal).toBe("7.50"); // (200 * 15%) / 4 = 7.50
    expect(newTotalSum).toBe("51.25"); // (200 + 30) / 4 = 51.25

    expect(mockCalculateTotalAndTip).toHaveBeenCalledTimes(2);
    expect(mockCalculateTotalAndTip).toHaveBeenCalledWith(
      200, // new billAmount
      15, // new tipAmount
      4, // new peopleCount
    );
  });
});
