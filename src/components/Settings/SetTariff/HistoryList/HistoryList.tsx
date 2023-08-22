import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { CurrencyMask, RemoveCurrencyMask } from "../../../../core/utils";
import { ListTable } from "../../../common/ListTable/ListTable";
import { columns } from "./Columns";

interface IFilterState {
  page: number;
  pageSize: number;
  date: string;
  rate: number;
  createdAt: string;
  type?: number;
  provinceId?: number;
  countyId?: number;
  unionId?: number;
}

interface IPropTypes {
  useGetHistoryList: any;
  children: { FilterSearch: any };
  refetch: boolean;
  deleteMutation: any
  setRefetch: any
}

const HistoryList: FC<IPropTypes> = ({
  useGetHistoryList,
  children: { FilterSearch },
  refetch,
  deleteMutation,
  setRefetch
}) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [filterState, setFilterState] = useState<IFilterState>({
    page: 1,
    pageSize: 10,
    createdAt: "",
    date: "",
    rate: 0,
    type: 1,
  });

  const getList = useGetHistoryList();

  useEffect(() => {
    getList.mutate(filterState);
  }, [filterState.pageSize, refetch]);

  useEffect(() => {
    if (getList.isSuccess) {
      try {
        const result = getList.data.data.result;
        const items = result.items.map((old: any) => ({
          ...old,
          rate: CurrencyMask(old.rate) + " ریال",
        }));
        console.log(result);
        setTableData(items);
        setPageCount(Math.ceil(result.totalCount / filterState.pageSize));
      } catch (error) {}
    }
  }, [getList.isSuccess]);

  const onSearch = (values: any) => {
    const objectSearch: IFilterState = {
      ...filterState,
      rate: values.rate ? RemoveCurrencyMask(values.rate) : 0,
      createdAt: values.createdAt ? values.createdAt : "",
      date: values.date ? values.date : "",
      type:
        values.province && values.province.value === 0
          ? 1
          : !values.county
          ? 2
          : values.county.value === 0
          ? 2
          : !values.union
          ? 3
          : values.union.value === 0
          ? 3
          : 4,
      provinceId:
        values.union && values.union.value !== 0
          ? 0
          : values.county && values.county.value !== 0
          ? 0
          : values.province
          ? values.province.value
          : 0,
      countyId:
        values.union && values.union.value !== 0
          ? 0
          : values.province && values.province.value === 0
          ? 0
          : values.county
          ? values.county.value
          : 0,
      unionId:
        (values.province && values.province.value === 0) ||
        (values.county && values.county.value === 0)
          ? 0
          : values.union
          ? values.union.value
          : 0,
    };
    setFilterState(objectSearch);

    getList.mutate(objectSearch);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تاریخچه</CardTitle>
      </CardHeader>

      <CardBody>
        <FilterSearch onSubmit={onSearch} isLoading={getList.isLoading} />

        <ListTable
          columns={columns}
          isLoading={getList.isLoading}
          onPageChange={({ page, pageSize }) =>
            getList.mutate({ ...filterState, page: page, pageSize: pageSize })
          }
          pageCountList={pageCount}
          tableData={tableData}
          customPageSize={filterState.pageSize}
          initialPage={filterState.page - 1}
          getCustomProps={{ deleteMutation, setRefetch }}
          setInitialPage={(val: number) =>
            setFilterState((old) => ({ ...old, page: val + 1 }))
          }
          setPageSize={(val: number) =>
            setFilterState((old) => ({ ...old, pageSize: val }))
          }
        >
          {{ headerTable: <p></p> }}
        </ListTable>
      </CardBody>
    </Card>
  );
};

export { HistoryList };
