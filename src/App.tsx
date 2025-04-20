import "./App.css";
import Input from "@/components/atoms/Input/Input.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import ErrorLabel from "@/components/label/ErrorLabel/ErrorLabel.tsx";
import PriceLabel from "@/components/atoms/PriceLabel/PriceLabel.tsx";
import PriceSectionLabel from "@/components/atoms/PriceSectionLabel/PriceSectionLabel.tsx";
import PriceSectionDivisorLabel from "@/components/atoms/PriceSectionDivisorLabel/PriceSectionDivisorLabel.tsx";
import BillContainer from "@/components/container/BillContainer/BillContainer.tsx";
import TipContainer from "@/components/container/TipContainer/TipContainer.tsx";

function App() {
  return (
    <div className="app">
      <Label text="Select Tip %" />
      <HeadlineLabel text="Select Tip %" />
      <ErrorLabel text="Error Message!" />
      <PriceLabel text="00.0" />
      <PriceSectionLabel text="Tip Amount" />
      <PriceSectionDivisorLabel text="/ person" />
      <BillContainer />
      <TipContainer />
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
