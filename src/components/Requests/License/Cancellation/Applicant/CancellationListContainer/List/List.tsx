import * as React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { columns } from "./Columns";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { useEffect, useState } from "react";
import { usePostGetAllMyLicenseRequest } from "../../../../../../../core/services/api";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";
import { LicenseFinalStatusEnum } from "../../../../../../../core/enums/license-final-status.enum";
import { LicenseRequestTypeEnum } from "../../../../../../../core/enums/license-request-type.enums";

const List = () => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);

  const [initialValue, setinitialValue] = useState<any>({
    fixedOrMobieType: null,
    status: null,
    cityOrVillageId: null,
    unionId: null,
    unionUseTypeJobId: null,
    provinceId: null,
    countyId: null,
    cityId: null,
    villageId: null,
  });

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
    licenseRequestType: LicenseRequestTypeEnum.Cancelation
  });

  const getListMutation = usePostGetAllMyLicenseRequest();

  useEffect(() => {
    getListMutation.mutate({
      ...filterState,
      page: 1,
      pageSize: pageSize,
      licenseRequestType: LicenseRequestTypeEnum.Cancelation
    });

    setFilterState({
      ...filterState,
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

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(value) => {
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
          provinceId: value.provinceId ? value.provinceId.value : 0,
          countyId: value.countyId ? value.countyId.value : 0,
          licenseRequestType: LicenseRequestTypeEnum.Cancelation
        };
        getListMutation.mutate(searchObj, {
          onSuccess: () => {
            setFilterState((old: any) => ({
              ...old,
              page: 1,
              pageSize: pageSize,
              fixedOrMobieType: value.fixedOrMobieType
                ? value.fixedOrMobieType.value
                : 0,
              unionId: value.unionId ? value.unionId.value : 0,
              unionUseTypeJobId: value.unionUseTypeJobId
                ? value.unionUseTypeJobId.value
                : 0,
              cityOrVillageId: value.cityId
                ? value.cityId.value
                : value.villageId
                ? value.villageId.value
                : 0,
              provinceId: value.provinceId ? value.provinceId.value : 0,
              countyId: value.countyId ? value.countyId.value : 0,
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
          <Card>
            <CardHeader>
              <CardTitle>لیست درخواست ها</CardTitle>
            </CardHeader>
            <CardBody>
              <ListTable
                columns={columns}
                isLoading={getListMutation.isLoading}
                onPageChange={({ page, pageSize }) => {
                  getListMutation.mutate({
                    ...filterState,
                    page: page,
                    pageSize: pageSize,
                    licenseRequestType: LicenseRequestTypeEnum.Cancelation
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
                getCustomProps={{ flow: "ApplicantLicenseIssuedFlow" }}
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

export { List };
