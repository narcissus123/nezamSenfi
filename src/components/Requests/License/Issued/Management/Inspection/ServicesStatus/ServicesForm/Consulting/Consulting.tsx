import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  useAllUseTypes,
  useGetSelcetOptionOfEnum,
  usePostSetConsultingServicesOfLicenseRequestSection,
  useSetConsultingServicesOfLicenseRequest,
} from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { ExpertConsultingTabValidate } from "../../../../../../../../../core/validations/expert-consulting.validations";
import {
  FieldWrapper,
  MultiSelectOption,
  SubmitButton,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { List } from "./List/List";

interface IPropTypes {
  consultingServicesData: any;
  refetchConsultingServices: any;
  isExpert?: boolean;
  fixedOrMobieTypeByExpert?: number;
}

const Consulting: React.FC<IPropTypes> = ({
  consultingServicesData,
  refetchConsultingServices,
  isExpert,
  fixedOrMobieTypeByExpert,
}) => {
  const [counter, setCounter] = useState<number>(1);
  const [tableData, setTableData] = useState<any>([]);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);

  const serviceTypeMutation = useGetSelcetOptionOfEnum();
  const OwnToolsMutation = useGetSelcetOptionOfEnum();
  const SoftwareSkilsMutation = useGetSelcetOptionOfEnum();

  const setMutation = usePostSetConsultingServicesOfLicenseRequestSection();
  const setMobilityMutation = useSetConsultingServicesOfLicenseRequest();

  const [initialValue, setInitialValue] = useState<any>({
    gradeStatus: null,
    employmentLicenseStatus: null,
    consultingServiceType: null,
    useTypes: null,
    ownedTools: null,
    softwareKnowledge: null,
  });

  const gradeStatusData = [
    {
      label: " یک گزینه را انتخاب کنید",
      options: [
        {
          value: 1,
          label: "گرید 1",
        },
        {
          value: 2,
          label: "گرید 2",
        },
        {
          value: 3,
          label: "گرید 3",
        },
        {
          value: 4,
          label: "گرید A",
        },
        {
          value: 5,
          label: "گرید B",
        },
        {
          value: 6,
          label: "گرید C",
        },
        {
          value: 7,
          label: "فاقد رتبه",
        },
      ],
    },
  ];

  const employmentLicenseStatusData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای پروانه اشتغال معتبر" },
        { value: 2, label: "دارای پروانه اشتغال فاقد اعتبار" },
        { value: 3, label: "فاقد هرگونه پروانه اشتغال" },
      ],
    },
  ];

  useEffect(() => {
    let initialCounter = 1;
    if (consultingServicesData && consultingServicesData.data) {
      const result = consultingServicesData.data.result.consultingServices;

      

      if (result && result.length > 0) {
        result.forEach((row: any) => {

          let serviceTypeTitle = "";
          row.serviceType.forEach((row: any) => {
            serviceTypeTitle += row.serviceTypeTitle + ",";
          });
          let ownToolsTitle = "";

          row.ownTools.forEach((row: any) => {
            ownToolsTitle += row.ownToolsTitle + ",";
          });
          let softwareSkilsTitle = "";

          row.softwareSkils.forEach((row: any) => {
            softwareSkilsTitle += row.softwareSkilsTitle + ",";
          });
          let useTypeIdTitle = "";
          row.useTypeId.forEach((row: any) => {
            useTypeIdTitle += row.title + ",";
          });      

          const obj = {
            id: initialCounter,
            ratingStatusEnum: row.ratingStatusEnum,
            ratingStatusEnumTitle: row.ratingStatusEnumTitle,
            employmentLicenseStatusEnum: row.employmentLicenseStatusEnum,
            employmentLicenseStatusEnumTitle:
              row.employmentLicenseStatusEnumTitle,
            serviceType: row.serviceType,
            serviceTypeTitle:serviceTypeTitle,
            ownTools: row.ownTools,
            ownToolsTitle: ownToolsTitle,
            softwareSkils: row.softwareSkils,
            softwareSkilsTitle: softwareSkilsTitle,
            useTypeId: row.useTypeId,
            useTypeIdTitle: useTypeIdTitle,
          };

          setTableData((prev: any) => {
            return [...prev, obj];
          });

          initialCounter = initialCounter + 1;
        });

        setCounter((prev: number) => {
          return initialCounter;
        });
      }
    }
  }, [consultingServicesData]);

  const [consultingServiceTypeOptions, setConsultingServiceTypeOptions] =
    useState<any>([]);

  const { section_id, req_id } =
    useParams<{ section_id: string; req_id: string }>();

  const [
    consultingServiceBackgroundOptions,
    setConsultingServiceBackgroundOptions,
  ] = useState<any>([]);

  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();

  useEffect(() => {
    if (useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

      console.log("---usetypedata----", useTypesData);

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
        });
      });
      setConsultingServiceBackgroundOptions(pro);
    }
  }, [useTypesIsSuccess]);

  const [ownedToolsOptions, setOwnedToolsOptions] = useState<any>([]);

  const [softwareKnowledgeOptions, setSoftwareKnowledgeOptions] = useState<any>(
    []
  );

  useEffect(() => {
    serviceTypeMutation.mutate("ServiceTypeEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          setConsultingServiceTypeOptions(newOptions);
        }
      },
    });
  }, []);

  useEffect(() => {
    OwnToolsMutation.mutate("OwnToolsEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });

          setOwnedToolsOptions(newOptions);
        }
      },
    });
  }, []);

  useEffect(() => {
    SoftwareSkilsMutation.mutate("SoftwareSkilsEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });

          setSoftwareKnowledgeOptions(newOptions);
        }
      },
    });
  }, []);

  const onSubmit = (values: any) => {
    if (isInEditMode) {
      let ownTools: any = [];
      let softwareSkils: any = [];
      let useTypeId: any = [];
      let serviceType: any = [];

      let ownToolsTitle: any = "";
      let softwareSkilsTitle: any = "";
      let useTypeIdTitle: any = "";
      let serviceTypeTitle: any = "";

      values.softwareKnowledge.forEach((row: any) => {
        softwareSkils.push({ softwareSkils : row.value , softwareSkilsTitle : row.label });
        softwareSkilsTitle += `${row.label} ,`;
      });
      values.useTypes.forEach((row: any) => {
        useTypeId.push({id : row.value , title : row.label});
        useTypeIdTitle += `${row.label} ,`;
      });
      values.ownedTools.forEach((row: any) => {
        ownTools.push({ ownTools : row.value , ownToolsTitle : row.label });
        ownToolsTitle += `${row.label} ,`;
      });

      values.consultingServiceType.forEach((row: any) => {
        serviceType.push({ serviceType : row.value , serviceTypeTitle : row.label });
        serviceTypeTitle += `${row.label} ,`;
      });

      const consultingObj = {
        id: counter,
        ratingStatusEnum: values.gradeStatus.value,
        ratingStatusEnumTitle: values.gradeStatus.label,
        employmentLicenseStatusEnum: values.employmentLicenseStatus.value,
        employmentLicenseStatusEnumTitle: values.employmentLicenseStatus.label,
        serviceType: serviceType,
        serviceTypeTitle: serviceTypeTitle,
        ownTools: ownTools,
        ownToolsTitle: ownToolsTitle,
        softwareSkils: softwareSkils,
        softwareSkilsTitle: softwareSkilsTitle,
        useTypeId: useTypeId,
        useTypeIdTitle: useTypeIdTitle,
      };

      setTableData((prev: any) => {
        const lastState = [...prev];
        let findIDIndex = lastState.findIndex(
          (row: any) => row.id === editRowID
        );
        lastState[findIDIndex] = consultingObj;
        return lastState;
      });

      setIsInEditMode(false);
      setEditRowID(0);
    } else {
      let ownTools: any = [];
      let softwareSkils: any = [];
      let useTypeId: any = [];
      let serviceType: any = [];

      let ownToolsTitle: any = "";
      let softwareSkilsTitle: any = "";
      let useTypeIdTitle: any = "";
      let serviceTypeTitle: any = "";

      values.softwareKnowledge.forEach((row: any) => {
        softwareSkils.push({ softwareSkils : row.value , softwareSkilsTitle : row.label });
        softwareSkilsTitle += `${row.label} ,`;
      });
      values.useTypes.forEach((row: any) => {
        useTypeId.push({id : row.value , title : row.label});
        useTypeIdTitle += `${row.label} ,`;
      });
      values.ownedTools.forEach((row: any) => {
        ownTools.push({ ownTools : row.value , ownToolsTitle : row.label });
        ownToolsTitle += `${row.label} ,`;
      });

      values.consultingServiceType.forEach((row: any) => {
        serviceType.push({ serviceType : row.value , serviceTypeTitle : row.label });
        serviceTypeTitle += `${row.label} ,`;
      });

      const consultingObj = {
        id: counter,
        ratingStatusEnum: values.gradeStatus.value,
        ratingStatusEnumTitle: values.gradeStatus.label,
        employmentLicenseStatusEnum: values.employmentLicenseStatus.value,
        employmentLicenseStatusEnumTitle: values.employmentLicenseStatus.label,
        serviceType: serviceType,
        serviceTypeTitle: serviceTypeTitle,
        ownTools: ownTools,
        ownToolsTitle: ownToolsTitle,
        softwareSkils: softwareSkils,
        softwareSkilsTitle: softwareSkilsTitle,
        useTypeId: useTypeId,
        useTypeIdTitle: useTypeIdTitle,
      };

      setTableData((prev: any) => {
        return [...prev, consultingObj];
      });
      setCounter((prev: number) => {
        return prev + 1;
      });
    }
  };

  const onFinalSubmit = (values: any) => {

    let finalConsultingServices: any = [];

    tableData.forEach((row: any) => {
      let serviceType : number[] = [];
      row.serviceType.forEach((row:any)=>{
        serviceType.push(row.serviceType)
      })

      let ownTools : number[] = [];
      row.ownTools.forEach((row:any)=>{
        ownTools.push(row.ownTools)
      })

      let softwareSkils : number[] = [];
      row.softwareSkils.forEach((row:any)=>{
        softwareSkils.push(row.softwareSkils)
      })

      let useTypeId : number[] = [];
      row.useTypeId.forEach((row:any)=>{
        useTypeId.push(row.id)
      })

      finalConsultingServices.push({
        ratingStatusEnum: row.ratingStatusEnum,
        employmentLicenseStatusEnum: row.employmentLicenseStatusEnum,
        serviceType: serviceType,
        ownTools: ownTools,
        softwareSkils: softwareSkils,
        useTypeId: useTypeId,
      });
    });

    let finalObj: any = {
      licenseRequestSectionId: +section_id,
      consultingServices: finalConsultingServices,
      licenseRequestId: +req_id,
    };

    if (fixedOrMobieTypeByExpert === 1)
      setMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchConsultingServices();
        },
      });
    else if (fixedOrMobieTypeByExpert === 2)
      setMobilityMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchConsultingServices();
        },
      });
  };

  return (
    <>
      <Row>
        <Col>
          <Formik
            initialValues={initialValue}
            onSubmit={isExpert ? onSubmit : () => {}}
            enableReinitialize={true}
            validationSchema={ExpertConsultingTabValidate}
          >
            {({ values, setFieldError, setFieldValue }) => (
              <FieldWrapper
                setFieldError={setFieldError}
                useMutate={() => null}
              >
                <Form>
                  {" "}
                  <div style={{ margin: "30px 0px" }}>
                    <p style={{ fontWeight: "bolder" }}>
                      خدمات مشاوره، فنی مهندسی کشاورزی
                    </p>
                    <Row>
                      <Col sm="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت رتبه"
                              name="gradeStatus"
                              placeHolder="وضعیت رتبه"
                              data={gradeStatusData}
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت پروانه اشتغال"
                              name="employmentLicenseStatus"
                              data={employmentLicenseStatusData}
                              placeHolder="وضعیت پروانه اشتغال"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <MultiSelectOption
                              labelText="نوع خدمات قابل ارائه"
                              name="consultingServiceType"
                              placeHolder="انتخاب کنید..."
                              significant={true}
                              options={consultingServiceTypeOptions}
                              onChange={(e) =>
                                setFieldValue("consultingServiceType", e)
                              }
                              isLoading={serviceTypeMutation.isLoading}
                              hasLabel={true}
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="6">
                        <Row>
                          <Col>
                          <MultiSelectOption
                              labelText="زمینه ارائه خدمات"
                              name="useTypes"
                              placeHolder="انتخاب کنید..."
                              significant={true}
                              options={consultingServiceBackgroundOptions}
                              onChange={(e) =>
                                setFieldValue("useTypes", e)
                              }
                              isLoading={useTypesIsFetching}
                              hasLabel={true}
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <MultiSelectOption
                              labelText="ابزار های تحت اختیار"
                              name="ownedTools"
                              placeHolder="انتخاب کنید..."
                              significant={true}
                              options={ownedToolsOptions}
                              onChange={(e) => setFieldValue("ownedTools", e)}
                              hasLabel={true}
                              isDisabled={!isExpert}
                              isLoading={OwnToolsMutation.isLoading}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <MultiSelectOption
                              labelText="تسلط نرم افزاری"
                              name="softwareKnowledge"
                              placeHolder="انتخاب کنید..."
                              significant={true}
                              options={softwareKnowledgeOptions}
                              onChange={(e) =>
                                setFieldValue("softwareKnowledge", e)
                              }
                              hasLabel={true}
                              isDisabled={!isExpert}
                              isLoading={SoftwareSkilsMutation.isLoading}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {isExpert && (
                      <Row>
                        <Col>
                          <SubmitButton
                            btnText={
                              isInEditMode ? "ثبت ویرایش" : "ثبت موقت"
                            }
                            clearable={isInEditMode ? true : false}
                            clearableTxt="لغو ویرایش"
                            initialValue={initialValue}
                            schema={ExpertConsultingTabValidate}
                            values={values}
                            onClear={() => {
                              setIsInEditMode(false);
                              setEditRowID(0);
                              setInitialValue({
                                gradeStatus: null,
                                employmentLicenseStatus: null,
                                consultingServiceType: null,
                                useTypes: null,
                                ownedTools: null,
                                softwareKnowledge: null,
                              });
                            }}
                            isLoading={false}
                          ></SubmitButton>
                        </Col>
                      </Row>
                    )}
                  </div>
                </Form>

                <Row style={{ marginTop: "25px" }}>
                  <Col>
                    <List
                      tableData={tableData}
                      setTableData={setTableData}
                      setInitialValues={setInitialValue}
                      setIsInEditMode={setIsInEditMode}
                      setEditRowID={setEditRowID}
                      isExpert={isExpert}
                    />
                  </Col>
                </Row>
              </FieldWrapper>
            )}
          </Formik>
          {isExpert && (
            <Formik
              initialValues={tableData}
              onSubmit={onFinalSubmit}
              enableReinitialize={true}
            >
              {({ values, setFieldError, setFieldValue }) => (
                <FieldWrapper
                  setFieldError={setFieldError}
                  useMutate={() => null}
                >
                  <Form style={{ marginTop: "25px" }}>
                    <SubmitButton
                      btnText="ثبت نهایی"
                      isLoading={
                        setMutation.isLoading || setMobilityMutation.isLoading
                      } //finalSetMutation.isLoading}
                      initialValue={tableData}
                      values={values}
                    />
                  </Form>
                </FieldWrapper>
              )}
            </Formik>
          )}
        </Col>
      </Row>
    </>
  );
};

export { Consulting };
