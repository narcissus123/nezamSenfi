import * as React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { columns } from "./Columns";
import { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";
import { useGetActiveUplevelManagerHistory, useGetMessageSettingHistory } from "../../../../core/services/api";
import { ListTable } from "../../../common/ListTable/ListTable";
import { refetchContext } from "../../../../core/utils/context/EventContext";

const List = () => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);

  const [initialValue, setinitialValue] = useState<any>({
    startDate: "",
    toDate: ""

  });

  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    startDate: "",
    toDate: ""
  });

  const getListMutation = useGetActiveUplevelManagerHistory();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    getListMutation.mutate({
      ...filterState,
      page: 1,
      pageSize: pageSize,
    });

    setFilterState({
      ...filterState,
      page: 1,
      pageSize: pageSize,
    });
  }, [pageSize, refetchEvent.activeUpManagerHistoryList]);

  useEffect(() => {
    if (getListMutation.data && getListMutation.data.data.result) {
      if (getListMutation.data && getListMutation.data.data.result) {
        let items = getListMutation.data.data.result.items ;
        let newData : any = [];

        items.forEach((row: any) => {
          newData.push({
            id: row.id,
            countyUnionIsActive: row.countyUnionIsActive ? "بله" : "خیر",
            countyGuildRoomIsActive: row.countyGuildRoomIsActive ? "بله" : "خیر",
            provinceGuildRoomIsActive: row.provinceGuildRoomIsActive ? "بله" : "خیر",
            startDate: row.startDate,
            toDate: row.toDate,
            modifierUserName: row.modifierUserName,
          });
        });
        setState(newData);
        setPageCount(
          Math.ceil(getListMutation.data.data.result.totalCount / pageSize)
        );
      }
    }
  }, [getListMutation.isSuccess]);

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(value) => {
        const searchObj: any = {
          page: 1,
          pageSize: pageSize,
          startDate: value.startDate,
          toDate: value.toDate,
        };
        getListMutation.mutate(searchObj, {
          onSuccess: () => {
            setFilterState((old: any) => ({
              ...old,
              page: 1,
              pageSize: pageSize,
              startDate: value.startDate,
              toDate: value.toDate,
            }));
          },
        });
      }}
      enableReinitialize={true}
    >
      {({ values, errors, handleChange, resetForm, setFieldValue }) => (
        <Form>
          <Card>
            <CardHeader>
              <CardTitle> جستجو </CardTitle>
            </CardHeader>
            <CardBody>
              <ListFilter
                setFieldValue={setFieldValue}
                getMutation={getListMutation}
                onResetClick={resetForm}
                // setFilterState={setFilterState}
              />
            </CardBody>
          </Card>

          <ListTable
            columns={columns}
            isLoading={getListMutation.isLoading}
            onPageChange={({ page, pageSize }) => {
              getListMutation.mutate({
                ...filterState,
                page: page,
                pageSize: pageSize,
              });
            }}
            tableData={state}
            setPageSize={(val: any) => setPageSize(val)}
            pageCountList={pageCountList}
            initialPage={filterState.page - 1}
            setInitialPage={(val) =>
              setFilterState((old: any) => ({ ...old, page: val + 1 }))
            }
            customPageSize={pageSize}
          >
            {{
              headerTable: <div style={{ width: "200px" }}></div>,
            }}
          </ListTable>
        </Form>
      )}
    </Formik>
  );
};

export { List };
