import { render, act } from "@testing-library/react";
import { useTipItems } from "./useTipItems"; // Dein Hook-Pfad
import { setTipValue } from "@/redux/slices/tipSlice.ts";
import { useDispatch } from "react-redux";
import { TipItem, TipItems } from "@/globals/constants/TipItems.ts";

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

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
    const { getByTestId } = render(
      <TestComponent initialItems={initialItems} />,
    );

    expect(getByTestId("triggerReset").textContent).toBe("No Reset");
  });

  it("sets isActive on the clicked item and dispatch setTipValue", (): void => {
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
});
