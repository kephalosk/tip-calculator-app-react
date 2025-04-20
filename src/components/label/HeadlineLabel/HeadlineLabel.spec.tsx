import { cleanup, render, screen } from "@testing-library/react";
import HeadlineLabel from "./HeadlineLabel.tsx";
import Label from "@/components/atoms/Label/Label.tsx";

jest.mock("@/components/atoms/Label/Label.tsx", () => ({
  __esModule: true,
  default: jest.fn(({ text }: { text: string }) => <div>{text}</div>),
}));

describe("HeadlineLabel Component", (): void => {
  const text: string = "Test Headline";

  const testProps: { text: string } = {
    text,
  };

  afterEach(cleanup);

  it("renders HeadlineLabel with the provided text", (): void => {
    render(<HeadlineLabel {...testProps} />);

    const labelElement: HTMLElement = screen.getByText(text);
    expect(labelElement).toBeInTheDocument();
  });

  it("applies the correct class to the span element", (): void => {
    const { container } = render(<HeadlineLabel {...testProps} />);

    const spanElement: HTMLElement | null =
      container.querySelector(".headlineLabel");

    expect(spanElement).toBeInTheDocument();
  });

  it("correctly renders and passes down the text prop to Label", (): void => {
    render(<HeadlineLabel {...testProps} />);

    const labelText: HTMLElement = screen.getByText(text);
    expect(labelText).toBeInTheDocument();
  });

  it("does not re-render if the text prop does not change (testing React.memo)", (): void => {
    const { rerender } = render(<HeadlineLabel {...testProps} />);
    const initialRender: HTMLElement = screen.getByText("Test Headline");

    rerender(<HeadlineLabel text="Test Headline" />);

    expect(screen.getByText("Test Headline")).toBe(initialRender);
  });

  it("does not re-render when the text prop is the same (React.memo)", (): void => {
    const { rerender } = render(<HeadlineLabel {...testProps} />);
    expect(Label).toHaveBeenCalledTimes(1);

    rerender(<HeadlineLabel {...testProps} />);
    expect(Label).toHaveBeenCalledTimes(1);
  });
});
