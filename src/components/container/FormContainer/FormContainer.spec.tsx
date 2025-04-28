import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import BillContainer from "@/components/container/BillContainer/BillContainer.tsx";
import FormContainer from "@/components/container/FormContainer/FormContainer.tsx";
import PeopleContainer from "@/components/container/PeopleContainer/PeopleContainer.tsx";
import TipContainer from "@/components/container/TipContainer/TipContainer.tsx";

const billContainerTestId: string = "bill-container";
jest.mock(
  "@/components/container/BillContainer/BillContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactNode => <div data-testid={billContainerTestId}></div>),
);

const tipContainerTestId: string = "tip-container";
jest.mock(
  "@/components/container/TipContainer/TipContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactNode => <div data-testid={tipContainerTestId}></div>),
);

const peopleContainerTestId: string = "people-container";
jest.mock(
  "@/components/container/PeopleContainer/PeopleContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactNode => <div data-testid={peopleContainerTestId}></div>),
);

describe("FormContainer", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<FormContainer />);
  };

  it("renders div formContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".formContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component BillContainer", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(billContainerTestId);

    expect(element).toBeInTheDocument();
    expect(BillContainer).toHaveBeenCalledTimes(1);
    expect(BillContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component TipContainer", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(tipContainerTestId);

    expect(element).toBeInTheDocument();
    expect(TipContainer).toHaveBeenCalledTimes(1);
    expect(TipContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component PeopleContainer", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(
      peopleContainerTestId,
    );

    expect(element).toBeInTheDocument();
    expect(PeopleContainer).toHaveBeenCalledTimes(1);
    expect(PeopleContainer).toHaveBeenCalledWith({}, undefined);
  });
});
