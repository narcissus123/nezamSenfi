import { Form, Formik } from "formik";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { LicenseRequestStatusEnum } from "../../../../../../../core/enums/license-request-status.enums";
import {
  useAllUseTypes,
  useCompleteRequiredDocumentAndSendToMathing,
  useDownloadCertificateByUserApplicant,
  useDownloadLicenseByUserApplicant,
  useGetAllCitiesWithPartByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useGetAllVillagesWithPartByCountyId,
  useGetLocationInformation,
  useGetMyLicenseRequest,
  usePostGetAllJobByCountyAndUseType,
  usePostSetLicensRequest,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../core/utils/context/GlobalContext";
import { NewLicenseValidate } from "../../../../../../../core/validations/new-license.validations";
import {
  FormDivider,
  SimpleSubmitButton,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { CardWrapper } from "../../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { TwoColumn } from "../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { StatusWrapper } from "../../../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { PrintLicense } from "../../../Shared/PrintLicense/PrintLicense";

interface IPropTypes {
  isFromDetails?: boolean;
  licenseDetail?: any;
  id?: any;
  inEditMode?: boolean;
  setLicenseDetail?: any;
  sections?: any
}

const New: FC<IPropTypes> = ({
  isFromDetails,
  licenseDetail,
  id,
  inEditMode,
  setLicenseDetail,
  sections
}) => {
  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [township, setTownship] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [city, setCity] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [village, setVillage] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [guildTypeData, setGuildTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "ثابت" },
        { value: 2, label: "سیار" },
      ],
    },
  ]);

  const [jobData, setJobData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();
  const { data, isFetching, isSuccess } = useGetAllprovinces();
  const getAllcounty = useGetAllCountyByProvinceId();
  const getAllcity = useGetAllCitiesWithPartByCountyId();
  const getAllvillage = useGetAllVillagesWithPartByCountyId();
  const LocationInfo: any = useGetLocationInformation();

  const getJobUseTypes = usePostGetAllJobByCountyAndUseType();
  const sendToMatching = useCompleteRequiredDocumentAndSendToMathing();
  const setLicenseRequestMutation = usePostSetLicensRequest();

  const [initialValues, setInitialValues] = useState<any>({
    province: null,
    township: null,
    city: null,
    village: null,
    useType: null,
    job: null,
    guildType: null,
    typeOneBiggestArea: 0,
    typeOneSumOfArea: 0,
    typeOneCount: 0,
    guildBiggestArea: 0,
    guildSumOfArea: 0,
    guildFacilitiesArea: 0,
  });

  useEffect(() => {
    if (licenseDetail) {
      LocationInfo.mutate(licenseDetail.cityOrVillageId, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          setInitialValues((old: any) => ({
            ...old,
            province: { value: result.provinceId, label: result.province },
            township: { value: result.countyId, label: result.county },
          }));
          if (result.locationType === 2) {
            setInitialValues((old: any) => ({
              ...old,
              city: { value: result.cityOrVillageId, label: result.city },
            }));
          } else {
            setInitialValues((old: any) => ({
              ...old,
              village: { value: result.cityOrVillageId, label: result.village },
            }));
          }
        },
      });
    }
  }, []);

  useEffect(() => {
    if (licenseDetail) {
      setInitialValues((old: any) => ({
        ...old,
        job: {
          value: licenseDetail.unionUseTypeJobId,
          label: licenseDetail.unionUseTypeJobTitle,
          fixedOrMobileEnum: licenseDetail.unionUseTypeJobFixedOrMobileEnums,
        },
        guildType: {
          value: licenseDetail.fixedOrMobieType,
          label: licenseDetail.fixedOrMobieTypeTitle,
        },
        typeOneCount: licenseDetail.countOFAreas,
        guildFacilitiesArea: licenseDetail.facilitisArea,
        finalAllArea: licenseDetail.allArea,
        finalArea: licenseDetail.area,
        typeOneSumOfArea: licenseDetail.allArea,
        guildSumOfArea: licenseDetail.allArea,
        typeOneBiggestArea: licenseDetail.area,
        guildBiggestArea: licenseDetail.area,
        useType: {
          value: licenseDetail.useTypeId,
          label: licenseDetail.useTypeTitle,
          useTypeEnum: licenseDetail.useTypeType,
        },
      }));
    }
  }, [licenseDetail]);

  useEffect(() => {
    if (useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

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
  }, [useTypesIsSuccess]);

  useEffect(() => {
    if (data && data.data) {
      const result = data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((province: any) => {
        pro[0].options.push({ value: province.id, label: province.title });
      });
      setProvince(pro);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (getAllcity.data && getAllcity.data.data) {
      const result = getAllcity.data.data.result;

      let allCity: any = [];

      result.forEach((county: any) => {
        county.citis.forEach((eachCity: any) => {
          delete Object.assign(eachCity, { value: eachCity["id"] })["id"];
          delete Object.assign(eachCity, { label: eachCity["title"] })["title"];
        });

        allCity.push({
          label: county.partTitle,
          options: county.citis,
        });
      });
      setCity(allCity);
    }
  }, [getAllcity.isSuccess]);

  useEffect(() => {
    if (getAllcounty.data && getAllcounty.data.data) {
      const result = getAllcounty.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setTownship(pro);
    }
  }, [getAllcounty.isSuccess]);

  useEffect(() => {
    if (getAllvillage.data && getAllvillage.data.data) {
      const result = getAllvillage.data.data.result;

      let allVillage: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((village: any) => {
        village.villages.forEach((eachVillage: any) => {
          delete Object.assign(eachVillage, { value: eachVillage["id"] })["id"];
          delete Object.assign(eachVillage, { label: eachVillage["title"] })[
            "title"
          ];
        });

        allVillage.push({
          label: village.partTitle,
          options: village.villages,
        });
      });
      setVillage(allVillage);
    }
  }, [getAllvillage.isSuccess]);

  const history = useHistory();

  const provinceOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcounty.mutate(opt.value);
    setFieldValue("province", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("township", null);
    setFieldValue("city", null);
    setFieldValue("village", null);
    setTownship([]);
    setCity([]);
    setVillage([]);
  };

  const townshipOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcity.mutate(opt.value);
    getAllvillage.mutate(opt.value);
    setFieldValue("township", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", null);
    setFieldValue("village", null);
    setCity([]);
    setVillage([]);
  };

  const cityOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("city", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("village", { value: 0, label: "شهر انتخاب شده است..." });
  };

  const villageOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("village", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", { value: 0, label: "روستا انتخاب شده است..." });
  };

  const { req_id } = useGlobalState();
  const getMyLicenseReq = useGetMyLicenseRequest();

  const onSubmit = async (values: any) => {
    let finalArea =
      values.useType.useTypeEnum === 1 || values.useType.useTypeEnum === 2
        ? values.typeOneBiggestArea
        : values.guildBiggestArea;
    let finalAllArea =
      values.useType.useTypeEnum === 1 || values.useType.useTypeEnum === 2
        ? values.typeOneSumOfArea
        : values.guildSumOfArea;
    let finalCountOfArea =
      values.useType.useTypeEnum === 1 || values.useType.useTypeEnum === 2
        ? values.typeOneCount
        : 2;
    let finalFacilitiesArea =
      values.useType.useTypeEnum === 1 || values.useType.useTypeEnum === 2
        ? 0
        : values.guildFacilitiesArea;

    let setLicenseObj: any = {
      unionUseTypeJobId: values.job.value,
      area: finalArea,
      allArea: finalAllArea,
      facilitisArea: finalFacilitiesArea,
      countOFAreas: finalCountOfArea,
      fixedOrMobieType: values.guildType.value,
      cityOrVillageId:
        values.city && values.city.value !== 0
          ? values.city.value
          : values.village.value,
    };

    if (inEditMode) {
      setLicenseObj = { ...setLicenseObj, id: id };
    }

    setLicenseRequestMutation.mutate(setLicenseObj, {
      onSuccess: (val) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        const licenseRequestId = val.data.result.licenseRequestId;
        if (inEditMode) {
          if (req_id[0] !== "0") {
            getMyLicenseReq.mutate(+req_id[0], {
              onSuccess: (value: any) => {
                setLicenseDetail(value.data.result);

                history.push(
                  `/License/Issued/${value.data.result.licenseRequestDetails.status}/documents/${licenseRequestId}`,
                  {
                    detail: val.data.result.items,
                  }
                );
              },
            });
          }
        } else {
          history.push(`/License/Issued/1/documents/${licenseRequestId}`, {
            detail: val.data.result.items,
          });
        }
      },
    });
  };

  const downloadLicenseMutation = useDownloadLicenseByUserApplicant();
  const downloadIdMutation = useDownloadCertificateByUserApplicant();

  const downloadLicense = () => {
    downloadLicenseMutation.mutate(+id);
  };

  const downloadId = () => {
    downloadIdMutation.mutate(+id);
  };

  const isFinished = licenseDetail
    ? licenseDetail.status !==
        LicenseRequestStatusEnum.LicenseRequestAndWaitingForPayment &&
      licenseDetail.status !== LicenseRequestStatusEnum.ChoosingExpert &&
      licenseDetail.status !== LicenseRequestStatusEnum.ChoosingExpertAgain
    : false;

  return (
    <>
      <Card>
        <CardHeader>
          {!inEditMode && <CardTitle>درخواست جدید</CardTitle>}
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={NewLicenseValidate}
            enableReinitialize={true}
            onSubmit={(value) => onSubmit(value)}
          >
            {({
              values,
              errors,
              setFieldValue,
              setFieldError,
              setErrors,
              resetForm,
            }) => {
              return (
                <Form noValidate>
                  <TwoColumn>
                    <div>
                      <BasicSelectOption
                        isDisabled={isFinished}
                        lableText="نوع کاربری"
                        significant={true}
                        isLoading={useTypesIsFetching}
                        placeHolder="انتخاب کنید..."
                        name="useType"
                        data={useTypeData}
                        onChange={(opt: any, e: any) => {
                          resetForm();
                          setFieldValue("useType", {
                            value: opt.value,
                            label: opt.label,
                            useTypeEnum: opt.useTypeEnum,
                          });
                        }}
                      />

                      <BasicSelectOption
                        isDisabled={isFinished}
                        lableText="استان محل فعالیت"
                        significant={true}
                        name="province"
                        placeHolder="انتخاب کنید..."
                        data={province}
                        isLoading={isFetching}
                        onChange={(opt: any, e: any) =>
                          provinceOnChange(opt, e, setFieldValue)
                        }
                      />

                      <BasicSelectOption
                        isDisabled={isFinished}
                        lableText="شهرستان محل فعالیت"
                        significant={true}
                        name="township"
                        placeHolder="انتخاب کنید..."
                        data={township}
                        isLoading={getAllcounty.isLoading}
                        onChange={(opt: any, e: any) => {
                          townshipOnChange(opt, e, setFieldValue);
                          setFieldValue("job", null);
                          if (opt && values.useType) {
                            getJobUseTypes.mutate(
                              {
                                countyId: opt.value,
                                useTypeId: values.useType.value,
                              },
                              {
                                onSuccess: (val: any) => {
                                  console.log("---log---", val);

                                  const result = val.data.result;

                                  let pro: any = [
                                    {
                                      label: "انتخاب کنید...",
                                      options: [],
                                    },
                                  ];
                                  result.forEach((row: any) => {
                                    pro[0].options.push({
                                      value: row.unionUseTypeJobId,
                                      label: row.jobTitle,
                                      fixedOrMobileEnum: row.fixedOrMobileEnum,
                                    });
                                  });
                                  setJobData(pro);
                                },
                              }
                            );
                          }
                        }}
                      />

                      <BasicSelectOption
                        isDisabled={isFinished}
                        lableText="شهر محل فعالیت"
                        significant={true}
                        name="city"
                        placeHolder="انتخاب کنید..."
                        data={city}
                        isLoading={getAllcity.isLoading}
                        onChange={(opt: any, e: any) =>
                          cityOnChange(opt, e, setFieldValue)
                        }
                      />

                      <BasicSelectOption
                        isDisabled={isFinished}
                        lableText="روستاي محل فعالیت"
                        significant={true}
                        placeHolder="انتخاب کنید..."
                        name="village"
                        data={village}
                        isLoading={getAllvillage.isLoading}
                        onChange={(opt: any, e: any) =>
                          villageOnChange(opt, e, setFieldValue)
                        }
                      />

                      <BasicSelectOption
                        isDisabled={isFinished}
                        lableText="شغل"
                        isLoading={getJobUseTypes.isLoading}
                        significant={true}
                        placeHolder="انتخاب کنید..."
                        name="job"
                        data={jobData}
                        onChange={(opt: any, e: any) => {
                          setFieldValue("job", opt);
                          setFieldValue("guildType", null);
                          if (
                            !(
                              opt.fixedOrMobileEnum.includes(1) &&
                              opt.fixedOrMobileEnum.includes(2)
                            )
                          ) {
                            setFieldValue(
                              "guildType",
                              opt.fixedOrMobileEnum.includes(1)
                                ? { value: 1, label: "ثابت" }
                                : { value: 2, label: "سیار" }
                            );
                          }
                        }}
                      />

                      <BasicSelectOption
                        isDisabled={
                          isFinished ||
                          (values.job &&
                            values.job.fixedOrMobileEnum &&
                            !(
                              values.job.fixedOrMobileEnum.includes(1) &&
                              values.job.fixedOrMobileEnum.includes(2)
                            ))
                        }
                        lableText="نوع واحد صنفی"
                        significant={true}
                        placeHolder="انتخاب کنید..."
                        name="guildType"
                        data={guildTypeData}
                      />
                    </div>

                    <div>
                      {values.guildType &&
                      values.guildType.value === 1 &&
                      values.useType ? (
                        values.useType.useTypeEnum === 1 ||
                        values.useType.useTypeEnum === 2 ? (
                          <>
                            <TextInput
                              disabled={isFinished}
                              lableText="مساحت بزرگترین قطعه (متر مربع)"
                              name="typeOneBiggestArea"
                              placeholder="مساحت بزرگترین قطعه (متر مربع)"
                              significant
                            />

                            <TextInput
                              disabled={isFinished}
                              lableText="مجموع مساحت قطعات (متر مربع)"
                              name="typeOneSumOfArea"
                              placeholder="0"
                              significant
                            />

                            <TextInput
                              disabled={isFinished}
                              lableText="تعداد قطعات"
                              name="typeOneCount"
                              placeholder="0"
                              significant
                            />
                          </>
                        ) : (
                          <>
                            <TextInput
                              disabled={isFinished}
                              lableText="مساحت واحد صنفی"
                              name="guildBiggestArea"
                              placeholder="مساحت بزرگترین قطعه (متر مربع)"
                              significant
                            />

                            <TextInput
                              disabled={isFinished}
                              lableText="مساحت تاسیسات واحد صنفی"
                              name="guildFacilitiesArea"
                              placeholder="0"
                              significant
                            />

                            <TextInput
                              disabled={isFinished}
                              lableText="مساحت کل واحد صنفی"
                              name="guildSumOfArea"
                              placeholder="0"
                              significant
                            />
                          </>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </TwoColumn>

                  {inEditMode && (
                    <>
                      <Row style={{ marginTop: "15px" }}>
                        <Col>
                          <StatusWrapper
                            curStatus={[
                              licenseDetail ? licenseDetail.status : 0,
                            ]}
                            guildStatus={[
                              LicenseRequestStatusEnum.WaitingForUploadDocumentsByApplicant,
                            ]}
                          >
                            <SubmitButton
                              type="button"
                              isLoading={false}
                              btnText="تکمیل اسناد مورد نیاز"
                              clearable
                              clearableTxt="ارسال به مسئول صدور"
                              isClearableLoading={sendToMatching.isLoading}
                              clearableDisable={sendToMatching.isLoading}
                              onClear={() =>
                                sendToMatching.mutate(+req_id[0], {
                                  onSuccess: () => {
                                    showToast(
                                      ["با موفقیت انجام شد"],
                                      ToastTypes.success
                                    );
                                    history.push("/License/List");
                                  },
                                })
                              }
                              onClick={() =>
                                history.push("/PersonalInfo/PersonalDocuments")
                              }
                            />
                          </StatusWrapper>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "15px" }}>
                        <Col>
                          <StatusWrapper
                            curStatus={[
                              licenseDetail ? licenseDetail.status : 0,
                            ]}
                            guildStatus={[
                              LicenseRequestStatusEnum.GuildIdHasSet,
                            ]}
                          >
                            <div
                              className="d-flex justify-content-between"
                              style={{ width: "27%" }}
                            >
                              <SimpleSubmitButton
                                type="button"
                                isLoading={
                                  downloadLicenseMutation.isLoading ||
                                  downloadLicenseMutation.isLoading
                                }
                                btnText="دانلود پروانه"
                                onCLick={downloadLicense}
                              />

                              <SimpleSubmitButton
                                type="button"
                                isLoading={downloadIdMutation.isLoading}
                                btnText="دانلود شناسنامه"
                                onCLick={downloadId}
                              />
                            </div>
                          </StatusWrapper>
                        </Col>
                      </Row>
                    </>
                  )}

                  {!inEditMode && (
                    <SubmitButton
                      isLoading={setLicenseRequestMutation.isLoading}
                      schema={NewLicenseValidate}
                      values={values}
                      initialValue={initialValues}
                    />
                  )}
                  {inEditMode && licenseDetail && (
                    <StatusWrapper
                      curStatus={[licenseDetail ? licenseDetail.status : 0]}
                      guildStatus={[
                        LicenseRequestStatusEnum.LicenseRequestAndWaitingForPayment,
                        LicenseRequestStatusEnum.ChoosingExpert,
                        LicenseRequestStatusEnum.ChoosingExpertAgain,
                      ]}
                    >
                      <SubmitButton
                        isLoading={setLicenseRequestMutation.isLoading}
                        schema={NewLicenseValidate}
                        values={values}
                        initialValue={initialValues}
                      />
                    </StatusWrapper>
                  )}
                </Form>
              );
            }}
          </Formik>
          {sections &&
            licenseDetail &&
            licenseDetail.status === LicenseRequestStatusEnum.GuildIdHasSet && (
              <PrintLicense sections={sections} id={req_id[0]} />
            )}
        </CardBody>
      </Card>
    </>
  );
};

export { New };
