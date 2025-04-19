import "./App.css";
import Button from "./components/atoms/Button/Button.tsx";
import Input from "@/components/atoms/Input/Input.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import ErrorLabel from "@/components/label/ErrorLabel/ErrorLabel.tsx";
import TipFieldLabel from "@/components/atoms/TipFieldLabel/TipFieldLabel.tsx";
import React, { useState } from "react";

function App() {
  const [active, setActive] = useState<boolean>(false);
  const handleButtonClick = () => {
    console.log("click");
  };

  const handleChange = (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ): void => {
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
