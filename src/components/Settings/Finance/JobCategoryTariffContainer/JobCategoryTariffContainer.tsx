import { Formik, Form } from "formik";
import React, { useContext, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { useSetJobCategoryTariff } from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { JobCategoryTarrifValidate } from "../../../../core/validations/job-category-tarrif.validation";
import { FormDivider,SubmitButton, TextInput } from "../../../common/Form";
import { ShowActiveTariff } from "../ShowActiveTariff/ShowActiveTariff";
import { List } from "./List/List";

const JobCategoryTariffContainer = () => {
  const [ initialValue ] = useState<any>({});

  const [ activeTariff, setActiveTariff ] = useState<number>(0);
        const [activeTariffSuccess, setActiveTariffSuccess] =
          useState<boolean>(false);

        const addMutation = useSetJobCategoryTariff();

        const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

        const onSubmit = (value: any) => {
          let addTypeObj: any = {
            items: [],
          };

          let items: {
            jobCategory: number;
            fixedOrMobile: number;
            priceOne: number;
            priceTwo: number;
          }[] = [
            {
              jobCategory: 1,
              fixedOrMobile: 1,
              priceOne: value.priceOne1,
              priceTwo: 0,
            },
            {
              jobCategory: 2,
              fixedOrMobile: 1,
              priceOne: value.priceOne2,
              priceTwo: 0,
            },
            {
              jobCategory: 3,
              fixedOrMobile: 1,
              priceOne: value.priceOne3,
              priceTwo: 0,
            },
            {
              jobCategory: 4,
              fixedOrMobile: 1,
              priceOne: value.priceOne4,
              priceTwo: 0,
            },
            {
              jobCategory: 6,
              fixedOrMobile: 2,
              priceOne: value.priceOne5,
              priceTwo: 0,
            },
            {
              jobCategory: 6,
              fixedOrMobile: 1,
              priceOne: value.priceOne6,
              priceTwo: value.priceOne5,
            },
            {
              jobCategory: 7,
              fixedOrMobile: 2,
              priceOne: value.priceOne7,
              priceTwo: 0,
            },
            {
              jobCategory: 8,
              fixedOrMobile: 2,
              priceOne: value.priceOne8,
              priceTwo: value.priceTwo8,
            },
          ];

          addTypeObj.items = items;

          addMutation.mutate(addTypeObj, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت انجام شد."], ToastTypes.success);
              const newEvent = { ...refetchEvent };
              newEvent.jobCategoryTariffList = !newEvent.jobCategoryTariffList;
              setRefetchEvent(newEvent);
            },
          });
        };

        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle> تعرفه گروه شغلی </CardTitle>
              </CardHeader>
              <CardBody>
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValue}
                  validationSchema={JobCategoryTarrifValidate}
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
                        <Row>
                          <Col>
                            <ShowActiveTariff
                              setActiveTariffSuccess={setActiveTariffSuccess}
                              setActiveTarrif={setActiveTariff}
                            />
                          </Col>
                        </Row>

                        <FormDivider textHeader="گروه شغلی وابسته به ساختمان صنعتی">
                          <CardBody>
                            <Row>
                              <Col sm="6">
                                <TextInput
                                  lableText="مبلغ محاسبه به ازای مساحت ساختمان و تاسیسات صنعتی (ریال)"
                                  name="priceOne1"
                                  placeholder="وارد کنید ..."
                                  significant
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </FormDivider>

                        <FormDivider textHeader="گروه شغلی فعالیت های وابسته به ساختمان و کارگاهی">
                          <CardBody>
                            <Row>
                              <Col sm="6">
                                <TextInput
                                  lableText="مبلغ محاسبه به ازای مساحت ساختمان و تاسیسات سنتی (ریال)"
                                  name="priceOne2"
                                  placeholder="وارد کنید ..."
                                  significant
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </FormDivider>

                        <FormDivider textHeader="گروه شغلی وابسته به سازه های سبک گلخانه صنعتی">
                          <CardBody>
                            <Row>
                              <Col sm="6">
                                <TextInput
                                  lableText="مبلغ محاسبه به ازای مساحت ساختمان و تاسیسات و سازه سبک گلخانه ای صنعتی (ریال)"
                                  name="priceOne3"
                                  placeholder="وارد کنید ..."
                                  significant
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </FormDivider>

                        <FormDivider textHeader="گروه شغلی فعالیت های وابسته به سازه های سبک گلخانه سنتی">
                          <CardBody>
                            <Row>
                              <Col sm="6">
                                <TextInput
                                  lableText="مبلغ محاسبه به ازای مساحت ساختمان و تاسیسات و سازه سبک گلخانه ای سنتی (ریال)"
                                  name="priceOne4"
                                  placeholder="وارد کنید ..."
                                  significant
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </FormDivider>

                        <FormDivider textHeader="گروه شغلی فعالیت های وابسته به ماشین آلات و ادوات ">
                          <CardBody>
                            <Row>
                              <Col sm="6">
                                <FormDivider textHeader="سیار">
                                  <CardBody>
                                    <Row>
                                      <Col sm="12">
                                        <TextInput
                                          lableText="مبلغ به ازای تعداد ماشین آلات (ریال)"
                                          name="priceOne5"
                                          placeholder="وارد کنید ..."
                                          significant
                                        />
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </FormDivider>
                              </Col>
                              <Col sm="6">
                                <FormDivider textHeader="ثابت">
                                  <CardBody>
                                    <Row>
                                      <Col sm="12">
                                        <TextInput
                                          lableText="مبلغ به ازای مساحت ساختمان، تاسیسات (ریال)"
                                          name="priceOne6"
                                          placeholder="وارد کنید ..."
                                          significant
                                        />
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </FormDivider>
                              </Col>
                            </Row>
                          </CardBody>
                        </FormDivider>

                        <FormDivider textHeader="گروه شغلی فعالیت های تخصصی یا مهارتی فاقد وابستگی مشخص">
                          <CardBody>
                            <Row>
                              <Col sm="6">
                                <TextInput
                                  lableText="مبلغ ثابت سیار (ریال)"
                                  name="priceOne7"
                                  placeholder="وارد کنید ..."
                                  significant
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </FormDivider>

                        <FormDivider textHeader="گروه شغلی فعالیت های تولیدی مهاجر">
                          <CardBody>
                            <Row>
                              <Col sm="6">
                                <TextInput
                                  lableText="مبلغ ثابت (ریال)"
                                  name="priceTwo8"
                                  placeholder="وارد کنید ..."
                                  significant
                                />
                              </Col>
                              <Col sm="6">
                                <TextInput
                                  lableText="مبلغ ثابت به ازای هر واحد از میزان فعالیت (ریال)"
                                  name="priceOne8"
                                  placeholder="وارد کنید ..."
                                  significant
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </FormDivider>

                        <Row>
                          <Col sm="4">
                            <SubmitButton
                              isLoading={addMutation.isLoading}
                              values={values}
                              schema={JobCategoryTarrifValidate}
                              initialValue={initialValue}
                            />
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </CardBody>
            </Card>

            <List
              activeTariffSuccess={activeTariffSuccess}
              activeTariff={activeTariff}
            />
          </>
        );
};

export { JobCategoryTariffContainer };
