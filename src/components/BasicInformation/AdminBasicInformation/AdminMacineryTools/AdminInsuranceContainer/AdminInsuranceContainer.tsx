import React, { useContext, useState, useEffect } from "react";
import { MachineryToolsWrapper } from "../MachineryToolsWrapper/MachineryToolsWrapper";

import { AddInsurance } from "./AddInsurance";
import { InsuranceList } from "./InsuranceList";
import { UseMutationResult } from "react-query";
import { useGetAllInsurance } from "./../../../../../core/services/api";

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

const AdminInsuranceContext = React.createContext<IAdminMachineContext | null>(
  null
);

export const useAdminInsuranceContext = () => {
  const pc = useContext(AdminInsuranceContext);
  if (pc === null) {
    throw new Error("useAdminInsuranceContext Must be inside of Provider");
  }
  return pc;
};

const AdminInsuranceContainer: React.FC = () => {
  const [pageCountList, setPageCount] = useState<number>(0);
  const [initialPage, setInitialPage] = useState(0);
  const [listData, setListData] = useState<any>([]);
  const [filterState, setfilterState] = useState<any>(initialFilter);

  const allInsurance: any = useGetAllInsurance();

  useEffect(() => {
    // this method run first-time and after change page-size
    allInsurance.mutate({ ...filterState, page: 1 });
  }, [filterState.pageSize]);

  useEffect(() => {
    // save machin-insurance to state
    if (allInsurance.data) {
      setListData(allInsurance.data.listItem);
      setPageCount(
        Math.ceil(allInsurance.data.totalCount / filterState.pageSize)
      );
    }
  }, [allInsurance.isSuccess]);

  return (
    <>
      <AdminInsuranceContext.Provider
        value={{
          pageCountList,
          initialFilter,
          setPageCount,
          listData,
          setListData,
          filterState,
          setfilterState,
          mutation: allInsurance,
          initialPage,
          setInitialPage,
        }}
      >
        <MachineryToolsWrapper text="ثبت و مدیریت شرکت های بیمه">
          <AddInsurance />
        </MachineryToolsWrapper>
        <MachineryToolsWrapper text="لیست شرکت های بیمه">
          <InsuranceList />
        </MachineryToolsWrapper>
      </AdminInsuranceContext.Provider>
    </>
  );
};

export { AdminInsuranceContainer };
