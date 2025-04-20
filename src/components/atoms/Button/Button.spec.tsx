import { fireEvent, render } from "@testing-library/react";
import Button from "./Button.tsx";

describe("Button", (): void => {
  const text: string = "reset";
  const mockHandleButtonClick: jest.Mock = jest.fn();
  const isDisabled: boolean = false;

  const testProps: {
    text: string;
    handleButtonClick: () => void;
    isDisabled: boolean;
  } = {
    text,
    handleButtonClick: mockHandleButtonClick,
    isDisabled,
  };

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  beforeEach((): void => {
    mockHandleButtonClick.mockClear();
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("renders the button with the passed text", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(text);
  });

  it("calls handleButtonClick on click", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
  });

  it("calls handleButtonClick on Enter keydown", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.keyDown(element!, { key: "Enter" });

    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
  });

  it("does not double-trigger when Enter is followed by click", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.keyDown(element!, { key: "Enter" });
    fireEvent.click(element!);

    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
  });

  it("resets key bypass after Enter+click and triggers on next click", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");

    fireEvent.keyDown(element!, { key: "Enter" }); // 1
    fireEvent.click(element!);
    fireEvent.click(element!);

    expect(mockHandleButtonClick).toHaveBeenCalledTimes(2);
  });

  it("does NOT trigger action on random key", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");

    fireEvent.keyDown(element!, { key: "Space" });
    expect(mockHandleButtonClick).not.toHaveBeenCalled();
  });

  it("blurs button on pointer up", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");
    const blurSpy: jest.SpyInstance = jest.spyOn(element!, "blur");

    fireEvent.mouseDown(element!);
    jest.runAllTimers();
    expect(blurSpy).toHaveBeenCalled();
  });

  it("does not call handler when disabled", (): void => {
    const { container } = render(<Button {...testProps} isDisabled={true} />);

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toBeDisabled();
    expect(element).toHaveClass("disabled");
    expect(element).toHaveAttribute("tabindex", "-1");

    fireEvent.click(element!);
    fireEvent.keyDown(element!, { key: "Enter", code: "Enter" });

    expect(mockHandleButtonClick).not.toHaveBeenCalled();
  });

  it("renders the button with default isDisabled is false", (): void => {
    const { container } = render(
      <Button {...testProps} isDisabled={undefined} />,
    );

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).not.toBeDisabled();
  });

  it("has semantic accessibility attributes", (): void => {
    const { container } = render(<Button {...testProps} />);

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toHaveAttribute("tabindex", "0");
    expect(element).toHaveAttribute("aria-label", `button for: ${text}`);
  });
});
