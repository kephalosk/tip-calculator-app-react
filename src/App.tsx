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
import PeopleContainer from "@/components/container/PeopleContainer/PeopleContainer.tsx";
import PriceContainer from "@/components/container/PriceContainer/PriceContainer.tsx";
import { PRICE_SECTION_LABEL_TEXT_AMOUNT } from "@/globals/constants/constants.ts";
import FormContainer from "@/components/container/FormContainer/FormContainer.tsx";
import ResultContainer from "@/components/container/ResultContainer/ResultContainer.tsx";

function App() {
  return (
    <div className="app">
      <ResultContainer />
      <FormContainer />
      <Label text="Select Tip %" />
      <HeadlineLabel text="Select Tip %" />
      <ErrorLabel text="Error Message!" />
      <PriceLabel text="00.0" />
      <PriceSectionLabel text="Tip Amount" />
      <PriceSectionDivisorLabel text="/ person" />
      <BillContainer />
      <TipContainer />
      <PeopleContainer />
      <PriceContainer
        priceType={PRICE_SECTION_LABEL_TEXT_AMOUNT}
        priceAmount="300000"
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
