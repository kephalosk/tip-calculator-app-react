import { render, act } from "@testing-library/react";
import { selectTipValue, useTipItems } from "@/hooks";
import { setTipValue } from "@/redux/slices/tipSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { TipItem, TipItems } from "@/globals/constants/TipItems.ts";
import { RootState } from "@/redux/store.ts";

jest.mock(
  "react-redux",
  (): { useDispatch: jest.Mock; useSelector: jest.Mock } => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }),
);

const TestComponent = ({ initialItems }: { initialItems: TipItem[] }) => {
  const { tipItems, handleTipItemClick, triggerReset, deactivateAllItems } =
    useTipItems(initialItems);

  return (
    <div>
      {tipItems.map((item: TipItem, index: number) => (
        <div key={index}>
          <button onClick={() => handleTipItemClick(item.value)}>
            {item.text}
          </button>
          {item.isActive && <span data-testid="active">Active</span>}
        </div>
      ))}
      <button onClick={deactivateAllItems}>Deactivate All</button>
      <div data-testid="triggerReset">
        {triggerReset ? "Reset Triggered" : "No Reset"}
      </div>
    </div>
  );
};

describe("useTipItems Hook", (): void => {
  const dispatch: jest.Mock = jest.fn();
  const initialItems: TipItem[] = TipItems;

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  it("initializes tipItems and triggerReset", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(1);
    const { getByTestId } = render(
      <TestComponent initialItems={initialItems} />,
    );

    expect(getByTestId("triggerReset").textContent).toBe("No Reset");
  });

  it("sets isActive on the clicked item and dispatch setTipValue", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(1);
    const { getByText, getByTestId } = render(
      <TestComponent initialItems={initialItems} />,
    );

    const button: HTMLElement = getByText("10%");

    act((): void => {
      button.click();
    });

    expect(getByTestId("active")).toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledWith(setTipValue(0.1));

    expect(getByTestId("triggerReset").textContent).toBe("Reset Triggered");
  });

  it("deactivates all items on deactivateAllItems", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(1);
    const { getByText, queryByTestId } = render(
      <TestComponent initialItems={initialItems} />,
    );

    const deactivateButton: HTMLElement = getByText("Deactivate All");

    act((): void => {
      deactivateButton.click();
    });

    expect(queryByTestId("active")).toBeNull();
  });

  it("toggles triggerReset when handleTipItemClick is called", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(1);
    const { getByText, getByTestId } = render(
      <TestComponent initialItems={initialItems} />,
    );

    const button: HTMLElement = getByText("5%");

    act((): void => {
      button.click();
    });

    expect(getByTestId("triggerReset").textContent).toBe("Reset Triggered");

    act((): void => {
      button.click();
    });

    expect(getByTestId("triggerReset").textContent).toBe("No Reset");
  });

  it("resets everything if tipAmount === 0", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(0);
    const { getByTestId, queryByTestId } = render(
      <TestComponent initialItems={initialItems} />,
    );

    expect(queryByTestId("active")).toBeNull();
    expect(getByTestId("triggerReset").textContent).toBe("Reset Triggered");
  });

  it("calls selectTipValue and returns the correct tipAmount value from the store", (): void => {
    const tipAmountExpected: number = 100;

    const state: RootState = {
      bill: { value: 0 },
      tip: { value: tipAmountExpected },
      people: { value: 0 },
    };

    const tipAmount: number = selectTipValue(state);

    expect(tipAmount).toBe(tipAmountExpected);
  });
});
