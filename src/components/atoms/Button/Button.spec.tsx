import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps } from "./Button.tsx";
import { useBlurOnPointerUp, useKeyClickBypass } from "@/hooks";
import { BUTTON_ARIA_LABEL_PREFIX } from "@/globals/constants/constants.ts";

jest.mock(
  "@/hooks",
  (): {
    __esModule: boolean;
    useKeyClickBypass: jest.Mock;
    useBlurOnPointerUp: jest.Mock;
  } => ({
    __esModule: true,
    useKeyClickBypass: jest.fn(),
    useBlurOnPointerUp: jest.fn(),
  }),
);

describe("Button", (): void => {
  const text: string = "reset";
  const handleButtonClickMock: jest.Mock = jest.fn();
  const isDisabled: boolean = false;

  const isDisabledDefault: boolean = false;

  const setup = (
    options?: Partial<ButtonProps>,
  ): { container: HTMLElement } => {
    const testProps: ButtonProps = {
      text: options?.text ?? text,
      handleButtonClick: options?.handleButtonClick ?? handleButtonClickMock,
      isDisabled: options?.isDisabled ?? isDisabled,
    };

    return render(<Button {...testProps} />);
  };

  const handleClickMock: jest.Mock = jest.fn();
  const handleKeyDownMock: jest.Mock = jest.fn();
  const useKeyClickBypassMock = {
    handleClick: handleClickMock,
    handleKeyDown: handleKeyDownMock,
  };

  const handlePointerUpMock: jest.Mock = jest.fn();

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  beforeEach((): void => {
    (useKeyClickBypass as jest.Mock).mockReturnValue(useKeyClickBypassMock);
    (useBlurOnPointerUp as jest.Mock).mockReturnValue(handlePointerUpMock);

    handleButtonClickMock.mockClear();
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("renders the button with the passed text", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("aria-disabled", `${isDisabled}`);
    expect(element).toHaveAttribute(
      "aria-label",
      `${BUTTON_ARIA_LABEL_PREFIX}${text}`,
    );
    expect(element).toHaveAttribute("tabindex", "0");
    expect(element).toHaveAttribute("type", "button");
    expect(element).toHaveTextContent(text);
  });

  it("calls handleClick on click", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not call handleClick on click if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(0);
  });

  it("sets class disabled if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toHaveClass("disabled");
  });

  it("calls handleKeyDown on key down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.keyDown(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
  });

  it("does not call handleKeyDown on click if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(0);
  });

  it("calls handlePointerUp on mouse down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.mouseDown(element!);

    expect(handlePointerUpMock).toHaveBeenCalledTimes(1);
  });

  it("does not call handlePointerUp on click if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handlePointerUpMock).toHaveBeenCalledTimes(0);
  });

  it("sets tabIndex to -1 if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toHaveAttribute("tabindex", "-1");
  });

  it("sets default value for prop isDisabled if it is undefined", (): void => {
    const { container } = render(
      <Button
        text={text}
        handleButtonClick={jest.fn()}
        isDisabled={undefined}
      />,
    );

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("aria-disabled", `${isDisabledDefault}`);
  });
});
