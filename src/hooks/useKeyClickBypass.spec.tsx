import { screen, render, fireEvent } from "@testing-library/react";
import useKeyClickBypass from "./useKeyClickBypass";

const TestComponent = ({ action }: { action: () => void }) => {
  const { handleKeyDown, handleClick } = useKeyClickBypass(action);

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid="test-button"
    >
      Test
    </button>
  );
};

describe("useKeyClickBypass", (): void => {
  const action: jest.Mock = jest.fn();

  const testProps: { action: () => void } = {
    action,
  };

  it("calls action on Enter key", (): void => {
    render(<TestComponent {...testProps} />);

    const element: HTMLElement = screen.getByTestId("test-button");
    fireEvent.keyDown(element, { key: "Enter" });

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("does not call action on other key", (): void => {
    render(<TestComponent {...testProps} />);

    const element: HTMLElement = screen.getByTestId("test-button");
    fireEvent.keyDown(element, { key: "Space" });

    expect(action).not.toHaveBeenCalled();
  });

  it("does not double-trigger when Enter is followed by click", (): void => {
    render(<TestComponent {...testProps} />);

    const element: HTMLElement = screen.getByTestId("test-button");
    fireEvent.keyDown(element, { key: "Enter" });
    fireEvent.click(element);

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("calls action on click if Enter not pressed", (): void => {
    render(<TestComponent {...testProps} />);

    const element: HTMLElement = screen.getByTestId("test-button");
    fireEvent.click(element);

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("resets after Enter+click and triggers on new click", (): void => {
    render(<TestComponent {...testProps} />);

    const element: HTMLElement = screen.getByTestId("test-button");
    fireEvent.keyDown(element, { key: "Enter" });
    fireEvent.click(element);
    fireEvent.click(element);

    expect(action).toHaveBeenCalledTimes(2);
  });
});
