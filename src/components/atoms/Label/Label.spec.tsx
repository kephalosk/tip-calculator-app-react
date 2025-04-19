import { render, screen } from "@testing-library/react";
import Label from "./Label";

global.console.warn = jest.fn();

describe("Label Component", (): void => {
  const text: string = "Test Label";

  const testProps: { text: string } = {
    text,
  };

  afterEach((): void => {
    process.env.NODE_ENV = "development";
  });

  it("renders correctly with text", () => {
    render(<Label {...testProps} />);
    const labelElement: HTMLElement = screen.getByText(/Test Label/i);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("aria-label", "Test Label");
  });

  it("renders correctly with empty text and shows a warning in development mode", (): void => {
    process.env.NODE_ENV = "development";
    const { container } = render(<Label {...testProps} text="" />);

    const labelElement: HTMLElement | null = container.querySelector(".label");

    expect(labelElement).toHaveAttribute("aria-label", "");
    expect(labelElement).toHaveTextContent("");
    expect(console.warn).toHaveBeenCalledWith("Label text is empty!");
  });

  it("does not show a warning in production mode if text is empty", (): void => {
    process.env.NODE_ENV = "production";
    const { container } = render(<Label {...testProps} text="" />);

    const labelElement: HTMLElement | null = container.querySelector(".label");

    expect(labelElement).toHaveAttribute("aria-label", "");
    expect(labelElement).toHaveTextContent("");
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("sets the default text value if no text prop is provided", (): void => {
    render(<Label {...testProps} text="" />);
    const { container } = render(<Label {...testProps} text="" />);

    const labelElement: HTMLElement | null = container.querySelector(".label");

    expect(labelElement).toHaveTextContent("");
    expect(labelElement).toHaveAttribute("aria-label", "");
  });

  it("does not re-render when the text prop does not change", (): void => {
    const { rerender } = render(<Label {...testProps} text="Test Label" />);

    const labelElement: HTMLElement = screen.getByText("Test Label");
    const initialRender: HTMLElement = labelElement;
    rerender(<Label text="Test Label" />);

    expect(labelElement).toBe(initialRender);
  });
});
