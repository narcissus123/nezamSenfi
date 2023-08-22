import React, { useContext, useState, useEffect } from "react";
import { MachineryToolsWrapper } from "../MachineryToolsWrapper/MachineryToolsWrapper";

import { AddMachineManufacturer } from "./AddMachineManufacturer";
import { MachineManufacturerList } from "./MachineManufacturerList";
import { UseMutationResult } from "react-query";
import { useGetAllMachineManufacturerByFilter } from "../../../../../core/services/api";

export interface IAdminMachineContext {
  pageCountList: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  listData?: any;
  setListData: React.Dispatch<any>;
  filterState?: any;
  setfilterState: React.Dispatch<any>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  initialFilter: any;
  initialPage: number;
  setInitialPage: React.Dispatch<React.SetStateAction<number>>;
}

const initialFilter = {
  page: 1,
  pageSize: 10,
  title: "",
};

const AdminMachineManufacturerContext =
  React.createContext<IAdminMachineContext | null>(null);

export const useMachineManufacturerContext = () => {
  const pc = useContext(AdminMachineManufacturerContext);
  if (pc === null) {
    throw new Error("useMachineManufacturerContext Must be inside of Provider");
  }
  return pc;
};

const AdminMachineManufacturerContainer: React.FC = () => {
  const [initialPage, setInitialPage] = useState(0);
  const [pageCountList, setPageCount] = useState<number>(0);
  const [listData, setListData] = useState<any>([]);
  const [filterState, setfilterState] = useState<any>(initialFilter);

  const allMachineManu: any = useGetAllMachineManufacturerByFilter();

  useEffect(() => {
    allMachineManu.mutate({ ...filterState, page: 1 });
  }, [filterState.pageSize]);

  useEffect(() => {
    if (allMachineManu.data) {
      try {
        setListData(allMachineManu.data.items);
        setPageCount(
          Math.ceil(allMachineManu.data.totalCount / filterState.pageSize)
        );
      } catch (error) {}
    }
  }, [allMachineManu.isSuccess]);

  return (
    <>
      <AdminMachineManufacturerContext.Provider
        value={{
          pageCountList,
          initialFilter,
          setPageCount,
          listData,
          setListData,
          filterState,
          setfilterState,
          mutation: allMachineManu,
          initialPage,
          setInitialPage,
        }}
      >
        <MachineryToolsWrapper text="ثبت و مدیریت شرکت های سازنده">
          <AddMachineManufacturer />
        </MachineryToolsWrapper>
        <MachineryToolsWrapper text="لیست شرکت های سازنده">
          <MachineManufacturerList />
        </MachineryToolsWrapper>
      </AdminMachineManufacturerContext.Provider>
    </>
  );
};

export { AdminMachineManufacturerContainer };
