import React, { useContext, useState, useEffect } from "react";
import { AdminServicesWrapper } from "../AdminServicesWrapper";
import { AddServicesName } from "./AddServicesName";
import { ServicesNameList } from "./ServicesNameList";
import { UseMutationResult } from "react-query";
import { useGetAllServicesByFilter } from "./../../../../../core/services/api";

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
const initialFilter = {
  page: 1,
  pageSize: 10,
  title: "",
  agriculturalToolTypeId: { value: 0, label: "انتخاب کنید" },
};

const AdminServicesNameContext =
  React.createContext<IAdminMachineContext | null>(null);

export const useServicesNameContext = () => {
  const pc = useContext(AdminServicesNameContext);
  if (pc === null) {
    throw new Error("useServicesNameContext Must be inside of Provider");
  }
  return pc;
};

const AdminServicesNameContainer: React.FC = () => {
  const [pageCountList, setPageCount] = useState<number>(0);
  const [listData, setListData] = useState<any>([]);
  const [filterState, setfilterState] = useState<any>(initialFilter);
  const [initialPage, setInitialPage] = useState(0);

  const allNameServices: any = useGetAllServicesByFilter();

  useEffect(() => {
    allNameServices.mutate({
      ...filterState,
      pag: 1,
      agriculturalToolTypeId: filterState.agriculturalToolTypeId.value,
    });
  }, [filterState.pageSize]);

  useEffect(() => {
    if (allNameServices.data) {
      setListData(allNameServices.data.listItem);
      setPageCount(
        Math.ceil(allNameServices.data.totalCount / filterState.pageSize)
      );
    }
  }, [allNameServices.isSuccess]);

  return (
    <>
      <AdminServicesNameContext.Provider
        value={{
          pageCountList,
          initialFilter,
          setPageCount,
          listData,
          setListData,
          filterState,
          setfilterState,
          mutation: allNameServices,
          initialPage,
          setInitialPage,
        }}
      >
        <AdminServicesWrapper text="ثبت و مدیریت نام ادوات و خدمات">
          <AddServicesName />
        </AdminServicesWrapper>
        <AdminServicesWrapper text="لیست نام ادوات و خدمات">
          <ServicesNameList />
        </AdminServicesWrapper>
      </AdminServicesNameContext.Provider>
    </>
  );
};

export { AdminServicesNameContainer };
