import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../core/enums";
import {
  useGetLicenSeRequestRate,
  useSetLicenseRequestRate,
} from "../../../core/services/api";
import {
  RemoveCurrencyMask,
  showToast,
} from "../../../core/utils";
import { SetLicenseRequestTariffValidate } from "../../../core/validations/set-licenserequest-tariff.validations";
import {
  MoneyMask,
  SubmitButton,
} from "../../common/Form";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";


const SetLicenseRequestTariff: FC = () => {
  const [initialValue, setInitialValue] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    industrialBuildingsAndFacilitiesRate: "",
    traditionalBuildingsAndFacilitiesRate: "",
    traditionalGreenHouseRate: "",
    industrialGreenHouseRate: "",
    machinerayNumberRate: "",
  });


  const setTariff = useSetLicenseRequestRate();
  const getTariff = useGetLicenSeRequestRate();

  useEffect(() => {
    if (getTariff.data && getTariff.data.data) {
      try {
        const result = getTariff.data.data.result;
        if(result){
          setInitialValue(result)
        }
        
      } catch (error) {}
    }
  }, [getTariff.isSuccess]);

  const onSubmit = (values: any) => {
    const tariffObject = {
      a: RemoveCurrencyMask(values.a),
      b: RemoveCurrencyMask(values.b),
      c: RemoveCurrencyMask(values.c),
      d: RemoveCurrencyMask(values.d),
      e: RemoveCurrencyMask(values.e),
      f: RemoveCurrencyMask(values.f),
      industrialBuildingsAndFacilitiesRate: RemoveCurrencyMask(
        values.industrialBuildingsAndFacilitiesRate
      ),
      traditionalBuildingsAndFacilitiesRate: RemoveCurrencyMask(
        values.traditionalBuildingsAndFacilitiesRate
      ),
      traditionalGreenHouseRate: RemoveCurrencyMask(
        values.traditionalGreenHouseRate
      ),
      industrialGreenHouseRate: RemoveCurrencyMask(
        values.industrialGreenHouseRate
      ),
      machinerayNumberRate: RemoveCurrencyMask(values.machinerayNumberRate),
    };

    setTariff.mutate(tariffObject, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        getTariff.refetch();
        // setRefetch(!refetch);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> تعرفه درخواست پروانه </CardTitle>
        </CardHeader>
        <CardBody>
          {getTariff.isLoading ? (
            <FallBackSpinner />
          ) : (
            <>
              <Formik
                initialValues={initialValue}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={SetLicenseRequestTariffValidate}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form>
                    <Row>
                      <Col sm="6">
                        <Row>
                          <Col md="12">
                            <MoneyMask
                              lableText="مبلغ مبنای زیر  10 هکتار"
                              name="a"
                              errors={errors}
                              touched={touched}
                              value={values.a}
                              onChange={(val: string) =>
                                setFieldValue("a", val)
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText="مبلغ مبنای 10 هکتار تا 50 هکتار"
                              name="b"
                              errors={errors}
                              touched={touched}
                              value={values.b}
                              onChange={(val: string) =>
                                setFieldValue("b", val)
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText=" مبلغ مبنای 50هکتار تا 100 هکتار"
                              name="c"
                              errors={errors}
                              touched={touched}
                              value={values.c}
                              onChange={(val: string) =>
                                setFieldValue("c", val)
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText="مبلغ مبنای 100 هکتار تا 500 هکتار"
                              name="d"
                              errors={errors}
                              touched={touched}
                              value={values.d}
                              onChange={(val: string) =>
                                setFieldValue("d", val)
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText=" مبلغ مبنای 500 هکتار تا 1000 هکتار"
                              name="e"
                              errors={errors}
                              touched={touched}
                              value={values.e}
                              onChange={(val: string) =>
                                setFieldValue("e", val)
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText="مبلغ مبنای 1000 هکتار به بالا"
                              name="f"
                              errors={errors}
                              touched={touched}
                              value={values.f}
                              onChange={(val: string) =>
                                setFieldValue("f", val)
                              }
                              significant
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="6">
                        <Row>
                          <Col md="12">
                            <MoneyMask
                              lableText="تعرفه به ازای هر متر ساختمان وتاسیسات صنعتی"
                              name="industrialBuildingsAndFacilitiesRate"
                              errors={errors}
                              touched={touched}
                              value={
                                values.industrialBuildingsAndFacilitiesRate
                              }
                              onChange={(val: string) =>
                                setFieldValue(
                                  "industrialBuildingsAndFacilitiesRate",
                                  val
                                )
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText="تعرفه به ازای هر متر مساحت ساختمان وتاسیسات سنتی"
                              name="traditionalBuildingsAndFacilitiesRate"
                              errors={errors}
                              touched={touched}
                              value={
                                values.traditionalBuildingsAndFacilitiesRate
                              }
                              onChange={(val: string) =>
                                setFieldValue(
                                  "traditionalBuildingsAndFacilitiesRate",
                                  val
                                )
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText=" تعرفه به ازای هر متر مساحت  گلخانه سنتی"
                              name="traditionalGreenHouseRate"
                              errors={errors}
                              touched={touched}
                              value={values.traditionalGreenHouseRate}
                              onChange={(val: string) =>
                                setFieldValue("traditionalGreenHouseRate", val)
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText="تعرفه به ازای هر متر گلخانه صنعتی"
                              name="industrialGreenHouseRate"
                              errors={errors}
                              touched={touched}
                              value={values.industrialGreenHouseRate}
                              onChange={(val: string) =>
                                setFieldValue("industrialGreenHouseRate", val)
                              }
                              significant
                            />
                          </Col>
                          <Col md="12">
                            <MoneyMask
                              lableText="تعرفه به ازای هر ماشین "
                              name="machinerayNumberRate"
                              errors={errors}
                              touched={touched}
                              value={values.machinerayNumberRate}
                              onChange={(val: string) =>
                                setFieldValue("machinerayNumberRate", val)
                              }
                              significant
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <FormGroup>
                      <SubmitButton
                        btnText="ثبت"
                        isLoading={setTariff.isLoading}
                        initialValue={initialValue}
                        values={values}
                        schema={SetLicenseRequestTariffValidate}
                      />
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export { SetLicenseRequestTariff };
