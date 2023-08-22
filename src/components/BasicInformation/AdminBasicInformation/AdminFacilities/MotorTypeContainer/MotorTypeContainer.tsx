import React, { useContext, useState } from "react";
import { FacilitiesWrapper } from "../FacilitiesWrapper/FacilitiesWrapper";
import { AddMotorType } from "./AddMotorType";
import { ListMotorType } from "./ListMotorType/ListMotorType";

export interface IAdminMachineContext {
  fetchRefresh: boolean;
  setFetchRefresh: any;
}

const AdminServicesTypesContext = React.createContext<IAdminMachineContext | null>(
  null
);

export const useServicesTypesContext = () => {
  const pc = useContext(AdminServicesTypesContext);
  if (pc === null) {
    throw new Error("useRegisterContext Must be inside of Provider");
  }
  return pc;
};

const MotorTypeContainer: React.FC = () => {
  const [fetchRefresh, setFetchRefresh] = useState<boolean>(false);

  return (
    <>
      <AdminServicesTypesContext.Provider
        value={{
          fetchRefresh,
          setFetchRefresh: () => setFetchRefresh((prev) => !prev),
        }}
      >
        <FacilitiesWrapper text="ثبت و مدیریت انواع موتور">
          <AddMotorType />
        </FacilitiesWrapper>
        <FacilitiesWrapper text="لیست انواع موتور">
          <ListMotorType />
        </FacilitiesWrapper>
      </AdminServicesTypesContext.Provider>
    </>
  );
};

export { MotorTypeContainer };
