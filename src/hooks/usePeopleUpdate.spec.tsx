import { render, act, screen } from "@testing-library/react";
import usePeople from "@/hooks/redux/usePeople.ts";
import usePeopleUpdate from "@/hooks/usePeopleUpdate.ts";

jest.mock(
  "@/hooks/redux/usePeople.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const errorTestId: string = "has-error";
const TestComponent = () => {
  const { hasError, handlePeopleUpdate } = usePeopleUpdate();

  return (
    <div>
      <span data-testid={errorTestId}>{hasError ? "Error" : "No Error"}</span>
      <button onClick={() => handlePeopleUpdate(0)}>Set 0</button>
      <button onClick={() => handlePeopleUpdate(10)}>Set 10</button>
    </div>
  );
};

describe("usePeopleUpdate", (): void => {
  let updatePeopleValue: jest.Mock;

  beforeEach((): void => {
    updatePeopleValue = jest.fn();
    (usePeople as jest.Mock).mockReturnValue({ updatePeopleValue });
  });

  it("initializes with hasError as false", (): void => {
    render(<TestComponent />);

    const errorElement: HTMLElement = screen.getByTestId(errorTestId);

    expect(errorElement.textContent).toBe("No Error");
  });

  it("sets error when people value is 0", (): void => {
    render(<TestComponent />);

    const button: HTMLElement = screen.getByText("Set 0");
    act((): void => {
      button.click();
    });
    act((): void => {
      button.click();
    });

    const errorElement: HTMLElement = screen.getByTestId("has-error");
    expect(errorElement.textContent).toBe("Error");
    expect(updatePeopleValue).toHaveBeenCalledWith(0);
  });

  it("removes error when people value is not 0", (): void => {
    render(<TestComponent />);

    const buttonSetZero: HTMLElement = screen.getByText("Set 0");
    act((): void => {
      buttonSetZero.click();
    });

    const buttonSetTen: HTMLElement = screen.getByText("Set 10");
    act((): void => {
      buttonSetTen.click();
    });

    const errorElement: HTMLElement = screen.getByTestId("has-error");
    expect(errorElement.textContent).toBe("No Error");
    expect(updatePeopleValue).toHaveBeenCalledWith(10);
  });

  it("does not trigger update on first render when value is 0", (): void => {
    render(<TestComponent />);

    const button: HTMLElement = screen.getByText("Set 0");
    act((): void => {
      button.click();
    });

    const errorElement: HTMLElement = screen.getByTestId("has-error");
    expect(errorElement.textContent).toBe("No Error");
    expect(updatePeopleValue).not.toHaveBeenCalled();
  });
});
