import React, { useState } from "react";
import { FacilitiesWrapper } from "../FacilitiesWrapper/FacilitiesWrapper";
import { AddAgeOfConstruction } from "./AddAgeOfConstruction/";
import { ListAgeOfConstruction } from "./ListAgeOfConstruction";




const AgeOfConstructionContainer: React.FC = () => {
  const [fetchRefresh, setFetchRefresh] = useState<boolean>(false);

  return (
    <>

        <FacilitiesWrapper text="ثبت و مدیریت انواع سازه هه">
          <AddAgeOfConstruction />
        </FacilitiesWrapper>
        <FacilitiesWrapper text="لیست انواع سازه ها">
          <ListAgeOfConstruction />
        </FacilitiesWrapper>
    </>
  );
};

export { AgeOfConstructionContainer };
