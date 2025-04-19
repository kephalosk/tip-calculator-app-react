import "./App.css";
import Button from "./components/atoms/Button/Button.tsx";
import Input from "@/components/atoms/Input/Input.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import ErrorLabel from "@/components/label/ErrorLabel/ErrorLabel.tsx";
import TipFieldLabel from "@/components/atoms/TipFieldLabel/TipFieldLabel.tsx";
import { useState } from "react";
import PriceLabel from "@/components/atoms/PriceLabel/PriceLabel.tsx";
import PriceSectionLabel from "@/components/atoms/PriceSectionLabel/PriceSectionLabel.tsx";
import PriceSectionDivisorLabel from "@/components/atoms/PriceSectionDivisorLabel/PriceSectionDivisorLabel.tsx";

function App() {
  const [active, setActive] = useState<boolean>(false);
  const handleButtonClick = () => {
    console.log("click");
  };

  const handleChange = (): void => {
    setActive(true);
  };

  return (
    <div className="app">
      <Label text="Select Tip %" />
      <HeadlineLabel text="Select Tip %" />
      <ErrorLabel text="Error Message!" />
      <TipFieldLabel
        text="50%"
        isActive={active}
        propagateChange={handleChange}
      />
      <PriceLabel text="00.0" />
      <PriceSectionLabel text="Tip Amount" />
      <PriceSectionDivisorLabel text="/ person" />
      <Button
        text="Reset"
        isDisabled={false}
        handleButtonClick={handleButtonClick}
      />
      <Input
        id="customtip"
        name="custom tip"
        propagateValue={(value: number) => console.log(value)}
        placeholder="Custom"
        maxValue={10000}
        allowDecimals={true}
      />
    </div>
  );
}

export default App;
