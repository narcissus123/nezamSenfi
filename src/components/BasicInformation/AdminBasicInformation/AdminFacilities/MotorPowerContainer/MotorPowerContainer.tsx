import React, { useContext, useState } from "react";
import { FacilitiesWrapper } from "../FacilitiesWrapper";
import { AddMotorPower } from "./AddMotorPower";
import { ListMotorPower } from "./ListMotorPower";

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

const MotorPowerContainer: React.FC = () => {
  const [fetchRefresh, setFetchRefresh] = useState<boolean>(false);

  return (
    <>
      <AdminServicesTypesContext.Provider
        value={{
          fetchRefresh,
          setFetchRefresh: () => setFetchRefresh((prev) => !prev),
        }}
      >
        <FacilitiesWrapper text="ثبت و مدیریت انواع قدرت موتور">
          <AddMotorPower />
        </FacilitiesWrapper>
        <FacilitiesWrapper text="لیست انواع قدرت موتور">
          <ListMotorPower />
        </FacilitiesWrapper>
      </AdminServicesTypesContext.Provider>
    </>
  );
};

export { MotorPowerContainer };
