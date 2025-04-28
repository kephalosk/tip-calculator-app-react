import { ReactElement } from "react";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";
import { render } from "@testing-library/react";
import {
  EMPTY_TEXT_WARNING_MESSAGE,
  ENVIRONMENT_DEVELOPMENT,
  ENVIRONMENT_PRODUCTION,
} from "@/globals/constants/constants.ts";

jest.spyOn(console, "warn").mockImplementation((): void | null => null);

describe("useWarnIfEmptyText", (): void => {
  const definedText: string = "not empty";
  const emptyText: string = "";

  const TestComponent = ({ text }: { text: string }): ReactElement => {
    useWarnIfEmptyText(text);
    return <></>;
  };

  afterAll((): void => {
    process.env.NODE_ENV = ENVIRONMENT_DEVELOPMENT;
  });

  it("does not call console.warn if text is not empty", (): void => {
    process.env.NODE_ENV = ENVIRONMENT_DEVELOPMENT;

    render(<TestComponent text={definedText} />);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("calls console.warn in development environment if text is empty", (): void => {
    process.env.NODE_ENV = ENVIRONMENT_DEVELOPMENT;

    render(<TestComponent text={emptyText} />);

    expect(console.warn).toHaveBeenCalledWith(EMPTY_TEXT_WARNING_MESSAGE);
  });

  it("does not call console.warn in production environment if text is empty", (): void => {
    process.env.NODE_ENV = ENVIRONMENT_PRODUCTION;

    render(<TestComponent text={emptyText} />);

    expect(console.warn).not.toHaveBeenCalled();
  });
});
