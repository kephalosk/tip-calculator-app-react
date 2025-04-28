import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import CardContainer from "@/components/container/CardContainer/CardContainer.tsx";
import FormContainer from "@/components/container/FormContainer/FormContainer.tsx";
import ResultContainer from "@/components/container/ResultContainer/ResultContainer.tsx";

const formContainerTestId: string = "form-container";
jest.mock(
  "@/components/container/FormContainer/FormContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={formContainerTestId}></div>;
    }),
);

const resultContainerTestId: string = "result-container";
jest.mock(
  "@/components/container/ResultContainer/ResultContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={resultContainerTestId}></div>;
    }),
);

describe("CardContainer", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<CardContainer />);
  };

  it("renders div cardContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".cardContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component FormContainer", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(formContainerTestId);

    expect(element).toBeInTheDocument();
    expect(FormContainer).toHaveBeenCalledTimes(1);
    expect(FormContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component ResultContainer", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(
      resultContainerTestId,
    );

    expect(element).toBeInTheDocument();
    expect(ResultContainer).toHaveBeenCalledTimes(1);
    expect(ResultContainer).toHaveBeenCalledWith({}, undefined);
  });
});
