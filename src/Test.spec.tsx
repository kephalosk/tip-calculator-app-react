import { render } from "@testing-library/react";
import Test from "./Test.tsx";

describe("Test", (): void => {
  it("renders div test", (): void => {
    const { container } = render(<Test />);

    const element: HTMLElement | null = container.querySelector(".test");

    expect(element).toBeInTheDocument();
  });
});
