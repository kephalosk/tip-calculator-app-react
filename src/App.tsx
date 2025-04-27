import "./App.scss";
import CardContainer from "@/components/container/CardContainer/CardContainer.tsx";
import { LOGO_ICON_SRC } from "@/globals/constants/ressources.ts";
import { LOGO_ICON_ALT_TEXT } from "@/globals/constants/constants.ts";

function App() {
  return (
    <div className="app">
      <img
        className="appIcon"
        src={LOGO_ICON_SRC}
        alt={LOGO_ICON_ALT_TEXT}
        aria-hidden="true"
      />
      <CardContainer />
    </div>
  );
}

export default App;
