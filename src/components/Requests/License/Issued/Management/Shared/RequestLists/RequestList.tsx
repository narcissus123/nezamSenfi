import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { ListFilter } from "./ListFilter";

interface IPropTypes {
  getMutation: any;
  columns: any;
  flow?: string;
  getOwnedUnion?: any;
  ownedListFilter?: React.FC<any>;
}
const RequestList: FC<IPropTypes> = ({
  getMutation,
  columns,
  flow,
  getOwnedUnion,
  ownedListFilter: OwnedListFilter,
}) => {
  const [state, setState] = useState<any>([]);
  const [isLoadedForcedApi, setIsLoadedForcedApi] = useState<boolean>(
    getOwnedUnion ? false : true
  );
  const [initialPage, setInitialPage] = useState<number>(0);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);
  // const [managerLoading, setManagerLoading] = useState<any>(false);
  // const [adminLoading, setAdminLoading] = useState<any>(false);

  const [filterState, setFilterState] = useState<any>({
    fixedOrMobieType: 0,
    status: 0,
    page: 1,
    pageSize: pageSize,
    cityOrVillageId: 0,
    unionId: 0,
    unionUseTypeJobId: 0,
    provinceId: 0,
    countyId: 0,
    cityId: 0,
    villageId: 0,
  });

  const getListMutation = getMutation();

  useEffect(() => {
    if (getOwnedUnion?.isSuccess) {
      setIsLoadedForcedApi(true);
    }
  }, [getOwnedUnion?.isSuccess]);

  useEffect(() => {
    if (isLoadedForcedApi)
      getListMutation.mutate({
        countyUnionId: filterState.unionId,
        page: 1,
        pageSize: pageSize,
      });
  }, [pageSize]);

  useEffect(() => {
    if (getListMutation.data && getListMutation.data.data.result) {
      if (getListMutation.data && getListMutation.data.data.result) {
        setState(getListMutation.data.data.result.items);
        setPageCount(
          Math.ceil(getListMutation.data.data.result.totalCount / pageSize)
        );
      }
    }
  }, [getListMutation.isSuccess]);

  const onSubmit = (value: any) => {
    const searchObj: any = {
      fixedOrMobieType: value.fixedOrMobieType
        ? value.fixedOrMobieType.value
        : 0,
      countyUnionId: value.unionId ? value.unionId.value : 0,
      page: 1,
      pageSize: pageSize,
      unionUseTypeJobId: value.unionUseTypeJobId
        ? value.unionUseTypeJobId.value
        : 0,
      cityOrVillageId: value.cityId
        ? value.cityId.value
        : value.villageId
        ? value.villageId.value
        : 0,
      status: value.status ? value.status.value : 0,
    };
    getListMutation.mutate(searchObj);

    if (getOwnedUnion) {
      setFilterState((old: any) => ({ ...old, unionId: value.unionId }));
    }
    setInitialPage(0);
  };

  return (
    <Formik
      initialValues={filterState}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        handleChange,
        resetForm,
        setFieldValue,
        submitForm,
      }) => (
        <Form>
          <Card>
            <CardHeader>
              <CardTitle> جستجو </CardTitle>
            </CardHeader>
            <CardBody>
              {OwnedListFilter ? (
                <OwnedListFilter
                  setFieldValue={setFieldValue}
                  submitForm={submitForm}
                  getMutation={getListMutation}
                  onResetClick={() => {
                    const union = values.unionId;
                    resetForm();
                    setFilterState((old: any) => ({ ...old, unionId: union }));
                  }}
                  ownedUserUnion={getOwnedUnion ? getOwnedUnion : null}
                />
              ) : (
                <ListFilter
                  setFieldValue={setFieldValue}
                  submitForm={submitForm}
                  getMutation={getListMutation}
                  onResetClick={() => {
                    const union = values.unionId;
                    resetForm();
                    setFilterState((old: any) => ({ ...old, unionId: union }));
                  }}
                  ownedUserUnion={getOwnedUnion ? getOwnedUnion : null}
                />
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>لیست درخواست ها</CardTitle>
            </CardHeader>
            <CardBody>
              <ListTable
                columns={columns}
                isLoading={
                  getListMutation.isLoading ||
                  (getOwnedUnion && getOwnedUnion.isLoading)
                }
                onPageChange={({ page, pageSize }) => {
                  getListMutation.mutate({
                    fixedOrMobieType: values.fixedOrMobieType
                      ? values.fixedOrMobieType.value
                      : 0,
                    countyUnionId:
                      typeof values.unionId === "number"
                        ? values.unionId
                        : values.unionId
                        ? values.unionId.value
                        : 0,
                    unionUseTypeJobId: values.unionUseTypeJobId
                      ? values.unionUseTypeJobId.value
                      : 0,
                    cityOrVillageId: values.cityId
                      ? values.cityId.value
                      : values.villageId
                      ? values.villageId.value
                      : 0,
                    status: values.status ? values.status.value : 0,
                    page: page,
                    pageSize: pageSize,
                  });
                }}
                tableData={state}
                setPageSize={(val: any) => {
                  setPageSize(val);
                }}
                pageCountList={pageCountList}
                customPageSize={pageSize}
                getCustomProps={{ flow: flow }}
                initialPage={initialPage}
                setInitialPage={setInitialPage}
              >
                {{
                  headerTable: <div style={{ width: "200px" }}></div>,
                }}
              </ListTable>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export { RequestList };
