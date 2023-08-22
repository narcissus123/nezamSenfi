import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";

import { addProductionFactorValidation } from "../../../../../../core/validations/production-factor.validation";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { useAllUseTypes, useGetAllFacilityBuildings, useGetAllMachineByTypes, useGetAllMachineTypes, useGetSelcetOptionOfEnum } from "../../../../../../core/services/api";
import {
  useCreateJobProductionFactor,
  useEditJobProductionFactor,
  useGetAllActivityMeasurementUnit,
  useGetAllJobByUseTypeForDropDown,
  useGetAllProductCategory,
  useGetJobProductionFactorDetailsById,
} from "../../../../../../core/services/api/job.api";
import { TypeOfDependenceEnum } from "../../../../../../core/enums/type-of-dependence.enums";
import { ToastTypes } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import {
  FullOptionSel,
  OptionRow,
} from "../../../../../../core/models";
import { FormDivider, SimpleSubmitButton } from "../../../../../common/Form";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { NewProduct } from "./NewProduct/NewProduct";
import { ProductionStablishmentEnum, ProductionStablishmentPersianEnum } from "../../../../../../core/enums/production-establishment.enum";
import { useHistory, useParams } from "react-router-dom";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

const EditProductionFactor: React.FC = () => {
  const [initialValue, setInitialValue] = useState<any>({
    name: "",
    code: "",
    describe: "",
    useTypeId: null,
    products: [],
    job: null,
    unit: null,
    establishmentOfProduction: "",
  });


  const { id } = useParams<any>();
  const { data, isFetching, isSuccess } = useGetJobProductionFactorDetailsById(
    +id
  );

  useEffect(()=>{
    if(data && data.data && data.data.result) {
      let result = data.data.result

      let products: any = [];
      if(result.productCategories) {
        result.productCategories.forEach((row:any ) => {
          products.push({
            productCategory: {
              value: row.productCategoryId,
              label: row.productCategoryTitle,
            },
            productIds: {
              value: row.id,
              label: row.title,
            },
            maxProduction: row.maximumCapacity,
          });
        })
        
      }
      setInitialValue({
        name: result.title,
        code: result.code,
        describe: result.description,
        useTypeId: { value: result.useTypeId, label: result.useTypeTitle },
        products: products,
        job: { value: result.jobId, label: result.jobTitle },
        unit: {
          value: result.activityMeasurementUnitId,
          label: result.activityMeasurementUnitTtile,
        },
        establishmentOfProduction: result.productionEstablishment,
      });
    }
  },[isSuccess])

  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [jobsData, setJobsData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);



  const [establishmentOfProductionData] =
    useState<any>([
      {
        label: "انتخاب کنید...",
        options: [
          {
            value: ProductionStablishmentEnum.Daily,
            label: ProductionStablishmentPersianEnum.Daily,
          },
          {
            value: ProductionStablishmentEnum.Weekly,
            label: ProductionStablishmentPersianEnum.Weekly,
          },
          {
            value: ProductionStablishmentEnum.TwoWeek,
            label: ProductionStablishmentPersianEnum.TwoWeek,
          },
          {
            value: ProductionStablishmentEnum.Monthly,
            label: ProductionStablishmentPersianEnum.Monthly,
          },
          {
            value: ProductionStablishmentEnum.FortyFiveDays,
            label: ProductionStablishmentPersianEnum.FortyFiveDays,
          },
          {
            value: ProductionStablishmentEnum.SeventyFiveDays,
            label: ProductionStablishmentPersianEnum.SeventyFiveDays,
          },
          {
            value: ProductionStablishmentEnum.ThreeMonth,
            label: ProductionStablishmentPersianEnum.ThreeMonth,
          },
          {
            value: ProductionStablishmentEnum.Seasonal,
            label: ProductionStablishmentPersianEnum.Seasonal,
          },
          {
            value: ProductionStablishmentEnum.FourMonth,
            label: ProductionStablishmentPersianEnum.FourMonth,
          },
          {
            value: ProductionStablishmentEnum.FiveMonth,
            label: ProductionStablishmentPersianEnum.FiveMonth,
          },
          {
            value: ProductionStablishmentEnum.SixMonth,
            label: ProductionStablishmentPersianEnum.SixMonth,
          },
          {
            value: ProductionStablishmentEnum.EightMonth,
            label: ProductionStablishmentPersianEnum.EightMonth,
          },
          {
            value: ProductionStablishmentEnum.NineMonth,
            label: ProductionStablishmentPersianEnum.NineMonth,
          },
          {
            value: ProductionStablishmentEnum.TenMonth,
            label: ProductionStablishmentPersianEnum.TenMonth,
          },
          {
            value: ProductionStablishmentEnum.ElevenMonth,
            label: ProductionStablishmentPersianEnum.ElevenMonth,
          },
          {
            value: ProductionStablishmentEnum.OneYear,
            label: ProductionStablishmentPersianEnum.OneYear,
          },
        ],
      },
    ]);

  const [machineryData, setMachineryData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [productionUnitData, setProductionUnitData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const getTreeTypeMutation = useGetSelcetOptionOfEnum();
  const history = useHistory();
  
  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();

  const {
    data: getAllMachinTypes,
    isSuccess: isGetAllMachinTypsSuccess,
    isLoading: isGetAllMachinTypesLoading,
    isFetching: isGetAllMachinTypesFetching,
  } = useGetAllMachineTypes();


  const getMachineMutation = useGetAllMachineByTypes();
  const getProductCategory = useGetAllProductCategory();
  
  const {
    data: AllActivityMeasurementUnitData,
    isFetching: AllActivityMeasurementUnitIsFetching,
    isSuccess: AllActivityMeasurementUnitIsSuccess,
  } = useGetAllActivityMeasurementUnit();
  const getJobsMutation = useGetAllJobByUseTypeForDropDown();


  const getAllUnit = useGetAllActivityMeasurementUnit();

  const createMutation = useEditJobProductionFactor();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);



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



  const onSubmit = (values: any) => {
    if (values.products && values.products.length < 1) {
      return showToast(["لیست محصولات را وارد کنید!"], ToastTypes.error);
    }

    let productionFactorProductItems: any = [];
    if (values.products) {
      values.products.forEach((row: any) => {
        productionFactorProductItems.push({
          productId: row.productIds.value,
          maximumCapacity: row.maxProduction,
        });
      });
    }

    const jobProductionFactorData = {
      id: id,
      title: values.name,
      code: values.code,
      description: values.describe,
      jobId: values.job.value,
      productionFactorProductItems: productionFactorProductItems,
      productionEstablishment: +values.establishmentOfProduction,
      activityMeasurementUnitId: values.unit.value,
    };

    createMutation.mutate(jobProductionFactorData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        history.push("/BasicInformation/Products/ProductsFactor/");
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ویرایش عامل تولید</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={addProductionFactorValidation}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  {isFetching ? (
                    <FallBackSpinner />
                  ) : (
                    <>
                      <TwoColumn>
                        <div>
                          <TextInput
                            lableText="عنوان عامل تولید"
                            name="name"
                            placeholder="نام"
                            significant
                          />
                          <TextInput
                            lableText="کد عامل تولید"
                            name="code"
                            placeholder="کد"
                            significant
                          />
                          <BasicSelectOption
                            lableText="واحد سنجش عامل تولید"
                            significant={true}
                            placeHolder="انتخاب کنید..."
                            name="unit"
                            data={
                              getAllUnit.data?.data.result
                                ? getAllUnit.data?.data.result.map(
                                    (item: OptionRow) => ({
                                      value: item.id,
                                      label: item.title,
                                    })
                                  )
                                : []
                            }
                            isLoading={getAllUnit.isLoading}
                          />
                          <TextInput
                            lableText="استقرار تولید ( روز )"
                            name="establishmentOfProduction"
                            placeholder="عدد وارد کنید ..."
                            significant
                          />
                        </div>
                        <div>
                          <BasicSelectOption
                            data={useTypeData}
                            name="useTypeId"
                            lableText="نوع کاربری"
                            significant
                            isLoading={useTypesIsFetching}
                            placeHolder="بخش مورد نظر را انتخاب کنید"
                            onChange={(opt: any, e: any) => {
                              setFieldValue("useTypeId", {
                                value: opt.value,
                                label: opt.label,
                              });
                              setFieldValue("job", null);

                              if (opt) {
                                getJobsMutation.mutate(opt.value, {
                                  onSuccess: (val: any) => {
                                    console.log("-optioonsss- ,", val);
                                    let data = val.data.result;

                                    if (data) {
                                      let pro: any = [
                                        {
                                          label: "انتخاب کنید...",
                                          options: [],
                                        },
                                      ];
                                      data.forEach((job: any) => {
                                        pro[0].options.push({
                                          value: job.id,
                                          label: job.title,
                                        });
                                      });
                                      setJobsData(pro);
                                    }
                                  },
                                });
                              }
                            }}
                          />
                          <BasicSelectOption
                            lableText="َشغل"
                            significant={true}
                            placeHolder="انتخاب کنید..."
                            name="job"
                            data={jobsData}
                            isLoading={getJobsMutation.isLoading}
                          />
                        </div>
                      </TwoColumn>

                      <Row>
                        <Col>
                          <FormDivider textHeader="محصولات">
                            <CardBody>
                              <FieldArray
                                name="products"
                                render={(arrayHelpers) => (
                                  <div>
                                    {values.products &&
                                    values.products.length > 0 ? (
                                      values.products.map(
                                        (friend: any, index: any) => (
                                          <div key={index}>
                                            <Row>
                                              <Col md="12">
                                                <NewProduct
                                                  index={index}
                                                  setFieldValue={setFieldValue}
                                                  getProductCategory={
                                                    getProductCategory
                                                  }
                                                  values={values}
                                                />
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col md="3">
                                                <SimpleSubmitButton
                                                  isLoading={false}
                                                  type="button"
                                                  className="mb-1"
                                                  outLine
                                                  color="danger"
                                                  onCLick={() =>
                                                    arrayHelpers.remove(index)
                                                  }
                                                  btnText="حذف"
                                                />
                                              </Col>
                                            </Row>
                                            <hr />
                                          </div>
                                        )
                                      )
                                    ) : (
                                      <SimpleSubmitButton
                                        isLoading={false}
                                        type="button"
                                        className="mb-1"
                                        outLine
                                        onCLick={() =>
                                          arrayHelpers.push({
                                            productCategory: null,
                                            productIds: null,
                                            maxProduction: "",
                                          })
                                        }
                                        btnText="افزودن محصول جدید"
                                      />
                                    )}
                                    {arrayHelpers.form.values.products.length >
                                      0 && (
                                      <SimpleSubmitButton
                                        isLoading={false}
                                        type="button"
                                        className="mb-1"
                                        outLine
                                        onCLick={() =>
                                          arrayHelpers.insert(
                                            arrayHelpers.form.values.products
                                              .length,
                                            {
                                              productCategory: null,
                                              productIds: null,
                                              maxProduction: "",
                                            }
                                          )
                                        }
                                        btnText="افزودن محصول جدید"
                                      />
                                    )}
                                  </div>
                                )}
                              ></FieldArray>
                            </CardBody>
                          </FormDivider>
                        </Col>
                      </Row>
                      <SubmitButton
                        isLoading={createMutation.isLoading}
                        initialValue={initialValue}
                        values={values}
                        isDisabled={false}
                      />
                    </>
                  )}
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { EditProductionFactor };
