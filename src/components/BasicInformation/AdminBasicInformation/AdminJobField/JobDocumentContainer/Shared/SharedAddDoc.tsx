import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { FullOptionSel, OptionRowSel } from "../../../../../../core/models";
import { showToast } from "../../../../../../core/utils";
import { JobDocumentValidation } from "../../../../../../core/validations/admin-job-document.validations";
import {
  FormDivider,
  ModernDatePicker,
  SubmitButton,
} from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./DocColumns";

interface IPropTypes {
  useGetJobRequireDocument: any;
  useSetJobRequireDocument: any;
  useGetJobRequireDocumentHistory: any;
}

interface IDocFormType {
  jobCategoryType: OptionRowSel | null;
  buildingDocumentStatus: OptionRowSel | null;
  facilitiesDocumentStatus: OptionRowSel | null;
  activityLicenseDocumentStatus: OptionRowSel | null;
  wellDocumentStatus: OptionRowSel | null;
  owenerShipDocumentStatus: OptionRowSel | null;
}

const SharedAddDoc: FC<IPropTypes> = ({
  useGetJobRequireDocument,
  useGetJobRequireDocumentHistory,
  useSetJobRequireDocument,
}) => {
  const jobRequireDocumentStatusEnum: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "الزامی" },
        { value: 2, label: "غیرالزامی مدت دار" },
        { value: 3, label: "غیر الزامی" },
      ],
    },
  ];

  const [jobCategoryTypeData, setJobCategoryTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "فعالیتهای وابسته به ساختمان صنعتی" },
        { value: 2, label: "فعالیتهای وابسته به ساختمان سنتی وکارگاهی" },
        { value: 3, label: "فعالیتهای وابسته به سازه های سبک گلخانه صنعتی" },
        { value: 4, label: "فعالیتهای وابسته به سازه های سبک گلخانه سنتی" },
        { value: 5, label: "فعالیتهای وابسته به اراضی زراعی وباغی" },
        { value: 6, label: "فعالیتهای وابسته به ماشین الات وادوات" },
        { value: 7, label: "فعالیتهای  تخصصی یا مهارتی فاقد وابستگی مشخص " },
        { value: 8, label: "فعالیت های تولیدی مهاجر" },
      ],
    },
  ]);

  const [initialValues, setInitialValues] = useState<IDocFormType>({
    jobCategoryType: null,
    buildingDocumentStatus: null,
    facilitiesDocumentStatus: null,
    activityLicenseDocumentStatus: null,
    wellDocumentStatus: null,
    owenerShipDocumentStatus: null,
  });
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: 10,
    jobCategoryType: 0,
    startDate: "",
    endDate: "",
  });
  const [pageCount, setPageCount] = useState(1);
  const [tableData, setTableData] = useState<any[]>([]);

  const getJobDoc = useGetJobRequireDocument();
  const getHistory = useGetJobRequireDocumentHistory();
  const setJobDoc = useSetJobRequireDocument();

  useEffect(() => {
    getHistory.mutate(filterState);
  }, [filterState.pageSize]);

  useEffect(() => {
    if (getHistory.isSuccess) {
      const result = getHistory.data.data.result;
      setTableData(result.items);
      setPageCount(Math.ceil(result.totalCount / filterState.pageSize));
    }
  }, [getHistory.isSuccess]);

  const onJobCategoryTypeChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("jobCategoryType", opt);
    setInitialValues({
      jobCategoryType: null,
      buildingDocumentStatus: null,
      facilitiesDocumentStatus: null,
      activityLicenseDocumentStatus: null,
      wellDocumentStatus: null,
      owenerShipDocumentStatus: null,
    });
    try {
      getJobDoc.mutate(opt.value, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          setInitialValues({
            jobCategoryType: result.jobCategoryType
              ? {
                  value: result.jobCategoryType,
                  label: result.jobCategoryTypeTitle,
                }
              : null,
            activityLicenseDocumentStatus: result.activityLicenseDocumentStatus
              ? {
                  value: result.activityLicenseDocumentStatus,
                  label: result.activityLicenseDocumentStatusTitle,
                }
              : null,

            buildingDocumentStatus: result.buildingDocumentStatus
              ? {
                  value: result.buildingDocumentStatus,
                  label: result.buildingDocumentStatusTitle,
                }
              : null,

            facilitiesDocumentStatus: result.facilitiesDocumentStatus
              ? {
                  value: result.facilitiesDocumentStatus,
                  label: result.facilitiesDocumentStatusTitle,
                }
              : null,

            owenerShipDocumentStatus: result.owenerShipDocumentStatus
              ? {
                  value: result.owenerShipDocumentStatus,
                  label: result.owenerShipDocumentStatusTitle,
                }
              : null,
            wellDocumentStatus: result.wellDocumentStatus
              ? {
                  value: result.wellDocumentStatus,
                  label: result.wellDocumentStatusTitle,
                }
              : null,
          });
        },
      });
    } catch (error) {}
  };

  const onSubmit = (values: any) => {
    try {
      const documentData = {
        jobCategoryType: values.jobCategoryType.value,
        buildingDocumentStatus: values.buildingDocumentStatus.value,
        facilitiesDocumentStatus: values.facilitiesDocumentStatus.value,
        activityLicenseDocumentStatus:
          values.activityLicenseDocumentStatus.value,
        wellDocumentStatus: values.wellDocumentStatus.value,
        owenerShipDocumentStatus: values.owenerShipDocumentStatus.value,
      };

      setJobDoc.mutate(documentData, {
        onSuccess: () => {
          showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
        },
      });
    } catch (error) {}
  };

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={JobDocumentValidation}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Row>
                <Col sm="4">
                  <BasicSelectOption
                    data={jobCategoryTypeData}
                    name="jobCategoryType"
                    lableText="دسته بندی شغل"
                    significant
                    isLoading={false}
                    placeHolder="انتخاب کنید ..."
                    onChange={(opt) =>
                      onJobCategoryTypeChange(opt, setFieldValue)
                    }
                  />
                </Col>
                <Col sm="4">
                  <BasicSelectOption
                    data={jobRequireDocumentStatusEnum}
                    name="buildingDocumentStatus"
                    lableText="اسناد ساختمانی"
                    significant
                    isDisabled={!values.jobCategoryType}
                    isLoading={getJobDoc.isLoading}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
                <Col sm="4">
                  <BasicSelectOption
                    data={jobRequireDocumentStatusEnum}
                    name="facilitiesDocumentStatus"
                    lableText="اسناد تاسیسات"
                    significant
                    isDisabled={!values.jobCategoryType}
                    isLoading={getJobDoc.isLoading}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
                <Col sm="4">
                  <BasicSelectOption
                    data={jobRequireDocumentStatusEnum}
                    name="activityLicenseDocumentStatus"
                    lableText="اسناد مجوزات فعالیت"
                    significant
                    isDisabled={!values.jobCategoryType}
                    isLoading={getJobDoc.isLoading}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
                <Col sm="4">
                  <BasicSelectOption
                    data={jobRequireDocumentStatusEnum}
                    name="wellDocumentStatus"
                    lableText="اسناد چاه"
                    significant
                    isDisabled={!values.jobCategoryType}
                    isLoading={getJobDoc.isLoading}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
                <Col sm="4">
                  <BasicSelectOption
                    data={jobRequireDocumentStatusEnum}
                    name="owenerShipDocumentStatus"
                    lableText="اسناد مالکیتی"
                    significant
                    isDisabled={!values.jobCategoryType}
                    isLoading={getJobDoc.isLoading}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <SubmitButton
                      isLoading={setJobDoc.isLoading}
                      btnText="ثبت"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>

        <hr />

        <FormDivider textHeader="تاریخچه ثبت اسناد">
          <Formik
            initialValues={{ jobCategoryType: 0, startDate: "", endDate: "" }}
            enableReinitialize
            onSubmit={(value: any) => {
              getHistory.mutate({
                ...filterState,
                jobCategoryType: value.jobCategoryType
                  ? value.jobCategoryType.value
                  : 0,
                endDate: value.endDate,
                startDate: value.startDate,
              });
              setFilterState({
                ...filterState,
                jobCategoryType: value.jobCategoryType
                  ? value.jobCategoryType.value
                  : 0,
                endDate: value.endDate,
                startDate: value.startDate,
              });
            }}
          >
            {({ resetForm }) => (
              <Form>
                <Col sm="12">
                  <Row>
                    <Col sm="4">
                      <BasicSelectOption
                        data={jobCategoryTypeData}
                        name="jobCategoryType"
                        lableText="دسته بندی شغل"
                        placeHolder="انتخاب کنید..."
                      />
                    </Col>
                    <Col sm="4">
                      <ModernDatePicker
                        name="startDate"
                        lableText="از تاریخ"
                        placeholder="وارد کنید..."
                        hasMaximum
                      />
                    </Col>
                    <Col sm="4">
                      <ModernDatePicker
                        name="endDate"
                        lableText="تا تاریخ"
                        placeholder="وارد کنید..."
                        hasMaximum
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <SubmitButton
                    isLoading={getHistory.isLoading}
                    btnText="جستجو"
                    clearable
                    clearableTxt="پاکسازی"
                    clearableDisable={getHistory.isLoading}
                    onClear={() => {
                      resetForm();
                    }}
                  />
                </Col>
              </Form>
            )}
          </Formik>
          <ListTable
            columns={columns}
            isLoading={getHistory.isLoading}
            onPageChange={({ page, pageSize }) => {
              getHistory.mutate({ ...filterState, page, pageSize });
              setFilterState((old: any) => ({ ...old, page, pageSize }));
            }}
            pageCountList={pageCount}
            customPageSize={filterState.pageSize}
            initialPage={filterState.page - 1}
            setInitialPage={(val) =>
              setFilterState((old: any) => ({ ...old, page: val + 1 }))
            }
            setPageSize={(val) =>
              setFilterState((old: any) => ({ ...old, pageSize: val }))
            }
            // getCustomProps={{ setUnUsedDoc, setTableData }}
            tableData={tableData}
          >
            {{ headerTable: <p></p> }}
          </ListTable>
        </FormDivider>
      </CardBody>
    </Card>
  );
};

export { SharedAddDoc };
