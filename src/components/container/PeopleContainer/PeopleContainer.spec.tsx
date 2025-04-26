import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/atoms/Input/Input.tsx";
import React, { ReactNode } from "react";
import PeopleContainer from "@/components/container/PeopleContainer/PeopleContainer.tsx";
import {
  PEOPLE_ICON_ALT_TEXT,
  PEOPLE_INPUT_ERROR_MESSAGE,
  PEOPLE_INPUT_ID,
  PEOPLE_INPUT_NAME,
  PEOPLE_LABEL,
} from "@/globals/constants/constants.ts";
import { PEOPLE_INPUT_MAX_VALUE } from "@/globals/config.ts";
import usePeopleUpdate from "@/hooks/redux/usePeopleUpdate";
import { usePeopleReset } from "@/hooks/redux/usePeopleReset";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import ErrorLabel from "@/components/label/ErrorLabel/ErrorLabel.tsx";
import { PEOPLE_ICON_SRC } from "@/globals/constants/ressources.ts";

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

const errorTestId: string = "error-label";
jest.mock(
  "@/components/label/ErrorLabel/ErrorLabel.tsx",
  (): jest.Mock =>
    jest.fn((props) => (
      <label data-testid={errorTestId} className={errorTestId}>
        {props.text}
      </label>
    )),
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

jest.mock(
  "@/hooks/redux/usePeopleUpdate.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/usePeopleReset.ts",
  (): {
    __esModule: boolean;
    usePeopleReset: jest.Mock;
  } => ({
    __esModule: true,
    usePeopleReset: jest.fn(),
  }),
);

describe("PeopleContainer", (): void => {
  const hasError: boolean = false;
  const handlePeopleUpdateMock: jest.Mock = jest.fn();
  const triggerReset: boolean = false;

  const usePeopleUpdateMock: {
    hasError: boolean;
    handlePeopleUpdate: jest.Mock;
  } = {
    hasError,
    handlePeopleUpdate: handlePeopleUpdateMock,
  };

  const usePeopleResetMock: {
    triggerReset: boolean;
  } = {
    triggerReset,
  };

  beforeEach((): void => {
    (usePeopleUpdate as jest.Mock).mockReturnValue(usePeopleUpdateMock);
    (usePeopleReset as jest.Mock).mockReturnValue(usePeopleResetMock);
  });

  it("renders div peopleContainer", (): void => {
    const { container } = render(<PeopleContainer />);

    const headlineLabel: HTMLElement | null =
      container.querySelector(".peopleContainer");

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders div peopleContainerHeader", (): void => {
    const { container } = render(<PeopleContainer />);

    const headlineLabel: HTMLElement | null = container.querySelector(
      ".peopleContainerHeader",
    );

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the HeadlineLabel with correct text", (): void => {
    render(<PeopleContainer />);

    const headlineLabel: HTMLElement = screen.getByTestId(headlineTestId);

    expect(headlineLabel).toBeInTheDocument();
    expect(HeadlineLabel).toHaveBeenCalledWith(
      { text: PEOPLE_LABEL },
      undefined,
    );
  });

  it("renders component ErrorLabel when hasError is true", (): void => {
    (usePeopleUpdate as jest.Mock).mockReturnValue({
      ...usePeopleUpdateMock,
      hasError: true,
    });
    render(<PeopleContainer />);

    const errorLabel: HTMLElement = screen.getByTestId(errorTestId);

    expect(errorLabel).toBeInTheDocument();
    expect(ErrorLabel).toHaveBeenCalledWith(
      { text: PEOPLE_INPUT_ERROR_MESSAGE },
      undefined,
    );
  });

  it("does not render component ErrorLabel when hasError is false", (): void => {
    (usePeopleUpdate as jest.Mock).mockReturnValue({
      ...usePeopleUpdateMock,
      hasError: false,
    });
    const { container } = render(<PeopleContainer />);

    const headlineLabel: HTMLElement | null =
      container.querySelector(errorTestId);
    expect(headlineLabel).not.toBeInTheDocument();
    expect(ErrorLabel).not.toHaveBeenCalled();
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
        id: PEOPLE_INPUT_ID,
        name: PEOPLE_INPUT_NAME,
        maxValue: PEOPLE_INPUT_MAX_VALUE,
        propagateValue: handlePeopleUpdateMock,
        allowDecimals: false,
        hasError,
        triggerReset,
      },
      undefined,
    );
  });

  it("renders the dollar icon image with correct alt text", (): void => {
    const { container } = render(<PeopleContainer />);

    const imgElement: HTMLElement | null = container.querySelector(
      ".peopleContainerInputIcon",
    );

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", PEOPLE_ICON_SRC);
    expect(imgElement).toHaveAttribute("alt", PEOPLE_ICON_ALT_TEXT);
    expect(imgElement).toHaveAttribute("aria-hidden", "true");
  });

  it("calls handlePeopleUpdate when input value changes", (): void => {
    render(<PeopleContainer />);

    const input: HTMLElement = screen.getByTestId(inputTestId);
    fireEvent.change(input, { target: { value: PEOPLE_INPUT_MAX_VALUE } });

    expect(handlePeopleUpdateMock).toHaveBeenCalledWith(
      `${PEOPLE_INPUT_MAX_VALUE}`,
      expect.any(Object),
    );
  });
});
