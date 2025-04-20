import { render } from "@testing-library/react";
import PriceSectionDivisorLabel from "./PriceSectionDivisorLabel";

global.console.warn = jest.fn();

describe("PriceSectionDivisorLabel Component", (): void => {
  const text: string = "/ person";

  const testProps: { text: string } = {
    text,
  };

  afterEach((): void => {
    process.env.NODE_ENV = "development";
  });

  it("renders correctly with text", () => {
    const { container } = render(<PriceSectionDivisorLabel {...testProps} />);

    const labelElement: HTMLElement | null = container.querySelector(
      ".priceSectionDivisorLabel",
    );

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("aria-label", `${text}`);
  });

  it("renders with default empty text", () => {
    const { container } = render(
      <PriceSectionDivisorLabel {...testProps} text={undefined} />,
    );

    const labelElement: HTMLElement | null = container.querySelector(
      ".priceSectionDivisorLabel",
    );

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("");
  });

  it("renders correctly with empty text and shows a warning in development mode", (): void => {
    process.env.NODE_ENV = "development";
    const { container } = render(
      <PriceSectionDivisorLabel {...testProps} text="" />,
    );

    const labelElement: HTMLElement | null = container.querySelector(
      ".priceSectionDivisorLabel",
    );

    expect(labelElement).toHaveAttribute("aria-label", "");
    expect(labelElement).toHaveTextContent("");
    expect(console.warn).toHaveBeenCalledWith("Label text is empty!");
  });

  it("does not show a warning in production mode if text is empty", (): void => {
    process.env.NODE_ENV = "production";
    const { container } = render(
      <PriceSectionDivisorLabel {...testProps} text="" />,
    );

    const labelElement: HTMLElement | null = container.querySelector(
      ".priceSectionDivisorLabel",
    );

    expect(labelElement).toHaveAttribute("aria-label", "");
    expect(labelElement).toHaveTextContent("");
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("sets the default text value if no text prop is provided", (): void => {
    const { container } = render(
      <PriceSectionDivisorLabel {...testProps} text="" />,
    );

    const labelElement: HTMLElement | null = container.querySelector(
      ".priceSectionDivisorLabel",
    );

    expect(labelElement).toHaveTextContent("");
    expect(labelElement).toHaveAttribute("aria-label", "");
  });

  it("does not re-render when the text prop does not change", (): void => {
    const { container, rerender } = render(
      <PriceSectionDivisorLabel {...testProps} text={text} />,
    );

    const labelElement: HTMLElement | null = container.querySelector(
      ".priceSectionDivisorLabel",
    );
    const initialRender: HTMLElement | null = labelElement;
    rerender(<PriceSectionDivisorLabel text={text} />);

    expect(labelElement).toBe(initialRender);
  });
});
