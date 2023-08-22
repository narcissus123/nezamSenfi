import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { QueryObserverResult } from "react-query";
import { useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { DocumentTypeEnum } from "../../../../../../../../core/enums/document-category-type.enum";
import { LicenseRequestStatusEnum } from "../../../../../../../../core/enums/license-request-status.enums";
import { FullOptionSel } from "../../../../../../../../core/models";
import { IAxiosResult } from "../../../../../../../../core/models/axios-result.model";
import {
  useAllUseTypes,
  useGetDocumentByDocumentCategoryTypeEnum,
  useGetJobsByUseTypes,
  useGetLocationInformation,
  useSetPrimaryInformationOfLicenseRequestByExpert,
} from "../../../../../../../../core/services/api";
import { useGetAllCountyJahadCenterForDropdown } from "../../../../../../../../core/services/api/jahad-center.api";
import { useGetAllUnionUseTypes, useGetJobsByUnionUseTypes } from "../../../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../../../core/utils";
import {
  MergedSetPrimaryInfoFirst,
  MergedSetPrimaryInfoSecond,
  MergedSetPrimaryInfoThird,
} from "../../../../../../../../core/validations/expertize-license-primary-info.validation";
import {
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface ISetPrimaryInfo {
  licenseRequestId: number;
  fixedOrMobieTypeByExpert: number;
  guildUnitType: number;
  statusOfGuildUnit: number;
  documentIds: number[];
  documentOfficialIds: number[];
  jobs: {
    jobId: number;
    isMain: boolean;
  }[];
  jahadCenterId: number;
  visitedDate: string;
}

interface IPrimaryTypes {
  visitedDate: string;
  fixedOrMobieTypeByExpert: number;
  fixedOrMobieTypeByExpertTitle: string;
  guildUnitType: number;
  guildUnitTypeTitle: string;
  jobs:
    | { id: number; title: string; isMain: boolean }[]
    | { id: number; title: string; isMain: boolean };
  licenseTypeEnum: number;
  licenseTypeEnumTitle: string;
  statusOfGuildUnit: number;
  statusOfGuildUnitTitle: string;
  useTypes: { id: number; title: string }[] | { id: number; title: string };
  cityOrVillageId: number;
  jahadCenterId: number;
  jahadCenterTitle: string;
  documentIds: number[];
  documentOfficialIds: number[];
}

interface IPropTypes {
  cityOrVillageId: number | null;
  primaryInformation: IPrimaryTypes | null;
  status: { status: number; statusTitle: string } | null;
  countyUnionId: number | null;
  description: string | null;
  refetch: (
    option?: any
  ) => Promise<QueryObserverResult<AxiosResponse<IAxiosResult>, unknown>>;
}

const SetPrimaryInfoLicense: FC<IPropTypes> = ({
  cityOrVillageId,
  primaryInformation,
  status,
  description,
  refetch,
  countyUnionId
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    locationOfTheUnionUnit: null,
    unionUnitType: null,
    jobId: null,
    useTypeId: null,
    statusOfUnionUnit: null,
    primaryJobId: null,
    visitDate: "",
    TypeOfLicense: null,
    jahadCenterId: null,
  });

  const getLicenseTypeMutation = useGetDocumentByDocumentCategoryTypeEnum();
  const getLOfficialDocumetsMutation = useGetDocumentByDocumentCategoryTypeEnum();

  useEffect(() => {
    getLicenseTypeMutation.mutate(DocumentTypeEnum.ActivityLicense, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        const newLicenseTypes: any = [];
        result.forEach((category: any) => {
          let opt: any = [];
          category.documents.forEach((row: any) => {
            opt.push({ value: row.documentId, label: row.documentTitle });
          });

          newLicenseTypes.push({ label: category.categoryTitle, options: opt });
        });
        setTypeOfLicense(newLicenseTypes);
      },
    });
  }, []);

  useEffect(() => {
    getLOfficialDocumetsMutation.mutate(DocumentTypeEnum.Official, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        const newLicenseTypes: any = [];
        result.forEach((category: any) => {
          let opt: any = [];
          category.documents.forEach((row: any) => {
            opt.push({ value: row.documentId, label: row.documentTitle });
          });

          newLicenseTypes.push({ label: category.categoryTitle, options: opt });
        });
        setTypeOfOfficeLicense(newLicenseTypes);
      },
    });
  }, []);
  

  useEffect(() => {
    if (primaryInformation) {
      let jobs:
        | { value: number; label: string }[]
        | { value: number; label: string }
        | any = [];
      let mainJob: { value: number; label: string } = { value: 0, label: "" };

      if (Array.isArray(primaryInformation.jobs)) {
        primaryInformation.jobs.forEach((job) => {
          if (job.isMain) {
            mainJob = { value: job.id, label: job.title };
          }
          jobs.push({ value: job.id, label: job.title });
        });
      } else {
        if (primaryInformation.jobs.isMain) {
          mainJob = {
            value: primaryInformation.jobs.id,
            label: primaryInformation.jobs.title,
          };
        }
        jobs = {
          value: primaryInformation.jobs.id,
          label: primaryInformation.jobs.title,
        };
      }

      let useTypes:
        | { id: number; title: string }[]
        | { id: number; title: string }
        | any = [];

      if (Array.isArray(primaryInformation.useTypes)) {
        primaryInformation.useTypes.forEach((useType) => {
          useTypes.push({ value: useType.id, label: useType.title });
        });
      } else
        useTypes = {
          value: primaryInformation.useTypes.id,
          label: primaryInformation.useTypes.title,
        };

      let TypeOfLicense: any = [];

      if (primaryInformation.documentIds) {
        primaryInformation.documentIds.forEach((row: any) => {
          TypeOfLicense.push({ value: row, label: "" });
        });
      }

      let documentOfficialIds: any = [];

      if (primaryInformation.documentOfficialIds) {
        primaryInformation.documentOfficialIds.forEach((row: any) => {
          documentOfficialIds.push({ value: row, label: "" });
        });
      }

      setInitialValues({
        visitDate: primaryInformation.visitedDate,
        jahadCenterId: primaryInformation.jahadCenterId
          ? {
              value: primaryInformation.jahadCenterId,
              label: primaryInformation.jahadCenterTitle,
            }
          : null,
        locationOfTheUnionUnit: primaryInformation.fixedOrMobieTypeByExpert
          ? {
              value: primaryInformation.fixedOrMobieTypeByExpert,
              label: primaryInformation.fixedOrMobieTypeByExpertTitle,
            }
          : null,
        unionUnitType: primaryInformation.guildUnitType
          ? {
              value: primaryInformation.guildUnitType,
              label: primaryInformation.guildUnitTypeTitle,
            }
          : null,
        jobId: jobs ? jobs : null,
        useTypeId: useTypes ? useTypes : null,
        statusOfUnionUnit: primaryInformation.statusOfGuildUnit
          ? {
              value: primaryInformation.statusOfGuildUnit,
              label: primaryInformation.statusOfGuildUnitTitle,
            }
          : null,
        primaryJobId: mainJob.value !== 0 ? mainJob : null,
        TypeOfLicense: TypeOfLicense,
        documentOfficialIds: documentOfficialIds,
      });
    }
  }, [primaryInformation]);

  const { id } = useParams<{ id: string }>();

  const locationOfTheUnionUnit = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "ثابت" },
        { value: 2, label: "سیار" },
      ],
    },
  ];
  const statusOfUnionUnit = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "دائم" },
        { value: 2, label: "موقت" },
      ],
    },
  ];

  const [TypeOfLicense, setTypeOfLicense] = useState<any>([
    {
      label: "یک گزینه را انتخاب کنید",
      options: [],
    },
  ]);

  const [TypeOfOfficeLicense, setTypeOfOfficeLicense] = useState<any>([
    {
      label: "یک گزینه را انتخاب کنید",
      options: [],
    },
  ]);
  
  const unionUnitType = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "چند منظوره" },
        { value: 2, label: "مرکب" },
        { value: 3, label: "ساده" },
        { value: 4, label: "کشاورزی عمومی" },
      ],
    },
  ];

  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [jobData, setJobData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [primaryJobData, setPrimaryJobData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [jahadCenterData, setJahadCenterData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [validationOrder, setValidationOrder] = useState<number>(1);

  const locationInfo = useGetLocationInformation();
  const getJahadMutation = useGetAllCountyJahadCenterForDropdown();

  useEffect(() => {
    console.log("-- -- ,--- ", cityOrVillageId);

    if (cityOrVillageId) {
      locationInfo.mutate(cityOrVillageId, {
        onSuccess: (val: any) => {
          getJahadMutation.mutate(val.data.result.countyId, {
            onSuccess: (val: any) => {
              const result = val.data.result;
              const jahads: any = [
                {
                  label: "انتخاب کنید ...",
                  options: [],
                },
              ];

              let opt: any = [];
              result.forEach((jahad: any) => {
                opt.push({
                  value: jahad.id,
                  label: jahad.title,
                });
              });

              jahads[0].options = opt;
              setJahadCenterData(jahads);
            },
          });
        },
      });
    }
  }, [cityOrVillageId]);

  const getUseTypesMutation = useGetAllUnionUseTypes();

  const getJobs = useGetJobsByUnionUseTypes();
  const setPrimaryInfo = useSetPrimaryInformationOfLicenseRequestByExpert();


  useEffect(() => {
    if (countyUnionId) {
      getUseTypesMutation.mutate(countyUnionId);
    }
  }, [countyUnionId]);

  useEffect(() => {
    if (
      getUseTypesMutation &&
      getUseTypesMutation.data &&
      getUseTypesMutation.data.data
    ) {
      const result = getUseTypesMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((useType: any) => {
        pro[0].options.push({
          value: useType.id,
          label: useType.title,
          useTypeEnum: useType.useTypeEnum,
        });
      });
      setUseTypeData(pro);
    }
  }, [getUseTypesMutation.data, getUseTypesMutation.isSuccess]);

  const onSingleUseTypeChange = (
    opt: { value: number; label: string },
    setFieldValue: any
  ) => {
    setJobData([]);
    setFieldValue("useTypeId", opt);
    setFieldValue("jobId", null);
    setFieldValue("primaryJobId", null);
    getJobs.mutate(
      { unionId: countyUnionId, useTypeIds: [opt.value] },
      {
        onSuccess: (val) => {
          const result = val.data.result;
           const job: any = [{
            label: "انتخاب کنید ...",
            options: [],
          }];
          result.forEach((useType: any) => {
            job[0].options.push({
              value: useType.jobs.jobId,
              label: useType.jobs.jobTitle,
            });
          });
          console.log('--job--', job);
          
          setJobData(job);
        },
      }
    );
  };

  const onMultiUseTypeChange = (opt: any, setFieldValue: any) => {
    setJobData([]);
    setFieldValue("jobId", null);
    setFieldValue("primaryJobId", null);
    setFieldValue("useTypeId", opt);
    console.log(opt);
    const useTypeIds: number[] = [];
    if (opt) {
      opt.forEach((item: any) => {
        useTypeIds.push(item.value);
      });
      getJobs.mutate(
        { unionId: countyUnionId, useTypeIds },
        {
          onSuccess: (val) => {
            const result = val.data.result;
            const job: any = [{
             label: "انتخاب کنید ...",
             options: [],
           }];
           result.forEach((useType: any) => {
             job[0].options.push({
               value: useType.jobs.jobId,
               label: useType.jobs.jobTitle,
             });
           });
           console.log('--job--', job);

           setJobData(job);
          },
        }
      );
    } else {
      setFieldValue("jobId", null);
      setJobData([]);
    }
  };

  const onSubmit = (values: any) => {
    let jobs: { jobId: number; isMain: boolean }[] = [];

    if (Array.isArray(values.jobId)) {
      values.jobId.forEach((job: any) => {
        jobs.push({
          jobId: job.value,
          isMain: values.primaryJobId.value === job.value,
        });
      });
    } else jobs = [{ jobId: values.primaryJobId.value, isMain: true }];

    let licenseTypeEnum: any = [];
    console.log(values.TypeOfLicense);

    if (values.TypeOfLicense) {
      values.TypeOfLicense.forEach((row: any) => {
        licenseTypeEnum.push(row.value);
      });
    }

    let documentOfficialIds: any = [];

    if (values.documentOfficialIds) {
      values.documentOfficialIds.forEach((row: any) => {
        documentOfficialIds.push(row.value);
      });
    }

    const setPrimaryInfoObj: ISetPrimaryInfo = {
      fixedOrMobieTypeByExpert: values.locationOfTheUnionUnit.value,
      guildUnitType: values.unionUnitType.value,
      licenseRequestId: +id,
      documentIds: licenseTypeEnum,
      statusOfGuildUnit: values.statusOfUnionUnit.value,
      jobs: jobs,
      jahadCenterId: values.jahadCenterId.value,
      visitedDate: values.visitDate,
      documentOfficialIds: documentOfficialIds,
    };

    setPrimaryInfo.mutate(setPrimaryInfoObj, {
      onSuccess: () => {
        showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
        refetch();
      },
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت اطلاعات کارشناسی پرونده</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={
            validationOrder === 1
              ? MergedSetPrimaryInfoFirst
              : validationOrder === 2
              ? MergedSetPrimaryInfoSecond
              : MergedSetPrimaryInfoThird
          }
        >
          {({ values, setFieldValue }) => (
            <Form>
              {status?.statusTitle && (
                <Alert color="info">{status?.statusTitle}</Alert>
              )}
              {description && <Alert color="warning">{description}</Alert>}

              <Row>
                <Col sm="6">
                  <BasicSelectOption
                    data={locationOfTheUnionUnit}
                    name="locationOfTheUnionUnit"
                    lableText="وضعیت مکانی واحد صنفی"
                    significant
                    placeHolder="یک گزینه را انتخاب کنید"
                    isDisabled={
                      status
                        ? status.status >= LicenseRequestStatusEnum.Expertise
                        : false
                    }
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    data={unionUnitType}
                    name="unionUnitType"
                    lableText="نوع واحد صنفی"
                    isDisabled={
                      status
                        ? status.status >= LicenseRequestStatusEnum.Expertise
                        : false
                    }
                    significant
                    onChange={(opt) => {
                      setFieldValue("useTypeId", null);
                      setFieldValue("jobId", null);
                      setFieldValue("primaryJobId", null);
                      setFieldValue("unionUnitType", opt);
                      setJobData([]);
                      setPrimaryJobData([]);
                      if (opt.value === 1 || opt.value === 4)
                        setValidationOrder(1);
                      else if (opt.value === 2) setValidationOrder(2);
                      else setValidationOrder(3);
                    }}
                    placeHolder="یک گزینه را انتخاب کنید"
                  />
                </Col>
                <Col sm="4">
                  {values.unionUnitType &&
                  (values.unionUnitType.value === 1 ||
                    values.unionUnitType.value === 4) ? (
                    <MultiSelectOption
                      options={useTypeData}
                      name="useTypeId"
                      hasLabel
                      labelText="نوع کاربری"
                      significant
                      isDisabled={
                        status
                          ? status.status >= LicenseRequestStatusEnum.Expertise
                          : false
                      }
                      onChange={(opt) =>
                        onMultiUseTypeChange(opt, setFieldValue)
                      }
                      isLoading={getUseTypesMutation.isLoading}
                      placeHolder="نوع کاربری را انتخاب کنید"
                    />
                  ) : (
                    <BasicSelectOption
                      data={useTypeData}
                      name="useTypeId"
                      lableText="نوع کاربری"
                      significant
                      onChange={(opt) =>
                        onSingleUseTypeChange(opt, setFieldValue)
                      }
                      isLoading={getUseTypesMutation.isLoading}
                      placeHolder="یک گزینه را انتخاب کنید"
                      isDisabled={
                        !values.unionUnitType ||
                        (status
                          ? status.status >= LicenseRequestStatusEnum.Expertise
                          : false)
                      }
                    />
                  )}
                </Col>

                <Col sm="4">
                  {values.unionUnitType && values.unionUnitType.value !== 3 ? (
                    <MultiSelectOption
                      options={jobData}
                      name="jobId"
                      hasLabel
                      labelText="شغل"
                      significant
                      isDisabled={
                        status
                          ? status.status >= LicenseRequestStatusEnum.Expertise
                          : false
                      }
                      onChange={(opt) => {
                        setPrimaryJobData([
                          {
                            label: "انتخاب کنید...",
                            options: [],
                          },
                        ]);
                        setFieldValue("primaryJobId", null);
                        setFieldValue("jobId", opt);
                        opt &&
                          setPrimaryJobData([
                            {
                              label: "انتخاب کنید...",
                              options: opt,
                            },
                          ]);
                      }}
                      isLoading={getJobs.isLoading}
                      placeHolder="شغل را انتخاب کنید"
                    />
                  ) : (
                    <BasicSelectOption
                      data={jobData}
                      name="jobId"
                      lableText="شغل"
                      significant
                      onChange={(opt) => {
                        setPrimaryJobData([
                          {
                            label: "انتخاب کنید...",
                            options: [],
                          },
                        ]);
                        setFieldValue("primaryJobId", null);
                        setFieldValue("jobId", opt);
                        opt &&
                          setPrimaryJobData([
                            {
                              label: "انتخاب کنید...",
                              options: [opt],
                            },
                          ]);
                      }}
                      isLoading={getJobs.isLoading}
                      placeHolder="یک گزینه را انتخاب کنید"
                      isDisabled={
                        !values.unionUnitType ||
                        (status
                          ? status.status >= LicenseRequestStatusEnum.Expertise
                          : false)
                      }
                    />
                  )}
                </Col>

                <Col sm="4">
                  <BasicSelectOption
                    data={primaryJobData}
                    name="primaryJobId"
                    lableText="شغل اصلی"
                    significant
                    placeHolder="یک گزینه را انتخاب کنید"
                    isDisabled={
                      !values.unionUnitType ||
                      (status
                        ? status.status >= LicenseRequestStatusEnum.Expertise
                        : false)
                    }
                  />
                </Col>

                <Col sm="6">
                  <BasicSelectOption
                    data={statusOfUnionUnit}
                    name="statusOfUnionUnit"
                    lableText="وضعیت واحد صنفی"
                    significant
                    placeHolder="یک گزینه را انتخاب کنید"
                    // isDisabled={
                    //   status
                    //     ? status.status >= LicenseRequestStatusEnum.Expertise
                    //     : false
                    // }
                  />
                </Col>

                <Col sm="6">
                  <ModernDatePicker
                    name="visitDate"
                    hasLabel
                    lableText="تاریخ بازدید"
                    placeholder="تاریخ بازدید را وارد کنید"
                    significant
                    initialValue={values.visitDate}
                    hasMaximum={true}
                    // disabled={
                    //   status
                    //     ? status.status >= LicenseRequestStatusEnum.Expertise
                    //     : false
                    // }
                  />
                </Col>
                <Col sm="6">
                  <MultiSelectOption
                    options={TypeOfLicense}
                    name="TypeOfLicense"
                    hasLabel
                    labelText="نوع مجوزات فعالیت"
                    significant={false}
                    // isDisabled={
                    //   status
                    //     ? status.status >= LicenseRequestStatusEnum.Expertise
                    //     : false
                    // }
                    onChange={(e) => setFieldValue("TypeOfLicense", e)}
                    isLoading={getLicenseTypeMutation.isLoading}
                    placeHolder="نوع مجوزات فعالیت را وارد کنید ..."
                  />
                </Col>
                <Col sm="6">
                  <MultiSelectOption
                    options={TypeOfOfficeLicense}
                    name="documentOfficialIds"
                    hasLabel
                    labelText="نوع مجوزات اداری"
                    significant={getLOfficialDocumetsMutation.isLoading}
                    // isDisabled={
                    //   status
                    //     ? status.status >= LicenseRequestStatusEnum.Expertise
                    //     : false
                    // }
                    onChange={(e) => setFieldValue("documentOfficialIds", e)}
                    isLoading={getLicenseTypeMutation.isLoading}
                    placeHolder="نوع مجوزات اداری را انتخاب کنید ..."
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    data={jahadCenterData}
                    name="jahadCenterId"
                    lableText="مرکز جهاد"
                    significant
                    placeHolder="یک گزینه را انتخاب کنید"
                    // isDisabled={
                    //   status
                    //     ? status.status >= LicenseRequestStatusEnum.Expertise
                    //     : false
                    // }
                    isLoading={
                      locationInfo.isLoading || getJahadMutation.isLoading
                    }
                  />
                </Col>
              </Row>

              <FormGroup>
                <SubmitButton
                  isLoading={setPrimaryInfo.isLoading}
                  btnText="ثبت اطلاعات پرونده"
                  values={values}
                  // isDisabled={
                  //   status
                  //     ? status.status >= LicenseRequestStatusEnum.Expertise
                  //     : false
                  // }
                  schema={
                    validationOrder === 1
                      ? MergedSetPrimaryInfoFirst
                      : validationOrder === 2
                      ? MergedSetPrimaryInfoSecond
                      : MergedSetPrimaryInfoThird
                  }
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { SetPrimaryInfoLicense };
