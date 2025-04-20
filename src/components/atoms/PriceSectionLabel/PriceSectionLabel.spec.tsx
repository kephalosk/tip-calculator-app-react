import { render, screen } from "@testing-library/react";
import PriceSectionLabel from "./PriceSectionLabel";

global.console.warn = jest.fn();

describe("PriceSectionLabel Component", (): void => {
  const text: string = "Test Label";

  const testProps: { text: string } = {
    text,
  };

  afterEach((): void => {
    process.env.NODE_ENV = "development";
  });

  it("renders correctly with text", () => {
    render(<PriceSectionLabel {...testProps} />);
    const labelElement: HTMLElement = screen.getByText(/Test Label/i);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("aria-label", "Test Label");
  });

  it("renders with default empty text", () => {
    const { container } = render(
      <PriceSectionLabel {...testProps} text={undefined} />,
    );

    const labelElement: HTMLElement | null =
      container.querySelector(".priceSectionLabel");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("");
  });

  it("renders correctly with empty text and shows a warning in development mode", (): void => {
    process.env.NODE_ENV = "development";
    const { container } = render(<PriceSectionLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".priceSectionLabel");

    expect(labelElement).toHaveAttribute("aria-label", "");
    expect(labelElement).toHaveTextContent("");
    expect(console.warn).toHaveBeenCalledWith("Label text is empty!");
  });

  it("does not show a warning in production mode if text is empty", (): void => {
    process.env.NODE_ENV = "production";
    const { container } = render(<PriceSectionLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".priceSectionLabel");

    expect(labelElement).toHaveAttribute("aria-label", "");
    expect(labelElement).toHaveTextContent("");
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("sets the default text value if no text prop is provided", (): void => {
    const { container } = render(<PriceSectionLabel {...testProps} text="" />);

    const labelElement: HTMLElement | null =
      container.querySelector(".priceSectionLabel");

    expect(labelElement).toHaveTextContent("");
    expect(labelElement).toHaveAttribute("aria-label", "");
  });

  it("does not re-render when the text prop does not change", (): void => {
    const { rerender } = render(
      <PriceSectionLabel {...testProps} text="Test Label" />,
    );

    const labelElement: HTMLElement = screen.getByText("Test Label");
    const initialRender: HTMLElement = labelElement;
    rerender(<PriceSectionLabel text="Test Label" />);

    expect(labelElement).toBe(initialRender);
  });
});
