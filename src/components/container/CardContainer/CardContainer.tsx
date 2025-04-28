import "./CardContainer.scss";
import React, { ReactElement } from "react";
import FormContainer from "@/components/container/FormContainer/FormContainer.tsx";
import ResultContainer from "@/components/container/ResultContainer/ResultContainer.tsx";

const CardContainer: React.FC = (): ReactElement => {
  return (
    <div className="cardContainer">
      <FormContainer />
      <ResultContainer />
    </div>
  );
};

export default CardContainer;
