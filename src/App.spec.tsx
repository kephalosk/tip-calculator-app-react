import {render} from "@testing-library/react";
import App from "./App.tsx";

describe('App',(): void => {
   it('renders card',(): void=>{
      const {container } = render(<App />);

      const element: HTMLElement | null = container.querySelector('.card');

      expect(element).toBeInTheDocument();
   });
});