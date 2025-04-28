import { render } from "@testing-library/react";
import Label, { LabelProps } from "./Label";
import { useWarnIfEmptyText } from "@/hooks/useWarnIfEmptyText.ts";
import {
  EMPTY_STRING,
  EMPTY_STRING_TEXT,
} from "@/globals/constants/constants.ts";

jest.mock(
  "@/hooks/useWarnIfEmptyText",
  (): {
    __esModule: boolean;
    useWarnIfEmptyText: jest.Mock;
  } => ({
    __esModule: true,
    useWarnIfEmptyText: jest.fn(),
  }),
);

describe("Label Component", (): void => {
  const text: string = "Test Label";

  const setup = (
    propsOverride?: Partial<LabelProps>,
  ): { container: HTMLElement } => {
    const defaultProps: LabelProps = {
      text,
    };

    const props: LabelProps = { ...defaultProps, ...propsOverride };
    return render(<Label {...props} />);
  };

  beforeEach((): void => {
    (useWarnIfEmptyText as jest.Mock).mockReturnValue(undefined);
  });

  it("renders the label with passed prop text", (): void => {
    const { container } = setup({ text });

    const element: HTMLElement | null = container.querySelector(".label");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(text);
    expect(element).toHaveAttribute("aria-label", text);
  });

  it("renders the label with default value if prop text is undefined", (): void => {
    const { container } = setup({ text: undefined });

    const element: HTMLElement | null = container.querySelector(".label");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(EMPTY_STRING);
    expect(element).toHaveAttribute("aria-label", EMPTY_STRING_TEXT);
  });

  it("calls hook useWarnIfEmptyText", (): void => {
    setup();

    expect(useWarnIfEmptyText).toHaveBeenCalledTimes(1);
    expect(useWarnIfEmptyText).toHaveBeenCalledWith(text);
  });
});
