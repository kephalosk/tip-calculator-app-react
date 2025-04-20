import { render } from "@testing-library/react";
import PriceLabel from "./PriceLabel";

global.console.warn = jest.fn();

describe("PriceLabel Component", (): void => {
  const text: string = "0.00";

  const testProps: { text: string } = {
    text,
  };

  afterEach((): void => {
    process.env.NODE_ENV = "development";
  });

  it("renders correctly with text", () => {
    const { container } = render(<PriceLabel {...testProps} />);

    const labelElement: HTMLElement | null =
      container.querySelector(".priceLabel");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("aria-label", `$${text}`);
  });

  it("renders with default empty text", () => {
    const { container } = render(
      <PriceLabel {...testProps} text={undefined} />,
    );

    const labelElement: HTMLElement | null =
      container.querySelector(".priceLabel");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("$");
  });

  it("renders correctly with empty text and shows a warning in development mode", (): void => {
    process.env.NODE_ENV = "development";
    const { container } = render(<PriceLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".priceLabel");

    expect(labelElement).toHaveAttribute("aria-label", "$");
    expect(labelElement).toHaveTextContent("$");
    expect(console.warn).toHaveBeenCalledWith("Label text is empty!");
  });

  it("does not show a warning in production mode if text is empty", (): void => {
    process.env.NODE_ENV = "production";
    const { container } = render(<PriceLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".priceLabel");

    expect(labelElement).toHaveAttribute("aria-label", "$");
    expect(labelElement).toHaveTextContent("$");
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("sets the default text value if no text prop is provided", (): void => {
    const { container } = render(<PriceLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".priceLabel");

    expect(labelElement).toHaveTextContent("$");
    expect(labelElement).toHaveAttribute("aria-label", "$");
  });

  it("does not re-render when the text prop does not change", (): void => {
    const { container, rerender } = render(
      <PriceLabel {...testProps} text={text} />,
    );

    const labelElement: HTMLElement | null =
      container.querySelector(".priceLabel");
    const initialRender: HTMLElement | null = labelElement;
    rerender(<PriceLabel text={text} />);

    expect(labelElement).toBe(initialRender);
  });
});
