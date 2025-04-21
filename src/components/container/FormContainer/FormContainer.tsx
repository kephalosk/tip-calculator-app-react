import "./FormContainer.scss";
import { ReactElement } from "react";
import BillContainer from "@/components/container/BillContainer/BillContainer.tsx";
import TipContainer from "@/components/container/TipContainer/TipContainer.tsx";
import PeopleContainer from "@/components/container/PeopleContainer/PeopleContainer.tsx";

const FormContainer = (): ReactElement => {
  return (
    <div className="formContainer">
      <BillContainer />
      <TipContainer />
      <PeopleContainer />
    </div>
  );
};

export default FormContainer;
