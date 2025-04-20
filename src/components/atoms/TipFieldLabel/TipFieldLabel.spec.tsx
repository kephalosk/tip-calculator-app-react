import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import TipFieldLabel from "./TipFieldLabel";
import { useKeyClickBypass } from "@/hooks";

jest.mock(
  "@/hooks",
  (): {
    __esModule: boolean;
    useKeyClickBypass: jest.Mock;
  } => ({
    __esModule: true,
    useKeyClickBypass: jest.fn(),
  }),
);

global.console.warn = jest.fn();

describe("TipFieldLabel Component", (): void => {
  const text: string = "Test Label";
  const isActive: boolean = false;
  const propagateChangeMock: jest.Mock = jest.fn();

  const testProps: {
    text: string;
    isActive: boolean;
    propagateChange: jest.Mock;
  } = {
    text,
    isActive,
    propagateChange: propagateChangeMock,
  };

  const handleClickMock: jest.Mock = jest.fn();
  const handleKeyDownMock: jest.Mock = jest.fn();

  beforeEach(() => {
    (useKeyClickBypass as jest.Mock).mockReturnValue({
      handleClick: handleClickMock,
      handleKeyDown: handleKeyDownMock,
    });
  });

  afterEach((): void => {
    process.env.NODE_ENV = "development";
    cleanup();
  });

  it("renders correctly with the provided text", (): void => {
    render(<TipFieldLabel {...testProps} />);

    const labelElement = screen.getByText(text);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("aria-label", text);
  });

  it("applies the active class when isActive is true", (): void => {
    render(<TipFieldLabel {...testProps} isActive={true} />);

    const labelElement: HTMLElement = screen.getByText(text);
    expect(labelElement).toHaveClass("tipFieldLabel active");
  });

  it("does not apply the active class when isActive is false", (): void => {
    render(<TipFieldLabel {...testProps} />);

    const labelElement: HTMLElement = screen.getByText(text);
    expect(labelElement).toHaveClass("tipFieldLabel");
    expect(labelElement).not.toHaveClass("active");
  });

  it("warns in development mode if text is empty", (): void => {
    process.env.NODE_ENV = "development";
    render(<TipFieldLabel {...testProps} text="" />);

    expect(console.warn).toHaveBeenCalledWith("Label text is empty!");
  });

  it("does not warn if text is empty in production mode", (): void => {
    process.env.NODE_ENV = "production";
    render(<TipFieldLabel {...testProps} text="" />);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("calls handleClick when label is clicked", (): void => {
    const { container } = render(<TipFieldLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".tipFieldLabel");
    fireEvent.click(labelElement!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it("calls handleKeyDown when a key is pressed", (): void => {
    const { container } = render(<TipFieldLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".tipFieldLabel");
    fireEvent.keyDown(labelElement!, { key: "Enter", code: "Enter" });

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
  });
});
