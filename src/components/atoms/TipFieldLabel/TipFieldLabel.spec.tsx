import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import TipFieldLabel, { TipFieldLabelProps } from "./TipFieldLabel";
import useKeyClickBypass from "@/hooks/useKeyClickBypass.ts";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";

jest.mock(
  "@/hooks/useWarnIfEmptyText",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/useKeyClickBypass",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("TipFieldLabel Component", (): void => {
  const text: string = "Test Label";
  const isActive: boolean = false;
  const propagateChangeMock: jest.Mock = jest.fn();

  const setup = (
    propsOverride?: Partial<TipFieldLabelProps>,
  ): { container: HTMLElement } => {
    const defaultProps: TipFieldLabelProps = {
      text,
      isActive,
      propagateChange: propagateChangeMock,
    };

    const props: TipFieldLabelProps = { ...defaultProps, ...propsOverride };
    return render(<TipFieldLabel {...props} />);
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
    cleanup();
  });

  it("renders correctly with the provided text", (): void => {
    setup({ text });

    const labelElement = screen.getByText(text);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("aria-label", text);
  });

  it("renders with default empty text", () => {
    const { container } = setup({ text: undefined });

    const labelElement: HTMLElement | null =
      container.querySelector(".tipFieldLabel");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("");
  });

  it("applies the active class when isActive is true", (): void => {
    setup({ isActive: true });

    const labelElement: HTMLElement = screen.getByText(text);
    expect(labelElement).toHaveClass("tipFieldLabel active");
  });

  it("renders with default isActive is false", () => {
    const { container } = setup({ isActive: undefined });

    const labelElement: HTMLElement | null =
      container.querySelector(".tipFieldLabel");

    expect(labelElement).not.toHaveClass("tipFieldLabel active");
  });

  it("does not apply the active class when isActive is false", (): void => {
    setup({ isActive: false });

    const labelElement: HTMLElement = screen.getByText(text);
    expect(labelElement).toHaveClass("tipFieldLabel");
    expect(labelElement).not.toHaveClass("active");
  });

  it("calls hook useWarnIfEmptyText", (): void => {
    setup();

    expect(useWarnIfEmptyText).toHaveBeenCalledTimes(1);
    expect(useWarnIfEmptyText).toHaveBeenCalledWith(text);
  });

  it("calls handleClick when label is clicked", (): void => {
    const { container } = setup();

    const labelElement: HTMLElement | null =
      container.querySelector(".tipFieldLabel");
    fireEvent.click(labelElement!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it("calls handleKeyDown when a key is pressed", (): void => {
    const { container } = setup();

    const labelElement: HTMLElement | null =
      container.querySelector(".tipFieldLabel");
    fireEvent.keyDown(labelElement!, { key: "Enter", code: "Enter" });

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
  });
});
