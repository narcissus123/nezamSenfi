import React, { useContext, useState, useEffect } from "react";
import { useGetAllMachineTypesByFilter } from "../../../../../core/services/api";
import { MachineryToolsWrapper } from "../MachineryToolsWrapper/MachineryToolsWrapper";
import { AddMachineType } from "./AddMachineType";
import { MachineTypeList } from "./MachineTypeList";
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

const AdminMachineTypeContext =
  React.createContext<IAdminMachineContext | null>(null);

export const useMachineTypeContext = () => {
  const pc = useContext(AdminMachineTypeContext);
  if (pc === null) {
    throw new Error("useMachineTypeContext Must be inside of Provider");
  }
  return pc;
};

const initialFilter = {
  page: 1,
  pageSize: 10,
  title: "",
};

const AdminMacineTypesContainer: React.FC = () => {
  const [initialPage, setInitialPage] = useState(0);
  const [pageCountList, setPageCount] = useState<number>(0);
  const [listData, setListData] = useState<any>([]);
  const [filterState, setfilterState] = useState<any>(initialFilter);

  const allMachineTypes: any = useGetAllMachineTypesByFilter();

  useEffect(() => {
    // save machin-types to state
    allMachineTypes.mutate({ ...filterState, page: 1 });
  }, [filterState.pageSize]);

  useEffect(() => {
    // save machin-types to state
    if (allMachineTypes.data) {
      setListData(allMachineTypes.data.listItem);
      setPageCount(
        Math.ceil(allMachineTypes.data.totalCount / filterState.pageSize)
      );
    }
  }, [allMachineTypes.isSuccess]);

  return (
    <>
      <AdminMachineTypeContext.Provider
        value={{
          pageCountList,
          initialFilter,
          setPageCount,
          listData,
          setListData,
          filterState,
          setfilterState,
          mutation: allMachineTypes,
          initialPage,
          setInitialPage,
        }}
      >
        <MachineryToolsWrapper text="ثبت و مدیریت انواع ماشین آلات">
          <AddMachineType />
        </MachineryToolsWrapper>
        <MachineryToolsWrapper text="لیست انواع ماشین آلات">
          <MachineTypeList />
        </MachineryToolsWrapper>
      </AdminMachineTypeContext.Provider>
    </>
  );
};

export { AdminMacineTypesContainer };
