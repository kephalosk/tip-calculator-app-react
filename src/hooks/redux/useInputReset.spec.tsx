import { render, act } from "@testing-library/react";
import { jest } from "@jest/globals";
import useInputReset from "./useInputReset.ts";

const handleInputChangeMock: jest.Mock = jest.fn();

const TestComponent = ({ triggerReset }: { triggerReset: boolean }) => {
  useInputReset(triggerReset, handleInputChangeMock);

  return <input type="text" />;
};

describe("useInputReset", (): void => {
  it("calls handleInputChange with an empty string when triggerReset changes from false to true", (): void => {
    const { rerender } = render(<TestComponent triggerReset={false} />);

    act((): void => {
      rerender(<TestComponent triggerReset={true} />);
    });

    expect(handleInputChangeMock).toHaveBeenCalledWith("");
  });

  it("calls handleInputChange with an empty string when triggerReset changes from true to false", (): void => {
    const { rerender } = render(<TestComponent triggerReset={true} />);

    expect(handleInputChangeMock).toHaveBeenCalledWith("");

    act((): void => {
      rerender(<TestComponent triggerReset={false} />);
    });

    expect(handleInputChangeMock).toHaveBeenCalledWith("");
  });

  it("calls handleInputChange with an empty string when triggerReset changes multiple times", (): void => {
    const { rerender } = render(<TestComponent triggerReset={false} />);

    act((): void => {
      rerender(<TestComponent triggerReset={true} />);
    });

    expect(handleInputChangeMock).toHaveBeenCalledWith("");

    act((): void => {
      rerender(<TestComponent triggerReset={false} />);
    });

    expect(handleInputChangeMock).toHaveBeenCalledWith("");

    act((): void => {
      rerender(<TestComponent triggerReset={true} />);
    });

    expect(handleInputChangeMock).toHaveBeenCalledWith("");
  });
});
