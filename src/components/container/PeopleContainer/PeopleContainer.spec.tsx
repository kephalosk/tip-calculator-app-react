import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import Input from "@/components/atoms/Input/Input.tsx";
import React, { ReactNode } from "react";
import PeopleContainer from "@/components/container/PeopleContainer/PeopleContainer.tsx";
import {
  PEOPLE_ICON_ALT_TEXT,
  PEOPLE_INPUT_ID,
  PEOPLE_INPUT_NAME,
} from "@/globals/constants/constants.ts";
import { PEOPLE_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { setPeopleValue } from "@/redux/slices/peopleSlice.ts";

const headlineTestId: string = "headline-label";
jest.mock(
  "@/components/label/HeadlineLabel/HeadlineLabel",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div data-testid={headlineTestId}>{props.text}</div>
      ),
    ),
);

const inputTestId: string = "input";
jest.mock(
  "@/components/atoms/Input/Input",
  (): jest.Mock =>
    jest.fn((props) => (
      <input
        data-testid={inputTestId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.propagateValue(e.target.value, e)
        }
      />
    )),
);

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

jest.mock(
  "@/redux/slices/peopleSlice.ts",
  (): { setPeopleValue: jest.Mock } => ({
    setPeopleValue: jest.fn(),
  }),
);

jest.spyOn(console, "error").mockImplementation((): void | null => null);

describe("PeopleContainer", (): void => {
  const dispatch: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  it("renders div peopleContainer", (): void => {
    const { container } = render(<PeopleContainer />);

    const headlineLabel: HTMLElement | null =
      container.querySelector(".peopleContainer");

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the HeadlineLabel with correct text", (): void => {
    render(<PeopleContainer />);

    const headlineLabel: HTMLElement = screen.getByTestId(headlineTestId);

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders span peopleContainerInput", (): void => {
    const { container } = render(<PeopleContainer />);

    const headlineLabel: HTMLElement | null = container.querySelector(
      ".peopleContainerInput",
    );

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the Input component with correct props", (): void => {
    render(<PeopleContainer />);

    const inputElement: HTMLElement = screen.getByTestId(inputTestId);

    expect(inputElement).toBeInTheDocument();
    expect(Input).toHaveBeenCalledWith(
      {
        allowDecimals: true,
        id: PEOPLE_INPUT_ID,
        maxValue: PEOPLE_INPUT_MAX_VALUE,
        name: PEOPLE_INPUT_NAME,
        propagateValue: expect.any(Function),
      },
      undefined,
    );
  });

  it("calls updatePeopleValue when input value changes", (): void => {
    render(<PeopleContainer />);

    const input: HTMLElement = screen.getByTestId(inputTestId);
    fireEvent.change(input, { target: { value: PEOPLE_INPUT_MAX_VALUE } });

    expect(dispatch).toHaveBeenCalledWith(
      setPeopleValue(PEOPLE_INPUT_MAX_VALUE),
    );
  });

  it("renders the dollar icon image with correct alt text", (): void => {
    const { container } = render(<PeopleContainer />);

    const imgElement: HTMLElement | null = container.querySelector(
      ".peopleContainerInputIcon",
    );

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      "src/assets/images/icon-person.svg",
    );
    expect(imgElement).toHaveAttribute("alt", PEOPLE_ICON_ALT_TEXT);
  });

  it("does not call updatePeopleValue with invalid input", (): void => {
    render(<PeopleContainer />);

    const input: HTMLElement = screen.getByTestId(inputTestId);
    fireEvent.change(input, { target: { value: -1 } });

    expect(dispatch).not.toHaveBeenCalled();
  });
});
