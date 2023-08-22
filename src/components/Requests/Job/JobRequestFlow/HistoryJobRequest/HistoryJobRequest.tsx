import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePostGetMyPositionRequestHistory } from "../../../../../core/services/api";
import { Form, Formik } from "formik";
import { ListTable } from "../../../../common/ListTable/ListTable";

import { columns } from "./HistoryJobRequestColumn";
import { ListFilter } from "./ListFilter/ListFilter";

interface IPropTypes {
  isOpen: boolean;
}

const HistoryJobRequest: FC<IPropTypes> = ({ isOpen }) => {
  const [tableData, setTableData] = useState<any>([]);

  const [pageSize, setPageSize] = useState(8);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);

  const [filterState, setFilterState] = useState<any>({
    status: 0,
    employmentLicenseStatus: 0,
    historyOfServiceAfterGraduation: 0,
    certificateExaminationStatus: 0,
    tradeUnionLicenseStatus: 0,
    ratingTitle: "",
    ratingStatus: 0,
  });

  const getHistories = usePostGetMyPositionRequestHistory();

  const { req_id: id } = useParams<any>();

  useEffect(() => {
    if (isOpen) {
      getHistories.mutate({
        ...filterState,
        page: 1,
        pageSize: 10,
        positionRequestId: +id,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (getHistories.data && getHistories.data.data) {
      const result = getHistories.data.data.result.items;
      try {
        setTableData(result);
        setPageCount(
          Math.ceil(getHistories.data.data.result.totalCount / pageSize)
        );
      } catch (error) {}
    }
  }, [getHistories.isSuccess]);

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
      positionRequestId: +id,
    };

    getHistories.mutate(jobSerachObject);
    setInitialPage(0);
  };

  return (
    <Formik initialValues={filterState} onSubmit={onSubmit}>
      {({ values, errors, handleChange, resetForm, setFieldValue }) => {
        return (
          <Form>
            <ListFilter
              mutation={getHistories}
              onResetClick={resetForm}
              setFieldValue={setFieldValue}
            />
            <ListTable
              columns={columns}
              isLoading={getHistories.isLoading}
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
                  positionRequestId: +id,
                };
                getHistories.mutate(serachObject);
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

export { HistoryJobRequest };
