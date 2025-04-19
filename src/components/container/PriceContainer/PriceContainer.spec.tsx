import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";
import App from "@/App.tsx";

describe("App", (): void => {
  it("renders App", (): void => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const element: HTMLElement | null = container.querySelector(".app");

    expect(element).toBeInTheDocument();
  });
});
