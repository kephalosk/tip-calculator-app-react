import "./App.css";
import Button from "./components/atoms/Button/Button.tsx";
import Input from "@/components/atoms/Input/Input.tsx";

function App() {
  const handleButtonClick = () => {
    console.log("click");
  };
  return (
    <>
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
    </>
  );
}

export default App;
