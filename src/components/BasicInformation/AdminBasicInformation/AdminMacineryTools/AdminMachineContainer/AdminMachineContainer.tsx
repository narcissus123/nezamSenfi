import React, { useState, useContext, useEffect } from "react";
import { MachineryToolsWrapper } from "../MachineryToolsWrapper/MachineryToolsWrapper";

import { AddMachine } from "./AddMachine";
import { MachineList } from "./MachineList";
import { useGetAllAdminMachine } from "./../../../../../core/services/api";
import { UseMutationResult } from "react-query";

export interface IAdminMachineContext {
  pageCountList: number;
  setPageCount?: React.Dispatch<React.SetStateAction<number>>;
  listData?: any;
  setListData?: any;
  filterState?: any;
  setfilterState?: any;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  initialFilter: any;
  initialPage: number;
  setInitialPage: React.Dispatch<React.SetStateAction<number>>;
}

const AdminMachineContext = React.createContext<IAdminMachineContext | null>(
  null
);

export const useAdminMachineContext = () => {
  const pc = useContext(AdminMachineContext);
  if (pc === null) {
    throw new Error("useAdminMachineContext Must be inside of Provider");
  }
  return pc;
};

const initialFilter = {
  page: 1,
  pageSize: 10,
  title: "",
  typeMachineId: { value: 0, label: "انتخاب کنید" },
  machineManufacturerId: { value: 0, label: "انتخاب کنید" },
  productionType: { value: 0, label: "انتخاب کنید" },
};

const AdminMachineContainer: React.FC = () => {
  const [pageCountList, setPageCount] = useState<number>(0);
  const [initialPage, setInitialPage] = useState(0);
  const [listData, setListData] = useState<any>([]);
  const [filterState, setfilterState] = useState<any>(initialFilter);

  const getAllMachin: any = useGetAllAdminMachine();

  useEffect(() => {
    getAllMachin.mutate({
      ...filterState,
      page: 1,
      productionType: filterState.productionType.value,
    });
  }, [filterState.pageSize]);

  useEffect(() => {
    if (getAllMachin.data) {
      try {
        setListData(getAllMachin.data.items);
        setPageCount(
          Math.ceil(getAllMachin.data.totalCount / filterState.pageSize)
        );
      } catch (error) {}
    }
  }, [getAllMachin.isSuccess]);

  return (
    <>
      <AdminMachineContext.Provider
        value={{
          pageCountList,
          initialFilter,
          setPageCount,
          listData,
          setListData,
          filterState,
          setfilterState,
          mutation: getAllMachin,
          initialPage,
          setInitialPage,
        }}
      >
        <MachineryToolsWrapper text=" ثبت و مدیریت ماشین آلات ">
          <AddMachine />
        </MachineryToolsWrapper>
        <MachineryToolsWrapper text="لیست ماشین آلات">
          <MachineList />
        </MachineryToolsWrapper>
      </AdminMachineContext.Provider>
    </>
  );
};

export { AdminMachineContainer };
