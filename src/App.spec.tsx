import { render, screen } from "@testing-library/react";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";
import CardContainer from "@/components/container/CardContainer/CardContainer.tsx";
import { ReactElement } from "react";
import { LOGO_ICON_ALT_TEXT } from "@/globals/constants/constants.ts";
import { LOGO_ICON_SRC } from "@/globals/constants/ressources.ts";

const cardContainerTestId: string = "card-container";
jest.mock(
  "@/components/container/CardContainer/CardContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={cardContainerTestId}></div>;
    }),
);

jest.mock(
  "@/redux/store.ts",
  (): {
    __esModule: boolean;
    store: {
      getState: jest.Mock;
      dispatch: jest.Mock;
      subscribe: jest.Mock;
    };
  } => ({
    __esModule: true,
    store: {
      getState: jest.fn(),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    },
  }),
);

describe("App", (): void => {
  it("renders div app", (): void => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const element: HTMLElement | null = container.querySelector(".app");

    expect(element).toBeInTheDocument();
  });

  it("renders img appIcon", (): void => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const element: HTMLElement | null = container.querySelector(".appIcon");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("alt", LOGO_ICON_ALT_TEXT);
    expect(element).toHaveAttribute("aria-hidden", "true");
    expect(element).toHaveAttribute("src", LOGO_ICON_SRC);
  });

  it("renders component CardContainer", (): void => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const element: HTMLElement | null = screen.getByTestId(cardContainerTestId);

    expect(element).toBeInTheDocument();
    expect(CardContainer).toHaveBeenCalledTimes(1);
    expect(CardContainer).toHaveBeenCalledWith({}, undefined);
  });
});
