import "./App.css";
import Button from "./components/atoms/Button/Button.tsx";

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
    </>
  );
}

export default App;
