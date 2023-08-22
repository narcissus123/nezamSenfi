import React, { useContext, useState } from "react";
import { FacilitiesWrapper } from "../FacilitiesWrapper/FacilitiesWrapper";
import { AddTypesOfStructures } from "./AddTypesOfStructures";
import { ListTypesOfStructures } from "./ListTypesOfStructures";


const TypesOfStructuresContainer: React.FC = () => {
  const [fetchRefresh, setFetchRefresh] = useState<boolean>(false);

  return (
    <>
     
        <FacilitiesWrapper text="ثبت و مدیریت انواع سازه هه">
          <AddTypesOfStructures />
        </FacilitiesWrapper>
        <FacilitiesWrapper text="لیست انواع سازه ها">
          <ListTypesOfStructures />
        </FacilitiesWrapper>
    </>
  );
};

export {  TypesOfStructuresContainer };
