import "./CardContainer.scss";
import { ReactElement } from "react";
import FormContainer from "@/components/container/FormContainer/FormContainer.tsx";
import ResultContainer from "@/components/container/ResultContainer/ResultContainer.tsx";

const CardContainer = (): ReactElement => {
  return (
    <div className="cardContainer">
      <FormContainer />
      <ResultContainer />
    </div>
  );
};

export default CardContainer;
