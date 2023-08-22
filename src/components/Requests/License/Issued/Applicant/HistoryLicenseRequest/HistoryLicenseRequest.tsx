import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Form, Formik } from "formik";

import { columns } from "./Column";
import { ListFilter } from "./ListFilter/ListFilter";
import { ListTable } from "../../../../../common/ListTable/ListTable";

interface IPropTypes {
  getMutation: any
}

const HistoryLicenseRequest: FC<IPropTypes> = ({ getMutation }) => {

  const { req_id: id } = useParams<any>();
  const [tableData, setTableData] = useState<any>([]);
  const [pageSize, setPageSize] = useState(8);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);

  const [filterState, setFilterState] = useState<any>({
    status: 0,
    cityOrVillageId: 0,
    licenseTypeEnum: 0,
    unionUseTypeJobId: 0,
    licenseRequestId: +id,
  });

  const getHistories = getMutation();



  useEffect(() => {
      getHistories.mutate({
        ...filterState,
        page: 1,
        pageSize: 10,
        cityOrVillageId: 0,
        licenseTypeEnum: 0,
        unionUseTypeJobId: 0,
        licenseRequestId: +id,
      });

  }, []);

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
      cityOrVillageId: value.cityId
        ? value.cityId.value
        : value.villageId
        ? value.villageId.value
        : 0,
      licenseTypeEnum: value.licenseTypeEnum ? value.licenseTypeEnum.value : 0,
      unionUseTypeJobId: value.unionUseTypeJobId
        ? value.unionUseTypeJobId.value
        : 0,
      licenseRequestId: +id,
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
                  cityOrVillageId: values.cityId
                    ? values.cityId.value
                    : values.villageId
                    ? values.villageId.value
                    : 0,
                  licenseTypeEnum: values.licenseTypeEnum
                    ? values.licenseTypeEnum.value
                    : 0,
                  unionUseTypeJobId: values.unionUseTypeJobId
                    ? values.unionUseTypeJobId.value
                    : 0,
                  licenseRequestId: +id,
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

export { HistoryLicenseRequest };
