
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup } from "reactstrap";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { useGlobalState } from "../../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../../core/utils/context/StatusProvider";
import { JobFlowUploadDocumentsValidate } from "../../../../../../core/validations/jobflow-upload-documents.validations";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FileInput } from "../../../../../common/Form/InputComponents/FileInput/FileInput";
import { ModernDatePicker } from "../../../../../common/Form/ModernDatePicker/ModernDatePicker";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";

export interface JobRequestProps {}

const EditCV: React.FC<JobRequestProps> = () => {
  const [initialValues, setInitialValues] = useState<any>({
    companyName: "",
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

  const [provinceData, setProvinceData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
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
      options: [],
    },
  ]);

  const [insuranceHistoryData, setInsuranceHistoryData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const [jobTypeData, setJobTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
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

  const { req_id } = useGlobalState();
  const { status } = useStatusPermission();

  const onSubmit = (value: any) => {
    if (!value.files || !(value.files.length > 0)) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={JobFlowUploadDocumentsValidate}
        onSubmit={onSubmit}
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
            <Form>
              <>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="نام سازمان"
                          name="companyName"
                          placeholder="نام سازمان / شرکت / نهاد"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
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
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          isLoading={getCountiesMutation.isLoading}
                          placeHolder="شهرستان"
                          name="county"
                          data={countyData}
                          lableText="شهرستان محل خدمت"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <ModernDatePicker
                            lableText="تاریخ شروع فعالیت"
                            name="startDate"
                            placeholder="تاریخ شروع فعالیت"
                            initialValue={initialValues.birthDate}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <ModernDatePicker
                            lableText="تاریخ پایان فعالیت"
                            name="finishDate"
                            placeholder="تاریخ پایان فعالیت"
                            initialValue={initialValues.finishDate}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          placeHolder="وضعیت بیمه"
                          name="insuranceType"
                          data={insuranceTypeData}
                          lableText="وضعیت بیمه"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          placeHolder="مدت سابقه بیمه ای"
                          name="insuranceHistory"
                          data={insuranceHistoryData}
                          lableText="مدت سابقه بیمه ای"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          placeHolder="نوع اشتغال"
                          name="jobType"
                          data={jobTypeData}
                          lableText="نوع اشتغال"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          placeHolder="نوع ارائه خدمت"
                          name="serviceType"
                          data={serviceTypeData}
                          lableText="نوع ارائه خدمت"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FileInput
                          accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
                          files={values.files}
                          setFieldValue={(val: any) =>
                            setFieldValue("files", val)
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <SubmitButton
                  isLoading={false}
                  schema={JobFlowUploadDocumentsValidate}
                  values={values}
                  initialValue={initialValues}
                />
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { EditCV };
