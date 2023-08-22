import * as React from "react";
import { Row, Col } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";

import { showToast } from "../../../../../core/utils";
import Styles from "./RealJobInfo.module.scss";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { OptionRow } from "../../../../../core/models";
import { FieldWrapper, TextInput } from "../../../../common/Form";
import { JobInfoValidate } from "../../../../../core/validations/jobinfo.validations";
import { fullOption, simpleOption } from "../../../../../core/utils";

import {
  useAddUserRealJobInformation,
  useEditUserRealJobInformation,
  useJobInfoData,
  usePostJobInfoData,
} from "../../../../../core/services/api";
import { IJobInfo } from "../../../../../core/models";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { SubmitButton } from "../../../../common/Form";
import {
  useGetAllCitiesByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllprovinceByMainLocationId,
  useGetAllVillagesByCountyId,
  useGetLocationInformation,
} from "../../../../../core/services/api";
import { ObjectPersianToEnglish } from "../../../../../core/utils";
import { useStatusPermission } from "../../../../../core/utils/context/StatusProvider";
import { useGlobalState } from "../../../../../core/utils/context/GlobalContext";
import { List } from "./List/List";
import { ToastTypes } from "../../../../../core/enums";
import { refetchContext } from "../../../../../core/utils/context/EventContext";

export interface JobInfoProps {}

const RealJobInfo: React.FC<JobInfoProps> = () => {
  const [counter, setCounter] = useState<number>(1);
  const [tableData, setTableData] = useState<any>([]);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [jobStatusOptions, setJobStatusOptions] = useState<any>([
    { value: "1", label: "استخدام رسمی یا بازنشسته" },
    { value: "2", label: "استخدام رسمی و یا بازخرید" },
    { value: "3", label: "قراردادی موقت طبق قانون کار" },
    { value: "4", label: "پیمانی با مدت مشخص" },
    { value: "5", label: "خویش فرمایی" },
    { value: "6", label: "فاقد شغل دولتی / شرکتی / خویش فرمایی" },
    { value: "7", label: "کارگری آزاد" },
  ]);

  const [workplace, setWorkplace] = useState<OptionRow | OptionRow[]>();
  const [workplaceOptions, setWorkplaceOptions] = useState<any>([
    {
      label: "انتخاب نوع سازمان محل کار",
      options: [
        { value: "1", label: "سازمان ها و ادارات دولتی" },
        { value: "2", label: "سازمان ها و ادارات نیمه دولتی" },
        { value: "3", label: "سازمان ها و شعبات خصوصی" },
        { value: "4", label: "سازمان های مردم نهاد" },
        { value: "5", label: "اتاق اصناف" },
        { value: "6", label: "اتاق بازرگانی" },
        { value: "7", label: "اتاق تعاون" },
        { value: "8", label: "نظام های سازمانی تخصصی" },
      ],
    },
  ]);

  const [postInOrganizationOptions, setPostInOrganizationOptions] =
    useState<any>([
      {
        label: "سمت در سازمان ...",
        options: [
          { value: "1", label: "رئیس اداره" },
          { value: "2", label: "مدیر عامل" },
          { value: "3", label: "معاون" },
          { value: "4", label: "عضو هیئت مدیره" },
          { value: "5", label: "پرسنل" },
          { value: "6", label: "کارشناس و مسئول" },
          { value: "7", label: "دبیر اجرایی" },
          { value: "8", label: "حسابدار" },
          { value: "9", label: "منشی" },
          { value: "10", label: "متصدی امور اداری" },
          { value: "11", label: "نگهبان" },
          { value: "12", label: "راننده" },
          { value: "13", label: "مستخدم" },
          { value: "14", label: "سایر" },
        ],
      },
    ]);

  const [insuranceHistoryOptions, setInsuranceHistoryOptions] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: "31", label: "ندارد" },
        { value: "1", label: "1 سال" },
        { value: "2", label: "2 سال" },
        { value: "3", label: "3 سال" },
        { value: "4", label: "4 سال" },
        { value: "5", label: "5 سال" },
        { value: "6", label: "6 سال" },
        { value: "7", label: "7 سال" },
        { value: "8", label: "8 سال" },
        { value: "9", label: "9 سال" },
        { value: "10", label: "10 سال" },
        { value: "11", label: "11 سال" },
        { value: "12", label: "12 سال" },
        { value: "13", label: "13 سال" },
        { value: "14", label: "14 سال" },
        { value: "15", label: "15 سال" },
        { value: "16", label: "16 سال" },
        { value: "17", label: "17 سال" },
        { value: "18", label: "18 سال" },
        { value: "19", label: "19 سال" },
        { value: "20", label: "20 سال" },
        { value: "21", label: "21 سال" },
        { value: "22", label: "22 سال" },
        { value: "23", label: "23 سال" },
        { value: "24", label: "24 سال" },
        { value: "25", label: "25 سال" },
        { value: "26", label: "26 سال" },
        { value: "27", label: "27 سال" },
        { value: "28", label: "28 سال" },
        { value: "29", label: "29 سال" },
        { value: "30", label: "30 سال" },
      ],
    },
  ]);

  const [skillCertificationOptions, setSkillCertificationOptions] =
    useState<any>([
      {
        label: "گواهی مهارت ...",
        options: [
          { value: "1", label: "سازمان جهاد" },
          { value: "2", label: "سازمان فنی و حرفه ای" },
          { value: "3", label: "صنعت و معدن" },
          { value: "4", label: "سایر" },
          { value: "5", label: "فاقد گواهی مهارت" },
        ],
      },
    ]);

  const [commendationOptions, setCommendationOptions] = useState<any>([
    {
      label: "انتخاب وضعیت ...",
      options: [
        { value: "1", label: "دارای تقدیرنامه" },
        { value: "2", label: "فاقد تقدیرنامه" },
      ],
    },
  ]);

  const [
    skillCertificationFromWorkplaceOptions,
    setSkillCertificationFromWorkplaceOptions,
  ] = useState<any>([
    {
      label: "انتخاب وضعیت",
      options: [
        { value: "1", label: "دارای گواهی" },
        { value: "2", label: "فاقد گواهی" },
      ],
    },
  ]);

  const [insuranceTypeOptions, setInsuranceTypeOptions] = useState<any>([
    {
      label: "انتخاب نوع بیمه",
      options: [
        { value: "1", label: "تامین اجتماعی" },
        { value: "2", label: "خدمات درمانی" },
        { value: "3", label: "بیمه سلامت" },
        { value: "4", label: "خدمات درمانی نیروهای مسلح و کارکنان دولت" },
        { value: "5", label: "روستایی و عشایری" },
        { value: "6", label: "فاقد بیمه پایه" },
      ],
    },
  ]);

  const [provinceOptions, setProvinceOptions] = useState<any>([
    {
      label: "انتخاب کنید",
      options: [],
    },
  ]);

  const [countyOptions, setCountyOptions] = useState<any>([]);

  const [cityOptions, setCityOptions] = useState<any>([]);

  const [supplementaryInsuranceOptions, setSupplementaryInsuranceOptions] =
    useState<any>([
      {
        label: "انتخاب وضعیت ...",
        options: [
          { value: "1", label: "دارای بیمه تکمیلی" },
          { value: "2", label: "فاقد بیمه تکمیلی" },
        ],
      },
    ]);

  const [villageOptions, setVillageOptions] = useState<any>([]);

  const [initialValues, setInitialValues] = useState<any>({
    jobStatus: null,
    workplace: null,
    postInOrganization: null,
    skillCertification: null,
    commendation: null,
    skillCertificationFromWorkplace: null,
    insuranceType: null,
    supplementaryInsurance: null,
    supplementaryInsuranceType: "",
    province: null,
    city: null,
    county: null,
    village: null,
    skillField: "",
    insuranceHistory: null,
    workEmail: "",
    workplaceName: "",
    workExperience: null,
    workplacePostalCode: "",
    workplaceNumber: "",
    economicActivity: "",
  });

  const postJobInfoMutation = useAddUserRealJobInformation();
  const postEditJobInfoMutation = useEditUserRealJobInformation();
  const getAllprovinceByMainLocationIdMutation =
    useGetAllprovinceByMainLocationId();
  const getAllCountyByProvinceIdMutation = useGetAllCountyByProvinceId();
  const getAllCitiesByCountyIdMutation = useGetAllCitiesByCountyId();
  const getAllVillagesByCountyIdMutation = useGetAllVillagesByCountyId();
  const getLocationInformationMutation = useGetLocationInformation();

  const { isSuccess, isLoading, isFetching, isError, data, error, refetch } =
    useJobInfoData();

  useEffect(() => {
    refetch();
  }, [refetchEvent.realUserJobInfoList]);

  useEffect(() => {
    if (data && data.data) {
      let Data = data.data.result;
      if (Data.locationId) {
        getLocationInformationMutation.mutate(Data.locationId, {
          onSuccess: (val) => {},
        });
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (
      getLocationInformationMutation.data &&
      getLocationInformationMutation.data.data
    ) {
      const values = getLocationInformationMutation.data.data.result;

      try {
        getAllCountyByProvinceIdMutation.mutate(values.provinceId);
        getAllCitiesByCountyIdMutation.mutate(values.countyId);
        getAllVillagesByCountyIdMutation.mutate(values.countyId);
      } catch (error) {}

      setInitialValues((state: any) => {
        return {
          ...state,
          province: values.provinceId
            ? { value: values.provinceId.toString(), label: values.province }
            : null,
          county: values.countyId
            ? { value: values.countyId.toString(), label: values.county }
            : null,
          city: values.city
            ? { value: values.cityOrVillageId.toString(), label: values.city }
            : null,
          village: values.village
            ? {
                value: values.cityOrVillageId.toString(),
                label: values.village,
              }
            : null,
        };
      });
    }
  }, [getLocationInformationMutation.isSuccess]);

  useEffect(() => {
    if (
      getAllCountyByProvinceIdMutation.data &&
      getAllCountyByProvinceIdMutation.data.data
    ) {
      const result = getAllCountyByProvinceIdMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({
          value: county.id.toString(),
          label: county.title,
        });
      });
      setCountyOptions(pro);
    }
  }, [getAllCountyByProvinceIdMutation.isSuccess]);

  useEffect(() => {
    if (
      getAllCitiesByCountyIdMutation.data &&
      getAllCitiesByCountyIdMutation.data.data
    ) {
      const result = getAllCitiesByCountyIdMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({
          value: county.id.toString(),
          label: county.title,
        });
      });
      setCityOptions(pro);
    }
  }, [getAllCitiesByCountyIdMutation.isSuccess]);

  useEffect(() => {
    if (
      getAllVillagesByCountyIdMutation.data &&
      getAllVillagesByCountyIdMutation.data.data
    ) {
      const result = getAllVillagesByCountyIdMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({
          value: county.id.toString(),
          label: county.title,
        });
      });
      setVillageOptions(pro);
    }
  }, [getAllVillagesByCountyIdMutation.isLoading]);

  useEffect(() => {
    if (data && data.data) {
      let Data = data.data.result.userJobs;

      console.log("--daataa--", data);

      let newTable: any = [];
      Data.forEach((row: any) => {
        newTable.push({
          id: row.id,
          employmentStatusTitle: simpleOption(
            row.employmentStatus.toString(),
            jobStatusOptions
          ).label,
          employmentStatus: row.employmentStatus,
          workplaceOrganizationTitle: row.workplaceOrganization
            ? fullOption(row.workplaceOrganization.toString(), workplaceOptions)
                .label
            : "",
          workplaceOrganization: row.workplaceOrganization,
          organizationName: row.organizationName,
          workExperience: row.workExperience,
          workExperienceTitle: row.workExperience
            ? fullOption(row.workExperience.toString(), insuranceHistoryOptions)
                .label
            : row.workExperience === 0
            ? fullOption("31", insuranceHistoryOptions).label
            : "",
          workPositionTitle: row.workPosition
            ? fullOption(row.workPosition.toString(), postInOrganizationOptions)
                .label
            : "",
          workPosition: row.workPosition,
          skillCertificateTitle: row.skillCertificate
            ? fullOption(
                row.skillCertificate.toString(),
                skillCertificationOptions
              ).label
            : "",
          skillCertificate: row.skillCertificate,
          skillsField: row.skillsField,
          appreciationTitle: row.appreciation ? "بله" : "خیر",
          appreciation: row.appreciation,
          skillCertificateFromORGTitle: row.skillCertificateFromORG
            ? "بله"
            : "خیر",
          skillCertificateFromORG: row.skillCertificateFromORG,
          insuranceTypeTitle: row.insuranceType
            ? fullOption(row.insuranceType.toString(), insuranceTypeOptions)
                .label
            : "",
          insuranceType: row.insuranceType,
          perfectedInsuranceTitle: row.perfectedInsurance ? "بله" : "خیر",
          perfectedInsurance: row.perfectedInsurance,
          perfectedInsuranceType: row.perfectedInsuranceType,
          insuranceDurationTitle: row.insuranceDuration
            ? fullOption(
                row.insuranceDuration.toString(),
                insuranceHistoryOptions
              ).label
            : row.insuranceDuration === 0
            ? fullOption("31", insuranceHistoryOptions).label
            : "",
          insuranceDuration: row.insuranceDuration,
          locationTitle: row.locationTitle,
          locationId: row.locationId,
          workPostalCode: row.workPostalCode ? row.workPostalCode : "",
          workEmail: row.workEmail ? row.workEmail : "",
          workPhone: row.workPhone ? row.workPhone : "",
          economicActivity: row.economicActivity ? row.economicActivity : "",
        });
      });
      setTableData(newTable);
    }
  }, [isSuccess, data]);

  const { mainLocationId } = useGlobalState();

  useEffect(() => {
    setIsProvinceLoading(true);
    getAllprovinceByMainLocationIdMutation.mutate(mainLocationId[0], {
      onSuccess: (val) => {
        let provinceNewOptions: any = [{ label: "انتخاب کنید", options: [] }];
        let options: any = [];
        val.data.result.forEach((county: any) => {
          options.push({ value: county.id, label: county.title });
        });
        provinceNewOptions[0].options = options;
        setProvinceOptions(provinceNewOptions);
      },
    });
  }, []);

  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const { setStatus } = useStatusPermission();

  const onSubmit = (value: any) => {
    value = ObjectPersianToEnglish(value);

    if (isInEditMode) {
      let createLocationId = 0;
      if (value.village) {
        createLocationId = parseInt(value.village.value);
      } else if (value.city) {
        createLocationId = parseInt(value.city.value);
      }

      const obj = {
        id: editRowID,
        employmentStatus: parseInt(value.jobStatus.value),
        workplaceOrganization: value.workplace
          ? parseInt(value.workplace.value)
          : 0,
        organizationName: value.workplaceName,
        workExperience: value.workExperience
          ? value.workExperience.value === "31"
            ? 0
            : parseInt(value.workExperience.value)
          : 0,
        workPosition: value.postInOrganization
          ? parseInt(value.postInOrganization.value)
          : 0,
        skillCertificate: value.skillCertification
          ? parseInt(value.skillCertification.value)
          : 0,
        skillsField: value.skillField,
        appreciation: value.commendation
          ? value.commendation.value === "1"
          : false,
        skillCertificateFromORG: value.skillCertificationFromWorkplace
          ? value.skillCertificationFromWorkplace.value === "1"
          : false,
        insuranceType: value.insuranceType
          ? parseInt(value.insuranceType.value)
          : 0,
        perfectedInsurance: value.supplementaryInsurance
          ? value.supplementaryInsurance.value === "1"
          : false,
        perfectedInsuranceType: value.supplementaryInsuranceType,
        insuranceDuration: value.insuranceHistory
          ? value.insuranceHistory.value === "31"
            ? 0
            : parseInt(value.insuranceHistory.value)
          : 0,
        locationId: createLocationId,
        workPostalCode: value.workplacePostalCode,
        workEmail: value.workEmail,
        workPhone: value.workplaceNumber,
        economicActivity: value.economicActivity,
      };

      postEditJobInfoMutation.mutate(obj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.realUserJobInfoList = !newEvent.realUserJobInfoList;
          setRefetchEvent(newEvent);

          setInitialValues({
            jobStatus: null,
            workplace: null,
            postInOrganization: null,
            skillCertification: null,
            commendation: null,
            skillCertificationFromWorkplace: null,
            insuranceType: null,
            supplementaryInsurance: null,
            supplementaryInsuranceType: "",
            province: null,
            city: null,
            county: null,
            village: null,
            skillField: "",
            insuranceHistory: "",
            workEmail: "",
            workplaceName: "",
            workExperience: "",
            workplacePostalCode: "",
            workplaceNumber: "",
          });

          setIsInEditMode(false);
          setEditRowID(0);
        },
      });
    } else {
      let createLocationId = 0;

      if (value.village) {
        createLocationId = parseInt(value.village.value);
      } else if (value.city) {
        createLocationId = parseInt(value.city.value);
      }

      const obj = {
        employmentStatus: parseInt(value.jobStatus.value),
        workplaceOrganization: value.workplace
          ? parseInt(value.workplace.value)
          : 0,
        organizationName: value.workplaceName,
        workExperience: value.workExperience
          ? value.workExperience.value === "31"
            ? 0
            : parseInt(value.workExperience.value)
          : 0,
        workPosition: value.postInOrganization
          ? parseInt(value.postInOrganization.value)
          : 0,
        skillCertificate: value.skillCertification
          ? parseInt(value.skillCertification.value)
          : 0,
        skillsField: value.skillField,
        appreciation: value.commendation
          ? value.commendation.value === "1"
          : false,
        skillCertificateFromORG: value.skillCertificationFromWorkplace
          ? value.skillCertificationFromWorkplace.value === "1"
          : false,
        insuranceType: value.insuranceType
          ? parseInt(value.insuranceType.value)
          : 0,
        perfectedInsurance: value.supplementaryInsurance
          ? value.supplementaryInsurance.value === "1"
          : false,
        perfectedInsuranceType: value.supplementaryInsuranceType,
        insuranceDuration: value.insuranceHistory
          ? value.insuranceHistory.value === "31"
            ? 0
            : parseInt(value.insuranceHistory.value)
          : 0,
        locationId: createLocationId,
        workPostalCode: value.workplacePostalCode,
        workEmail: value.workEmail,
        workPhone: value.workplaceNumber,
        economicActivity: value.economicActivity,
      };

      postJobInfoMutation.mutate(obj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.realUserJobInfoList = !newEvent.realUserJobInfoList;
          setRefetchEvent(newEvent);

          setInitialValues({
            jobStatus: null,
            workplace: null,
            postInOrganization: null,
            skillCertification: null,
            commendation: null,
            skillCertificationFromWorkplace: null,
            insuranceType: null,
            supplementaryInsurance: null,
            supplementaryInsuranceType: "",
            province: null,
            city: null,
            county: null,
            village: null,
            skillField: "",
            insuranceHistory: "",
            workEmail: "",
            workplaceName: "",
            workExperience: "",
            workplacePostalCode: "",
            workplaceNumber: "",
          });
        },
      });
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={JobInfoValidate}
      >
        {({ values, handleChange, setFieldValue }) => {
          return (
            <Form noValidate>
              {isFetching ? (
                <>
                  <FallBackSpinner />
                </>
              ) : (
                <>
                  {" "}
                  <div className={Styles.contentContainer}>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              significant={true}
                              placeHolder="انتخاب وضعیت اشتغال"
                              name="jobStatus"
                              handleChange={handleChange}
                              data={jobStatusOptions}
                              lableText="وضعیت اشتغال"
                            />
                          </Col>
                        </Row>
                        {values.jobStatus &&
                          values.jobStatus.value !== "5" &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && (
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  name="workplace"
                                  data={workplaceOptions}
                                  placeHolder="انتخاب نوع سازمان محل کار"
                                  lableText=" نوع سازمان محل کار"
                                  significant
                                />
                              </Col>
                            </Row>
                          )}
                        {values.jobStatus &&
                          values.jobStatus.value !== "5" &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && (
                            <Row>
                              <Col>
                                <TextInput
                                  significant={true}
                                  lableText="نام سازمان"
                                  name="workplaceName"
                                  placeholder="نام سازمان محل کار"
                                />
                              </Col>
                            </Row>
                          )}
                        {values.jobStatus &&
                          values.jobStatus.value !== "5" &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && (
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  name="postInOrganization"
                                  data={postInOrganizationOptions}
                                  placeHolder="انتخاب سمت در سازمان"
                                  lableText="سمت در سازمان"
                                  significant
                                />
                              </Col>
                            </Row>
                          )}

                        <Row>
                          <Col>
                            <TextInput
                              lableText="رشته مهارتی"
                              name="skillField"
                              placeholder="رشته مهارتی"
                              type="text"
                            />
                          </Col>
                        </Row>
                        {values.jobStatus &&
                          values.jobStatus.value !== "5" &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && (
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  name="skillCertificationFromWorkplace"
                                  placeHolder="انتخاب وضعیت گواهی مهارت ..."
                                  data={skillCertificationFromWorkplaceOptions}
                                  lableText="وضعیت گواهی مهارت"
                                  significant
                                />
                              </Col>
                            </Row>
                          )}

                        {/* {values.jobStatus &&
                          values.jobStatus.value !== "5" &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && ( */}
                        <Row>
                          <Col>
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  name="skillCertification"
                                  data={skillCertificationOptions}
                                  placeHolder="انتخاب گواهی مهارت"
                                  lableText="مرجع صدور گواهی مهارت"
                                  significant
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {/* // )} */}

                        {values.jobStatus &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && (
                            <>
                              <Row>
                                <Col>
                                  <BasicSelectOption
                                    name="province"
                                    placeHolder="انتخاب استان"
                                    data={provinceOptions}
                                    isLoading={
                                      getAllprovinceByMainLocationIdMutation.isLoading
                                    }
                                    lableText="استان"
                                    onChange={(opt, e) => {
                                      getAllCountyByProvinceIdMutation.mutate(
                                        parseInt(opt.value),
                                        {
                                          onSuccess: (val) => {
                                            let counties: any = [];
                                            val.data.result.forEach(
                                              (row: any) => {
                                                counties.push({
                                                  value: row.id,
                                                  label: row.title,
                                                });
                                              }
                                            );

                                            setCountyOptions(counties);
                                          },
                                        }
                                      );
                                      setFieldValue("province", {
                                        value: opt.value,
                                        label: opt.label,
                                      });
                                      setFieldValue("county", null);
                                      setFieldValue("city", null);
                                      setFieldValue("village", null);
                                      setCityOptions([]);
                                      setVillageOptions([]);
                                    }}
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <BasicSelectOption
                                    name="county"
                                    data={countyOptions}
                                    isLoading={
                                      getAllCountyByProvinceIdMutation.isLoading
                                    }
                                    placeHolder="انتخاب شهرستان"
                                    lableText="شهرستان"
                                    onChange={async (opt, e) => {
                                      getAllCitiesByCountyIdMutation.mutate(
                                        parseInt(opt.value),
                                        {
                                          onSuccess: (val) => {
                                            let cities: any = [];
                                            val.data.result.forEach(
                                              (row: any) => {
                                                cities.push({
                                                  value: row.id,
                                                  label: row.title,
                                                });
                                              }
                                            );
                                            setCityOptions(cities);
                                          },
                                        }
                                      );
                                      getAllVillagesByCountyIdMutation.mutate(
                                        parseInt(opt.value),
                                        {
                                          onSuccess: (val) => {
                                            let villages: any = [];
                                            val.data.result.forEach(
                                              (row: any) => {
                                                villages.push({
                                                  value: row.id,
                                                  label: row.title,
                                                });
                                              }
                                            );
                                            setVillageOptions(villages);
                                          },
                                        }
                                      );
                                      setFieldValue("county", {
                                        value: opt.value,
                                        label: opt.label,
                                      });
                                      setFieldValue("city", null);
                                      setFieldValue("village", null);
                                    }}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <BasicSelectOption
                                    placeHolder="انتخاب شهر"
                                    name="city"
                                    isLoading={
                                      getAllCitiesByCountyIdMutation.isLoading
                                    }
                                    data={cityOptions}
                                    significant
                                    lableText="شهر"
                                    onChange={(opt, e) => {
                                      setFieldValue("city", {
                                        value: opt.value,
                                        label: opt.label,
                                      });
                                      setFieldValue("village", null);
                                    }}
                                  />
                                </Col>
                              </Row>
                            </>
                          )}
                        {values.jobStatus &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && (
                            <>
                              <Row>
                                <Col>
                                  <BasicSelectOption
                                    placeHolder="انتخاب روستا"
                                    significant
                                    name="village"
                                    isLoading={
                                      getAllVillagesByCountyIdMutation.isLoading
                                    }
                                    data={villageOptions}
                                    lableText="روستا"
                                    onChange={(opt, e) => {
                                      setFieldValue("village", {
                                        value: opt.value,
                                        label: opt.label,
                                      });
                                      setFieldValue("city", null);
                                    }}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <TextInput
                                    lableText="ایمیل کاری"
                                    name="workEmail"
                                    placeholder="مثلا name@email.com"
                                    type="email"
                                  />
                                </Col>
                              </Row>
                            </>
                          )}
                      </Col>
                      <Col md="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              name="commendation"
                              data={commendationOptions}
                              placeHolder="انتخاب تقدیر نامه"
                              lableText="تقدیرنامه"
                              significant
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              significant={true}
                              name="insuranceType"
                              placeHolder="انتخاب نوع بیمه"
                              data={insuranceTypeOptions}
                              lableText="نوع بیمه"
                            />
                          </Col>
                        </Row>
                        {values.insuranceType &&
                          values.insuranceType.value !== "6" && (
                            <>
                              <Row>
                                <Col>
                                  <BasicSelectOption
                                    name="supplementaryInsurance"
                                    data={supplementaryInsuranceOptions}
                                    placeHolder="انتخاب وضعیت بیمه تکمیلی"
                                    lableText="وضعیت بیمه تکمیلی"
                                  />
                                </Col>
                              </Row>
                              {values.supplementaryInsurance &&
                                values.supplementaryInsurance.value === "1" && (
                                  <Row>
                                    <Col>
                                      <TextInput
                                        lableText="نوع بیمه تکمیلی"
                                        name="supplementaryInsuranceType"
                                        placeholder=""
                                        significant
                                      />
                                    </Col>
                                  </Row>
                                )}
                            </>
                          )}
                        {values.jobStatus &&
                          values.jobStatus.value !== "6" &&
                          values.jobStatus.value !== "7" && (
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  significant={true}
                                  data={insuranceHistoryOptions}
                                  lableText="مدت سابقه کار (سال)"
                                  name="workExperience"
                                  placeHolder="سابقه کار ..."
                                />
                              </Col>
                            </Row>
                          )}

                        <Row>
                          <Col>
                            <BasicSelectOption
                              significant={true}
                              data={insuranceHistoryOptions}
                              lableText="سابقه بیمه (سال)"
                              name="insuranceHistory"
                              placeHolder="سابقه بیمه ..."
                            />
                          </Col>
                        </Row>

                        {values.jobStatus &&
                          values.jobStatus.value !== "7" &&
                          values.jobStatus.value !== "6" && (
                            <Row>
                              <Col>
                                <TextInput
                                  lableText="کد پستی محل کار"
                                  name="workplacePostalCode"
                                  placeholder="کد پستی محل کار ..."
                                  type="text"
                                />
                              </Col>
                            </Row>
                          )}
                        {values.jobStatus &&
                          values.jobStatus.value !== "7" &&
                          values.jobStatus.value !== "6" && (
                            <Row>
                              <Col>
                                <TextInput
                                  lableText="شماره تلفن محل کار"
                                  name="workplaceNumber"
                                  placeholder="شماره تلفن محل کار"
                                  type="tell"
                                />
                              </Col>
                            </Row>
                          )}
                        {values.jobStatus && values.jobStatus.value === "5" && (
                          <Row>
                            <Col>
                              <TextInput
                                lableText="فعالیت اقتصادی"
                                name="economicActivity"
                                placeholder="فعالیت اقتصادی"
                              />
                            </Col>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  </div>
                  <SubmitButton
                    btnText={isInEditMode ? "ثبت ویرایش" : "ذخیره اطلاعات"}
                    clearable={isInEditMode ? true : false}
                    nextTo="/PersonalInfo/PersonalDocuments"
                    backTo="/PersonalInfo/ContactInfo"
                    clearableTxt="لغو ویرایش"
                    onClear={() => {
                      setIsInEditMode(false);
                      setEditRowID(0);
                      setInitialValues({
                        jobStatus: null,
                        workplace: null,
                        postInOrganization: null,
                        skillCertification: null,
                        commendation: null,
                        skillCertificationFromWorkplace: null,
                        insuranceType: null,
                        supplementaryInsurance: null,
                        supplementaryInsuranceType: "",
                        province: null,
                        city: null,
                        county: null,
                        village: null,
                        skillField: "",
                        insuranceHistory: "",
                        workEmail: "",
                        workplaceName: "",
                        workExperience: "",
                        workplacePostalCode: "",
                        workplaceNumber: "",
                      });
                    }}
                    isLoading={
                      postJobInfoMutation.isLoading ||
                      postEditJobInfoMutation.isLoading
                    }
                  />
                  <Row style={{ marginTop: "25px" }}>
                    <Col>
                      <List
                        tableData={tableData}
                        setTableData={setTableData}
                        setInitialValues={setInitialValues}
                        setIsInEditMode={setIsInEditMode}
                        setEditRowID={setEditRowID}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { RealJobInfo };
