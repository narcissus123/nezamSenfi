import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import { columns } from "./Columns";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { usePostGetMyCountyPositionRequestsByFilter } from "../../../../../../core/services/api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";
import { ICountyPositionSearch } from "../../../../../../core/models/county-position-serach.model";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";

const CountyJobRequestsList = () => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    status: 0,
    employmentLicenseStatus: 0,
    historyOfServiceAfterGraduation: 0,
    certificateExaminationStatus: 0,
    tradeUnionLicenseStatus: 0,
    ratingTitle: "",
    ratingStatus: 0,
    startCreateDate: "",
    endCreateDate: "",
    countyId: 0,
    province: 0,
  });

  const getListMutation = usePostGetMyCountyPositionRequestsByFilter();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    getListMutation.mutate({ ...filterState, page: 1, pageSize: pageSize });
  }, [refetchEvent.countyJobRequestList, pageSize]);

  useEffect(() => {
    if (getListMutation.data) {
      const result = getListMutation.data.data.result.items;

      let tableData: any = [];

      result.forEach((item: any) => {
        tableData.push({
          id: item.id,
          statusTitle: item.statusTitle,
          statusId: item.status,
          county: item.countyTitle,
          createDate: item.createDate,
        });
      });
      setState(tableData);
      setPageCount(
        Math.ceil(getListMutation.data.data.result.totalCount / pageSize)
      );
    }
  }, [getListMutation.isSuccess, getListMutation.data]);

  const onSubmit = (value: any) => {
    const jobSerachObject: ICountyPositionSearch = {
      page: 1,
      pageSize: pageSize,
      status: value.status ? value.status.value : 0,
      employmentLicenseStatus: value.employmentLicenseStatus
        ? value.employmentLicenseStatus.value
        : 0,
      historyOfServiceAfterGraduation: value.historyOfServiceAfterGraduation
        ? value.historyOfServiceAfterGraduation.value
        : 0,
      certificateExaminationStatus: value.certificateExaminationStatus
        ? value.certificateExaminationStatus.value
        : 0,
      tradeUnionLicenseStatus: value.tradeUnionLicenseStatus
        ? value.tradeUnionLicenseStatus.value
        : 0,
      ratingTitle: value.ratingTitle,
      ratingStatus: value.ratingStatus ? value.ratingStatus.value : 0,
      startCreateDate: value.startCreateDate,
      endCreateDate: value.endCreateDate,
      countyId: value.countyId ? value.countyId.value : 0,
    };

    getListMutation.mutate(jobSerachObject);
    setInitialPage(0);
  };

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست درخواست ها"
      />
      <Formik
        initialValues={filterState}
        onSubmit={onSubmit}
        enableReinitialize={true}
        onReset={(a: any) => {}}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <Form>
            <Card>
              <CardHeader>
                <CardTitle>جستجو</CardTitle>
              </CardHeader>
              <CardBody>
                <ListFilter
                  mutation={getListMutation}
                  onResetClick={resetForm}
                  setFieldValue={setFieldValue}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>درخواست های شغلی</CardTitle>
              </CardHeader>
              <CardBody>
                <ListTable
                  customPageSize={pageSize}
                  setPageSize={(val: any) => setPageSize(val)}
                  isLoading={getListMutation.isLoading}
                  columns={columns}
                  pageCountList={pageCountList}
                  tableData={state}
                  initialPage={initialPage}
                  setInitialPage={setInitialPage}
                  onPageChange={({ page, pageSize }: any) => {
                    const jobSerachObject: ICountyPositionSearch = {
                      page: page,
                      pageSize: pageSize,
                      status: values.status ? values.status.value : 0,
                      employmentLicenseStatus: values.employmentLicenseStatus
                        ? values.employmentLicenseStatus.value
                        : 0,
                      historyOfServiceAfterGraduation:
                        values.historyOfServiceAfterGraduation
                          ? values.historyOfServiceAfterGraduation.value
                          : 0,
                      certificateExaminationStatus:
                        values.certificateExaminationStatus
                          ? values.certificateExaminationStatus.value
                          : 0,
                      tradeUnionLicenseStatus: values.tradeUnionLicenseStatus
                        ? values.tradeUnionLicenseStatus.value
                        : 0,
                      ratingTitle: values.ratingTitle,
                      ratingStatus: values.ratingStatus
                        ? values.ratingStatus.value
                        : 0,
                      startCreateDate: values.startCreateDate,
                      endCreateDate: values.endCreateDate,
                      countyId: values.countyId ? values.countyId.value : 0,
                    };
                    getListMutation.mutate(jobSerachObject);
                  }}
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
    </>
  );
};

export { CountyJobRequestsList };
