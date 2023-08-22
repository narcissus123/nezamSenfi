import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { countyColumns } from "./CountyHistoryJobRequestColumn";
import { ListFilter } from "./ListFilter/ListFilter";
import { provinceColumns } from "./ProvinceHistoryJobRequestColumn";
import { unionColumns } from "./UnionHistoryJobRequestColumn";

interface IPropTypes {
  historyMutation: any;
  type: any;
  requestData: any;
}

const HistoryDetails: FC<IPropTypes> = ({
  historyMutation: useHistoryMutation,
  type,
  requestData
}) => {
  const [tableData, setTableData]: any = useState([]);

  const [pageSize, setPageSize] = useState(8);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);

  const [filterState, setFilterState] = useState<any>({
    statusTitle: "",
    employmentLicenseStatus: 0,
    historyOfServiceAfterGraduation: 0,
    certificateExaminationStatus: 0,
    tradeUnionLicenseStatus: 0,
    ratingTitle: "",
    ratingStatus: 0,
    provinceTitle: "",
    countyTitle: "",
    countyUnionTitle: "",
    id: null,
    description: "",
    userNationalCode: "",
    resumeHistory: null,
  });

  const { id } = useParams<any>();

  const historyMutation = useHistoryMutation();

  useEffect(() => {
    if (requestData && requestData.guildRoomRequestId) {
      historyMutation.mutate({
        ...filterState,
        page: 1,
        pageSize: 10,
        positionRequestId: +requestData.guildRoomRequestId,
        // provinceId: initialValues.provinceId,
        // mainLocationId: initialValues.mainLocationId,
        // countyId: initialValues.CountyId,
        // countyUnionId: initialValues.countyUnionId,
      });
    }
  }, [requestData]);

  useEffect(() => {
    if (historyMutation.data && historyMutation.data.data) {
      const result = historyMutation.data.data.result;
      
      setTableData(result.items);
      setPageCount(Math.ceil(result.totalCount / pageSize));
    }
  }, [historyMutation.isSuccess]);

  const onSubmit = (value: any) => {
    

    const jobSerachObject: any = {
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
      // provinceId: initialValues.provinceId,
      // mainLocationId: initialValues.mainLocationId,
      positionRequestId: +requestData.guildRoomRequestId,
      // countyId: initialValues.CountyId,
      // countyUnionId: initialValues.countyUnionId,
    };

    

    historyMutation.mutate(jobSerachObject);
    setInitialPage(0);
  };

  return (
    <Formik initialValues={filterState} onSubmit={onSubmit}>
      {({ values, errors, handleChange, resetForm, setFieldValue }) => {
        return (
          <Form>
            <ListFilter
              mutation={historyMutation}
              onResetClick={resetForm}
              setFieldValue={setFieldValue}
            />
            <ListTable
              columns={
                type === "Province"
                  ? provinceColumns
                  : type === "County"
                  ? countyColumns
                  : type === "Union"
                  ? unionColumns
                  : []
              }
              isLoading={historyMutation.isLoading}
              onPageChange={({ page, pageSize }) => {
                const serachObject: any = {
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
                  // provinceId: initialValues.provinceId,
                  // mainLocationId: initialValues.mainLocationId,
                  // positionRequestId: +id,
                  // countyId: initialValues.CountyId,
                  // countyUnionId: initialValues.countyUnionId,
                };
                historyMutation.mutate(serachObject);
              }}
              tableData={tableData}
              pageCountList={pageCountList}
              customPageSize={pageSize}
              setInitialPage={setInitialPage}
              setPageSize={setPageSize}
            >
              {{ headerTable: <p></p> }}
            </ListTable>
          </Form>
        );
      }}
    </Formik>
  );
  
};

export { HistoryDetails };
