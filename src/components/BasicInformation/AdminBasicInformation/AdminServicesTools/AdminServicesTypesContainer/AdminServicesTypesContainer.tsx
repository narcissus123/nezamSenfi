import React, { useContext, useState, useEffect } from "react";
import { AdminServicesWrapper } from "../AdminServicesWrapper";
import { AddServicesTypes } from "./AddServicesTypes";
import { ServicesTypesList } from "./ServicesTypesList";
import { UseMutationResult } from "react-query";
import { useGetAllAdminServices } from "../../../../../core/services/api";

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

const AdminServicesTypesContext =
  React.createContext<IAdminMachineContext | null>(null);

export const useServicesTypesContext = () => {
  const pc = useContext(AdminServicesTypesContext);
  if (pc === null) {
    throw new Error("useServicesTypesContext Must be inside of Provider");
  }
  return pc;
};

const initialFilter = {
  page: 1,
  pageSize: 10,
  title: "",
};

const AdminServicesTypesContainer: React.FC = () => {
  const [initialPage, setInitialPage] = useState(0);
  const [listData, setListData] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [filterState, setfilterState] = useState<any>(initialFilter);

  const allTypeServices: any = useGetAllAdminServices();

  useEffect(() => {
    allTypeServices.mutate({ ...filterState, page: 1 });
  }, [filterState.pageSize]);

  useEffect(() => {
    if (allTypeServices.data) {
      setListData(allTypeServices.data.listItem);
      setPageCount(
        Math.ceil(allTypeServices.data.totalCount / filterState.pageSize)
      );
    }
  }, [allTypeServices.isSuccess]);

  return (
    <>
      <AdminServicesTypesContext.Provider
        value={{
          pageCountList,
          initialFilter,
          setPageCount,
          listData,
          setListData,
          filterState,
          setfilterState,
          mutation: allTypeServices,
          initialPage,
          setInitialPage,
        }}
      >
        <AdminServicesWrapper text="ثبت و مدیریت انواع ادوات و خدمات">
          <AddServicesTypes />
        </AdminServicesWrapper>
        <AdminServicesWrapper text="لیست انواع ادوات و خدمات">
          <ServicesTypesList />
        </AdminServicesWrapper>
      </AdminServicesTypesContext.Provider>
    </>
  );
};

export { AdminServicesTypesContainer };
