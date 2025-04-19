import { cleanup, render, screen } from "@testing-library/react";
import ErrorLabel from "./ErrorLabel.tsx";
import Label from "@/components/atoms/Label/Label.tsx";

jest.mock("@/components/atoms/Label/Label.tsx", () => ({
  __esModule: true,
  default: jest.fn(({ text }: { text: string }) => <div>{text}</div>),
}));

describe("ErrorLabel Component", (): void => {
  const text: string = "Test Error";

  const testProps: { text: string } = {
    text,
  };

  afterEach(cleanup);

  it("renders ErrorLabel with the provided text", (): void => {
    render(<ErrorLabel {...testProps} />);

    const labelElement = screen.getByText(text);
    expect(labelElement).toBeInTheDocument();
  });

  it("applies the correct class to the span element", (): void => {
    const { container } = render(<ErrorLabel {...testProps} />);

    const spanElement: HTMLElement | null =
      container.querySelector(".headlineLabel");

    expect(spanElement).toBeInTheDocument();
  });

  it("correctly renders and passes down the text prop to Label", (): void => {
    render(<ErrorLabel {...testProps} />);

    const labelText = screen.getByText(text);
    expect(labelText).toBeInTheDocument();
  });

  it("does not re-render if the text prop does not change (testing React.memo)", (): void => {
    const { rerender } = render(<ErrorLabel {...testProps} />);
    const initialRender: HTMLElement = screen.getByText("Test Headline");

    rerender(<ErrorLabel text="Test Error" />);

    expect(screen.getByText("Test Error")).toBe(initialRender);
  });

  it("does not re-render when the text prop is the same (React.memo)", (): void => {
    const { rerender } = render(<ErrorLabel {...testProps} />);
    expect(Label).toHaveBeenCalledTimes(1);

    rerender(<ErrorLabel {...testProps} />);
    expect(Label).toHaveBeenCalledTimes(1);
  });
});
