import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";

import { FormDivider, SimpleSubmitButton, SubmitButton, TextInput } from "../../../../../../../../common/Form";

import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { Row, Col, CardBody } from "reactstrap";
import { HasIndustriesValidate } from "../../../../../../../../../core/validations/has-industries.validations";
import { useSetConversionIndustriesConsumption } from "../../../../../../../../../core/services/api";
import { useParams } from "react-router-dom";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { showToast } from "../../../../../../../../../core/utils";

interface IPropTypes {
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const HasUsedIndustries: React.FC<IPropTypes> = ({
  parentData,
  id = 0,
  useGetMutation,
  isExpert,
}) => {


  const industryUsageTypeData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "فروش در مزرعه قبل از برداشت(تخمینی)" },
        { value: 2, label: "فروش در مزرعه قبل از برداشت(تناژ)" },
        { value: 3, label: "فروش در مزرعه پس از برداشت" },
        { value: 4, label: "حمل به انباری و فروش در انبار" },
        { value: 5, label: "حمل به انبار و فروش مستقیم به بازار" },
        { value: 6, label: "حمل به انبار صنایع و تبدیل بسته بندی و فروش" },
      ],
    },
  ];

  const [initialValues, setInitialValues] = useState<any>({
    industryUsageType: null,
    conversionIndustriesConsumptionSellers: [],
    conversionIndustriesConsumptionOwners: [],
  });

  const setMutation = useSetConversionIndustriesConsumption();
  const getConversionDetail = useGetMutation();

  const { section_id } = useParams<{ section_id: string }>();

  useEffect(() => {
    if (id && id !== 0) {
      getConversionDetail.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          let conversionIndustriesConsumptionSellers : any = []
          let conversionIndustriesConsumptionOwners : any = []

          if( result.conversionIndustriesConsumptionSellers) {
            result.conversionIndustriesConsumptionSellers.forEach((row: any) => {
              conversionIndustriesConsumptionSellers.push({
                firstName : row.firstName,
                lastName: row.lastName,
                nationalCode: row.nationalCode,
              })
            })
          }

          if( result.conversionIndustriesConsumptionOwners) {
            result.conversionIndustriesConsumptionOwners.forEach((row: any) => {
              conversionIndustriesConsumptionOwners.push({
                firstName: row.firstName,
                lastName: row.lastName,
                nationalCode: row.nationalCode,
                industryTitle: row.industryTitle,
              });
            });
          }

          setInitialValues({
            industryUsageType: {
              value: result.industryUsageType,
              label: result.industryUsageTitle,
            },
            conversionIndustriesConsumptionSellers:
              conversionIndustriesConsumptionSellers,
            conversionIndustriesConsumptionOwners:
              conversionIndustriesConsumptionOwners,
          });
        },
      });
    }
  }, [id]);

  const onSubmit = (values: any) => {
    console.log('values--',values);
    

    let conversionIndustriesConsumptionSellers: any = [];
    let conversionIndustriesConsumptionOwners: any = [];

    if(values.conversionIndustriesConsumptionSellers) {
      values.conversionIndustriesConsumptionSellers.forEach((row: any) => {
        conversionIndustriesConsumptionSellers.push({
          firstName: row.firstName,
          lastName: row.lastName,
          nationalCode: row.nationalCode,
        });
      });
    }


    if(values.conversionIndustriesConsumptionOwners) {
      values.conversionIndustriesConsumptionOwners.forEach((row: any) => {
        conversionIndustriesConsumptionOwners.push({
          firstName: row.firstName,
          lastName: row.lastName,
          nationalCode: row.nationalCode,
          industryTitle: row.industryTitle,
        });
      });
    }

    const setOjb = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      conversionIndustries: {
        productionFactorCosumptionId: +id,
        industryUsageType: values.industryUsageType.value,

        conversionIndustriesConsumptionSellers:
          conversionIndustriesConsumptionSellers,
        conversionIndustriesConsumptionOwners:
          conversionIndustriesConsumptionOwners,
      },
    };

    console.log("-- setobj ---", setOjb);

    setMutation.mutate(setOjb, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <FormDivider textHeader="صنایع تبدیلی و تکمیلی مورد استفاده">
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={HasIndustriesValidate}
          >
            {({ values }) => (
              <Form>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="نحوه فروش محصول"
                          name="industryUsageType"
                          data={industryUsageTypeData}
                          placeHolder="انتخاب کنید"
                          isDisabled={!isExpert}
                          significant
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {values.industryUsageType &&
                  (values.industryUsageType.value === 1 ||
                    values.industryUsageType.value === 2 ||
                    values.industryUsageType.value === 3 ||
                    values.industryUsageType.value === 4) && (
                    <FieldArray
                      name="conversionIndustriesConsumptionSellers"
                      render={(arrayHelpers) => (
                        <div>
                          {values.conversionIndustriesConsumptionSellers &&
                          values.conversionIndustriesConsumptionSellers.length >
                            0 ? (
                            values.conversionIndustriesConsumptionSellers.map(
                              (friend: any, index: any) => (
                                <div key={index}>
                                  <Row>
                                    <Col md="4">
                                      <TextInput
                                        lableText="نام"
                                        name={`conversionIndustriesConsumptionSellers.${index}.firstName`}
                                        placeholder="نام"
                                        significant
                                      />
                                    </Col>
                                    <Col md="4">
                                      <TextInput
                                        lableText="نام خانوادگی"
                                        name={`conversionIndustriesConsumptionSellers.${index}.lastName`}
                                        placeholder="نام خانوادگی"
                                        significant
                                      />
                                    </Col>
                                    <Col md="4">
                                      <TextInput
                                        lableText="کد ملی"
                                        name={`conversionIndustriesConsumptionSellers.${index}.nationalCode`}
                                        placeholder="کد ملی"
                                        significant
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="2">
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
                                  firstName: "",
                                  lastName: "",
                                  nationalCode: "",
                                })
                              }
                              btnText="افزودن خریدار جدید"
                            />
                          )}
                          {arrayHelpers.form.values
                            .conversionIndustriesConsumptionSellers.length >
                            0 && (
                            <SimpleSubmitButton
                              isLoading={false}
                              type="button"
                              className="mb-1"
                              outLine
                              onCLick={() =>
                                arrayHelpers.insert(
                                  arrayHelpers.form.values
                                    .conversionIndustriesConsumptionSellers
                                    .length,
                                  {
                                    firstName: "",
                                    lastName: "",
                                    nationalCode: "",
                                  }
                                )
                              }
                              btnText="افزودن خریدار جدید"
                            />
                          )}
                        </div>
                      )}
                    ></FieldArray>
                  )}

                {values.industryUsageType &&
                  values.industryUsageType.value === 6 && (
                    <FieldArray
                      name="conversionIndustriesConsumptionOwners"
                      render={(arrayHelpers) => (
                        <div>
                          {values.conversionIndustriesConsumptionOwners &&
                          values.conversionIndustriesConsumptionOwners.length >
                            0 ? (
                            values.conversionIndustriesConsumptionOwners.map(
                              (friend: any, index: any) => (
                                <div key={index}>
                                  <Row>
                                    <Col md="4">
                                      <TextInput
                                        lableText="نام صاحب صنایع"
                                        name={`conversionIndustriesConsumptionOwners.${index}.firstName`}
                                        placeholder="نام"
                                        significant
                                      />
                                    </Col>
                                    <Col md="4">
                                      <TextInput
                                        lableText="نام خانوادگی صاحب صنایع"
                                        name={`conversionIndustriesConsumptionOwners.${index}.lastName`}
                                        placeholder="نام خانوادگی"
                                        significant
                                      />
                                    </Col>
                                    <Col md="4">
                                      <TextInput
                                        lableText="کد ملی صاحب صنایع"
                                        name={`conversionIndustriesConsumptionOwners.${index}.nationalCode`}
                                        placeholder="کد ملی"
                                        significant
                                      />
                                    </Col>
                                    <Col md="4">
                                      <TextInput
                                        lableText="عنوان صنایع"
                                        name={`conversionIndustriesConsumptionOwners.${index}.industryTitle`}
                                        placeholder="عنوان صنایع"
                                        significant
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="2">
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
                                  firstName: "",
                                  lastName: "",
                                  nationalCode: "",
                                })
                              }
                              btnText="افزودن خریدار جدید"
                            />
                          )}
                          {arrayHelpers.form.values
                            .conversionIndustriesConsumptionOwners.length >
                            0 && (
                            <SimpleSubmitButton
                              isLoading={false}
                              type="button"
                              className="mb-1"
                              outLine
                              onCLick={() =>
                                arrayHelpers.insert(
                                  arrayHelpers.form.values
                                    .conversionIndustriesConsumptionOwners
                                    .length,
                                  {
                                    firstName: "",
                                    lastName: "",
                                    nationalCode: "",
                                    industryTitle: "",
                                  }
                                )
                              }
                              btnText="افزودن خریدار جدید"
                            />
                          )}
                        </div>
                      )}
                    ></FieldArray>
                  )}
                {isExpert && (
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={setMutation.isLoading}
                        type="submit"
                        btnText="ثبت"
                      />
                    </Col>
                  </Row>
                )}
              </Form>
            )}
          </Formik>
        </CardBody>
      </FormDivider>
    </>
  );
};

export { HasUsedIndustries };
