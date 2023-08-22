import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { IUnionPositionSearch } from "../../../../../../core/models/union-position-search.model";
import { usePostGetMyPositionRequestsIncountyUnionByFilter } from "../../../../../../core/services/api";
import { useRefetchState } from "../../../../../../core/utils/context/EventContext";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";
import { ListFilter } from "./ListFilter";

const UnionJobRequestsList: FC = () => {
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
    countyUnionId: 0,
    countyId: 0,
    province: 0,
  });

  const getAllRequest = usePostGetMyPositionRequestsIncountyUnionByFilter();
  const { refetchEvent } = useRefetchState();

  useEffect(() => {
    getAllRequest.mutate({ ...filterState, page: 1, pageSize: pageSize });
  }, [refetchEvent.unionJobRequestList, pageSize]);

  useEffect(() => {
    if (getAllRequest.data && getAllRequest.data.data) {
      const result = getAllRequest.data.data.result.items;
      let tableData: any = [];

      result.forEach((item: any) => {
        tableData.push({
          id: item.id,
          statusTitle: item.statusTitle,
          union: item.unionTitle,
          createDate: item.createDate,
          statusId: item.status,
        });
      });
      try {
        setState(tableData);
        setPageCount(
          Math.ceil(getAllRequest.data.data.result.totalCount / pageSize)
        );
      } catch (error) {}
    }
  }, [getAllRequest.isSuccess]);

  const onSubmit = (value: any) => {
    const jobSerachObject: IUnionPositionSearch = {
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
      countyUnionId: value.countyUnionId ? value.countyUnionId.value : 0,
    };

    getAllRequest.mutate(jobSerachObject);
    setInitialPage(0);
  };

  const onPageChange = (page: number, pageSize: number, values: any) => {
    const jobSerachObject: IUnionPositionSearch = {
      page: page,
      pageSize: pageSize,
      status: values.status ? values.status.value : 0,
      employmentLicenseStatus: values.employmentLicenseStatus
        ? values.employmentLicenseStatus.value
        : 0,
      historyOfServiceAfterGraduation: values.historyOfServiceAfterGraduation
        ? values.historyOfServiceAfterGraduation.value
        : 0,
      certificateExaminationStatus: values.certificateExaminationStatus
        ? values.certificateExaminationStatus.value
        : 0,
      tradeUnionLicenseStatus: values.tradeUnionLicenseStatus
        ? values.tradeUnionLicenseStatus.value
        : 0,
      ratingTitle: values.ratingTitle,
      ratingStatus: values.ratingStatus ? values.ratingStatus.value : 0,
      startCreateDate: values.startCreateDate,
      endCreateDate: values.endCreateDate,
      countyUnionId: values.countyUnionId ? values.countyUnionId.value : 0,
    };
    getAllRequest.mutate(jobSerachObject);
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
                  mutation={getAllRequest}
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
                  isLoading={getAllRequest.isLoading}
                  columns={columns}
                  pageCountList={pageCountList}
                  tableData={state}
                  initialPage={initialPage}
                  setInitialPage={setInitialPage}
                  onPageChange={({ page, pageSize }: any) =>
                    onPageChange(page, pageSize, values)
                  }
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

export { UnionJobRequestsList };
