import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import { ListFilter } from "./ListFilter/ListFilter";
import { columns } from "./Columns";
import { useGetOwnedUserUnion } from "../../../../../core/services/api";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { useGetAllIdentityChangeRequestByUnionManger } from "../../../../../core/services/api/change-user-identity-request.api";

const CartableContainer: FC = () => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [ownedUnions, setOwnedUnions] = useState<any>([]);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    userName: "",
    id: 0,
    identityChangeStatus: null,
    description: "",
    dateTime: "",
  });

  const getListMutation = useGetAllIdentityChangeRequestByUnionManger();
  const { data, isSuccess, isFetching }  = useGetOwnedUserUnion()

  useEffect(() => {
    if (data) {
      const result = data.data.result.unions;
      let newOptions: any = [];
      let newUnions: any = [
        {
          label: "سرلیست اتحادیه",
          options: [],
        },
      ];

      result.forEach((row: any) => {
        newOptions.push({
          value: row.unionId,
          label: `${row.unionTitle ? row.unionTitle : ""} (${
            row.countyTitle ? row.countyTitle : ""
          })`,
        });
      });
      newUnions[0].options = newOptions;
      setOwnedUnions(newUnions);
      if (result.length > 0) {
        getListMutation.mutate({
          page: 1,
          pageSize: pageSize,
          unionId: newUnions[0].options[0].value,
        });
        setFilterState((prev: any) => {
          return {
            ...prev,
            unionId: newUnions[0].options[0],
          };
        });
      }
    }
  }, [isSuccess, pageSize]);

  useEffect(() => {
    if (getListMutation.data && getListMutation.data.data.result) {
      if (getListMutation.data && getListMutation.data.data.result) {
        setState(getListMutation.data.data.result.items);
        setPageCount(
          Math.ceil(
            getListMutation.data.data.result.totalCount / filterState.pageSize
          )
        );
      }
    }
  }, [getListMutation.isSuccess]);

  return (
    <Formik
      initialValues={{
        page: 1,
        pageSize: pageSize,
        userName: "",
        id: 0,
        identityChangeStatus: null,
        description: "",
        dateTime: "",
        unionId: null,
      }}
      onSubmit={(value: any) => {
        const searchObj: any = {
          ...filterState,
          userName: value.userName,
          id: 0,
          unionId: value.unionId ? value.unionId.value : 0,
          identityChangeStatus: value.identityChangeStatus
            ? value.identityChangeStatus.value
            : 0,
          description: value.description,
          dateTime: value.dateTime,
        };
        getListMutation.mutate(searchObj);
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
                ownedUnions={ownedUnions}
                getAllUnionLoading={isFetching}
                onResetClick={() => {
                  resetForm();
                }}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>لیست درخواست ها</CardTitle>
            </CardHeader>
            <CardBody>
              <ListTable
                columns={columns}
                isLoading={getListMutation.isLoading || isFetching}
                onPageChange={({ page, pageSize }) => {
                  getListMutation.mutate({
                    ...filterState,
                    page: page,
                    pageSize: pageSize,
                  });
                  setFilterState((old: any) => ({
                    ...old,
                    page: page,
                    pageSize: pageSize,
                  }));
                }}
                tableData={state}
                setPageSize={(val: any) =>
                  setFilterState((old: any) => ({
                    ...old,
                    pageSize: val,
                  }))
                }
                pageCountList={pageCountList}
                initialPage={filterState.page - 1}
                setInitialPage={(val: number) =>
                  setFilterState((old: any) => ({
                    ...old,
                    page: val + 1,
                  }))
                }
                customPageSize={filterState.pageSize}
                getCustomProps={{ flow: "UnionManagerIdentityChangeFlow" }}
              >
                {{
                  headerTable: <p></p>,
                }}
              </ListTable>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export { CartableContainer };
