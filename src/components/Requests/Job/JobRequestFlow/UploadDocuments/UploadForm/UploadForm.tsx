import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup, Alert } from "reactstrap";

import { usePostGetAllPosition } from "../../../../../../core/services/api";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
} from "../../../../../../core/services/api/location.api";
import {
  ConvertUtcToDate,
  fullOption,
  showToast,
} from "../../../../../../core/utils";
import { useStatusPermission } from "../../../../../../core/utils/context/StatusProvider";
import { JobFlowUploadDocumentsValidate } from "../../../../../../core/validations/jobflow-upload-documents.validations";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FileInput } from "../../../../../common/Form/InputComponents/FileInput/FileInput";
import { ModernDatePicker } from "../../../../../common/Form/ModernDatePicker/ModernDatePicker";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { JobRequestStatus } from "../../../../../../core/enums/job-request-status";
import { ToastTypes } from "../../../../../../core/enums";

export interface JobRequestProps {
  index: number;
  resumeList: any;
  files: any;
  setFormData: (val: any) => void;
  serverFile: Blob[];
}

const UploadForm: React.FC<JobRequestProps> = ({
  index,
  setFormData,
  resumeList,
  files,
  serverFile,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    companyName: resumeList ? resumeList.companyName : "",
    province: null,
    county: null,
    startDate: null,
    finishDate: null,
    insuranceType: null,
    insuranceHistory: null,
    jobType: null,
    serviceType: null,
    files: null,
  });

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!initialValues.files) {
      setInitialValues({
        companyName: resumeList ? resumeList.companyName : "",
        province: resumeList ? resumeList.province : null,
        county: resumeList ? resumeList.county : null,
        startDate: resumeList ? resumeList.startDate : "",
        finishDate: resumeList ? resumeList.finishDate : "",
        insuranceType: resumeList ? resumeList.insuranceType : null,
        insuranceHistory: resumeList
          ? resumeList.insuranceHistory
            ? fullOption(+resumeList.insuranceHistory, insuranceHistory)
            : resumeList.insuranceHistory === 0
            ? fullOption(31, insuranceHistory)
            : null
          : null,
        jobType: resumeList ? resumeList.jobType : null,
        serviceType: resumeList ? resumeList.serviceType : null,
        files: resumeList ? resumeList.files : null,
      });
    }
    // if (resumeList) {
    //   //setIsAdded(true);
    // }
  }, [resumeList]);

  // useEffect(() => {
  //   if(files) {

  //   }
  // }, [files])

  const [provinceData, setProvinceData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const [jobTypeData, setJobTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "پرسنلی" },
        { value: 2, label: "پیمانکاری" },
      ],
    },
  ]);

  const [countyData, setCountyData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const [insuranceTypeData, setInsuraceTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای بیمه" },
        { value: 2, label: "فاقد بیمه" },
      ],
    },
  ]);

  const [serviceTypeData, setServiceTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const { data, isFetching, isSuccess } = useGetAllprovinces();
  const getCountiesMutation = useGetAllCountyByProvinceId();
  const positionMutation = usePostGetAllPosition();

  const [insuranceHistory, setInsuranceHistory] = useState([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 31, label: "فاقد سابقه بیمه" },
        { value: 1, label: "1 سال" },
        { value: 2, label: "2 سال" },
        { value: 3, label: "3 سال" },
        { value: 4, label: "4 سال" },
        { value: 5, label: "5 سال" },
        { value: 6, label: "6 سال" },
        { value: 7, label: "7 سال" },
        { value: 8, label: "8 سال" },
        { value: 9, label: "9 سال" },
        { value: 10, label: "10 سال" },
        { value: 11, label: "11 سال" },
        { value: 12, label: "12 سال" },
        { value: 13, label: "13 سال" },
        { value: 14, label: "14 سال" },
        { value: 15, label: "15 سال" },
        { value: 16, label: "16 سال" },
        { value: 17, label: "17 سال" },
        { value: 18, label: "18 سال" },
        { value: 19, label: "19 سال" },
        { value: 20, label: "20 سال" },
        { value: 21, label: "21 سال" },
        { value: 22, label: "22 سال" },
        { value: 23, label: "23 سال" },
        { value: 24, label: "24 سال" },
        { value: 25, label: "25 سال" },
        { value: 26, label: "26 سال" },
        { value: 27, label: "27 سال" },
        { value: 28, label: "28 سال" },
        { value: 29, label: "29 سال" },
        { value: 30, label: "30 سال" },
      ],
    },
  ]);

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newProvinces = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newProvinces[0].options = newOptions;
      setProvinceData(newProvinces);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (getCountiesMutation.data) {
      let queryData: any = getCountiesMutation.data;
      let newOptions: any = [];
      let newCounties = [
        {
          label: "سرلیست شهرستان ها",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newCounties[0].options = newOptions;
      setCountyData(newCounties);
    }
  }, [getCountiesMutation.isSuccess, getCountiesMutation.data]);

  useEffect(() => {
    try {
      if (positionMutation.data) {
        let queryData: any = positionMutation.data;
        let newOptions: any = [];
        let newServiceType = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({
            value: row.id,
            label: row.title,
            haveExam: row.haveExam,
          });
        });
        newServiceType[0].options = newOptions;
        setServiceTypeData(newServiceType);
      }
    } catch (e) {}
  }, [positionMutation.isSuccess, positionMutation.data]);

  const { status } = useStatusPermission();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: any) => {
    if (!value.files || !(value.files.length > 0)) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    } else {
      setIsLoading(true);

      setFormData((val: any) => {
        const newVal = val.filter((item: any) => item.id !== index);
        return [
          ...newVal,
          {
            id: index,
            value: {
              ...value,
              insuranceHistory: value.insuranceHistory
                ? value.insuranceHistory.value === 31
                  ? 0
                  : value.insuranceHistory.value
                : 0,
            },
          },
        ];
      });
      setIsLoading(false);
      showToast(["ذخیره گردید"], ToastTypes.success);
      setIsAdded(true);
    }
  };

  useEffect(() => {
    if (
      +status !== JobRequestStatus.RejectBySecretariat &&
      +status !== JobRequestStatus.ResumeFile
    ) {
      setIsAdded(true);
    }
  }, []);

  return (
    <>
      {isAdded &&
        (+status === JobRequestStatus.RejectBySecretariat ||
          +status === JobRequestStatus.ResumeFile) && (
          <Alert color="info">
            با موفقیت ثبت گردید.پس از ثبت تمامی رزومه ها دکمه ارسال را لمس کنید
          </Alert>
        )}
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={JobFlowUploadDocumentsValidate}
        onSubmit={(value: any) => onSubmit(value)}
      >
        {({
          values,
          errors,
          handleChange,
          touched,
          getFieldProps,
          setFieldValue,
        }) => {
          return (
            <Form key={index}>
              <>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <TextInput
                          significant
                          lableText="نام سازمان"
                          name="companyName"
                          placeholder="نام سازمان / شرکت / نهاد"
                          disabled={isAdded ? true : false}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          significant
                          isLoading={isFetching}
                          placeHolder="استان"
                          name="province"
                          data={provinceData}
                          lableText="استان محل خدمت"
                          onChange={(opt, e) => {
                            setFieldValue("province", {
                              value: opt.value,
                              label: opt.label,
                            });
                            setFieldValue("county", null);
                            setCountyData([]);
                            getCountiesMutation.mutate(opt.value);
                          }}
                          isDisabled={isAdded ? true : false}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          significant
                          isLoading={getCountiesMutation.isLoading}
                          placeHolder="شهرستان"
                          name="county"
                          data={countyData}
                          lableText="شهرستان محل خدمت"
                          isDisabled={isAdded ? true : false}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <ModernDatePicker
                            significant
                            lableText="تاریخ شروع فعالیت"
                            name="startDate"
                            placeholder="تاریخ شروع فعالیت"
                            initialValue={initialValues.startDate}
                            disabled={isAdded ? true : false}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <ModernDatePicker
                            significant
                            lableText="تاریخ پایان فعالیت"
                            name="finishDate"
                            placeholder="تاریخ پایان فعالیت"
                            initialValue={initialValues.finishDate}
                            minimumDate={ConvertUtcToDate(values.startDate)}
                            disabled={isAdded ? true : false}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          significant
                          placeHolder="وضعیت بیمه"
                          name="insuranceType"
                          data={insuranceTypeData}
                          lableText="وضعیت بیمه"
                          isDisabled={isAdded ? true : false}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          data={insuranceHistory}
                          name="insuranceHistory"
                          isDisabled={isAdded ? true : false}
                          placeHolder="به سال وارد شود"
                          lableText="مدت سابقه بیمه ای"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          significant
                          placeHolder="نوع اشتغال"
                          name="jobType"
                          data={jobTypeData}
                          lableText="نوع اشتغال"
                          isDisabled={isAdded ? true : false}
                          onChange={(opt, e) => {
                            setFieldValue("jobType", {
                              value: opt.value,
                              label: opt.label,
                            });
                            setFieldValue("serviceType", null);
                            positionMutation.mutate({
                              positionType: opt.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          significant
                          placeHolder="نوع ارائه خدمت"
                          name="serviceType"
                          data={serviceTypeData}
                          isLoading={positionMutation.isLoading}
                          isDisabled={isAdded ? true : false}
                          lableText="نوع ارائه خدمت"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FileInput
                          files={values.files ? values.files : files}
                          color="info"
                          isServerFile
                          fileServer={serverFile}
                          disabled={
                            +status !== JobRequestStatus.RejectBySecretariat &&
                            +status !== JobRequestStatus.ResumeFile
                              ? true
                              : isAdded
                              ? true
                              : false
                          }
                          inputText="بارگذاری اسناد"
                          accept="image/jpeg, image/png, image/jpg, image/tif, application/pdf,image/tiff"
                          setFieldValue={(val: any) => {
                            setFieldValue("files", val);
                            //files = null;
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {(+status === JobRequestStatus.RejectBySecretariat ||
                  +status === JobRequestStatus.ResumeFile) && (
                  <SubmitButton
                    // backTo={`/Requests/job/${status}/Details/${req_id[0]}`}
                    isLoading={isLoading}
                    schema={JobFlowUploadDocumentsValidate}
                    values={values}
                    submitOutLine
                    btnText="ثبت موقت"
                    isDisabled={isAdded ? true : false}
                    initialValue={initialValues}
                  />
                )}
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { UploadForm };
