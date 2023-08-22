
import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePostGetMyPositionRequestHistory } from "../../../../../../../core/services/api";
import { fullOption } from "../../../../../../../core/utils";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { columns } from "./HistoryJobRequestColumn";
import { ListFilter } from "./ListFilter/ListFilter";

interface IPropTypes {
  historyMutation:any
  initialValues : any
  isOpen : boolean
}

const HistoryJobRequest: FC<IPropTypes> = ({historyMutation , initialValues , isOpen}) => {
  const [tableData , setTableData] = useState<any>([]);

  const [
    employmentLicenseStatusData,
    setEmploymentLicenseStatusData,
  ] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        {value : 1 , label : 'دارای اعتبار'},
        {value : 2 , label : 'فاقد اعتبار'},
      ],
    },
  ]);

  const [rankStatusData, setRankStatusData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        {value : 1 , label : 'رتبه A'} ,
        {value : 2 , label : 'رتبه B'} ,
        {value : 3 , label : 'رتبه C'} ,
        {value : 4 , label : 'فاقد رتبه'} ,
      ],
    },
  ]);

  const [pageSize, setPageSize] = useState(8);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);

  const [filterState,setFilterState] = useState<any>({
    status: 0,
    employmentLicenseStatus: 0,
    historyOfServiceAfterGraduation: 0,
    certificateExaminationStatus: 0,
    tradeUnionLicenseStatus: 0,
    ratingTitle: "",
    ratingStatus: 0,
  })

  const getHistories = usePostGetMyPositionRequestHistory();

  const { id } = useParams<any>();

  useEffect(() => {
    if (isOpen) {
      historyMutation.mutate({
        ...filterState,
        page: 1,
        pageSize: 10,
        positionRequestId: +id,
        provinceId : initialValues.provinceId,
        mainLocationId : initialValues.mainLocationId,
        countyId : initialValues.CountyId,
        countyUnionId : initialValues.countyUnionId,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (historyMutation.data && historyMutation.data.data) {
      const result = historyMutation.data.data.result.items;
      let tableData: any = [];
      result.forEach((item: any) => {
        tableData.push({
          id: item.id,
          statusTitle: item.statusTitle,
          employmentLicenseStatus: fullOption(item.employmentLicenseStatus , employmentLicenseStatusData)?.label ,
          ratingStatus: fullOption(item.ratingStatus , rankStatusData )?.label ,
        });
      });
      try {
        setTableData(tableData);
        setPageCount(
          Math.ceil(historyMutation.data.data.result.totalCount / pageSize)
        );
      } catch (error) {}
      
    }
  }, [historyMutation.isSuccess]);

  const onSubmit = (value:any) => {
    
    
    const jobSerachObject : any = {
      page:1,
      pageSize:pageSize,
      status: value.status ? value.status.value : 0 ,
      employmentLicenseStatus: value.employmentLicenseStatus ? value.employmentLicenseStatus.value : 0 ,
      historyOfServiceAfterGraduation: value.historyOfServiceAfterGraduation ?  value.historyOfServiceAfterGraduation.value : 0,
      certificateExaminationStatus: value.certificateExaminationStatus ? value.certificateExaminationStatus.value : 0,
      tradeUnionLicenseStatus: value.tradeUnionLicenseStatus ? value.tradeUnionLicenseStatus.value : 0, 
      ratingTitle: value.ratingTitle,
      ratingStatus: value.ratingStatus ? value.ratingStatus.value : 0 ,
      provinceId : initialValues.provinceId,
      mainLocationId : initialValues.mainLocationId,
      positionRequestId: +id,
      countyId : initialValues.CountyId,
      countyUnionId : initialValues.countyUnionId,
    }

    
    
    historyMutation.mutate(jobSerachObject)
    setInitialPage(0)
  }

  return (
    <Formik initialValues={filterState} onSubmit={onSubmit}>
      {({ values, errors, handleChange, resetForm, setFieldValue }) => {
        return (
          <Form>
            <ListFilter mutation={historyMutation} onResetClick={resetForm} setFieldValue={setFieldValue}  />
            <ListTable
              columns={columns}
              isLoading={historyMutation.isLoading}
              onPageChange={({ page, pageSize }) => {
                const serachObject : any = {
                  page:page,
                  pageSize:pageSize,
                  status: values.status ? values.status.value : 0 ,
                  employmentLicenseStatus: values.employmentLicenseStatus ? values.employmentLicenseStatus.value : 0 ,
                  historyOfServiceAfterGraduation: values.historyOfServiceAfterGraduation ?  values.historyOfServiceAfterGraduation.value : 0,
                  certificateExaminationStatus: values.certificateExaminationStatus ? values.certificateExaminationStatus.value : 0,
                  tradeUnionLicenseStatus: values.tradeUnionLicenseStatus ? values.tradeUnionLicenseStatus.value : 0, 
                  ratingTitle: values.ratingTitle,
                  ratingStatus: values.ratingStatus ? values.ratingStatus.value : 0 ,
                  provinceId : initialValues.provinceId,
                  mainLocationId : initialValues.mainLocationId,
                  positionRequestId: +id,
                  countyId : initialValues.CountyId,
                  countyUnionId : initialValues.countyUnionId,
                }
                historyMutation.mutate(serachObject)
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
