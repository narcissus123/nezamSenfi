import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePostGetMyPositionRequestHistory } from "../../../../../../../core/services/api";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { columns } from "./ResumeJobRequestColumn";
import { ListFilter } from "./ListFilter";

interface IPropTypes {
  resumeMutation: any;
  initialValues: any;
  isOpen: boolean;
}

const ResumeJobRequest: FC<IPropTypes> = ({
  initialValues,
  resumeMutation,
  isOpen,
}) => {
  const [tableData, setTableData]: any = useState([]);

  const [pageSize, setPageSize] = useState(8);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);

  const [filterState, setFilterState] = useState<any>({
    page: 0,
    pageSize: 0,
    organizationTitle: "",
    startDate: "",
    endDate: "",
    positionId: 0,
    positionRequestId: 0,
    countyId: 0,
  });

  const getResumes = usePostGetMyPositionRequestHistory();

  const { id } = useParams<any>();

  useEffect(() => {
    if (isOpen) {
      resumeMutation.mutate({
        ...filterState,
        page: 1,
        pageSize: pageSize,
        positionRequestId: +id,
        countyId: 0,
      });
    }
  }, [resumeMutation && isOpen]);

  useEffect(() => {
    if (resumeMutation && resumeMutation.data && resumeMutation.data.data) {
      const result = resumeMutation.data.data.result;
      
      const resumes: any = [];

      result.items.forEach((item: any) => {
        resumes.push({
          id: item.id,
          provinceTitle: item.provinceTitle,
          countyTitle: item.countyTitle,
          positionTypeTilte: item.positionTypeTilte,
          organizationTitle: item.organizationTitle,
          inSuranceStatus: item.inSuranceStatus
            ? "دارای اعتبار"
            : "فاقد اعتبار",
          startDate: item.startDate,
          inSuranceDuration: item.inSuranceDuration + " سال",
          positionTitle: item.positionTitle,
          resumeFilePaths : item.resumeFilePaths
        });
      });

      setTableData(resumes);

      setPageCount(Math.ceil(result.totalCount / pageSize));
    }
  }, [resumeMutation && resumeMutation.isSuccess]);

  const onSubmit = (value: any) => {
    

    const jobSerachObject: any = {
      page: 1,
      pageSize: pageSize,
      organizationTitle: value.organizationTitle,
      startDate: value.startDate,
      endDate: value.endDate,
      positionId: 0,
      positionRequestId: +id,
      countyId: 0,
    };

    

    resumeMutation.mutate(jobSerachObject);
    setInitialPage(0);
  };

  return (
    <Formik initialValues={filterState} onSubmit={onSubmit}>
      {({ values, errors, handleChange, resetForm, setFieldValue }) => {
        return (
          <Form>
            <ListFilter
              mutation={resumeMutation}
              onResetClick={resetForm}
              setFieldValue={setFieldValue}
            />
            <ListTable
              columns={columns}
              isLoading={resumeMutation && resumeMutation.isLoading}
              onPageChange={({ page, pageSize }) => {
                const serachObject: any = {
                  page: page,
                  pageSize: pageSize,
                  organizationTitle: values.organizationTitle,
                  startDate: values.startDate,
                  endDate: values.endDate,
                  positionId: 0,
                  positionRequestId: +id,
                  countyId: 0,
                };
                resumeMutation.mutate(serachObject);
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

export { ResumeJobRequest };
