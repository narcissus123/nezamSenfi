import { Formik, Form } from "formik";
import React, {  useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { FullOptionSel } from "../../../../core/models";
import { useGetPayableTypesThatShouldDefineMaximumValue, useSetMaximumPayableValue } from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { MaxPayableValueValidate } from "../../../../core/validations/payable-value-max.validation";
import { SubmitButton, TextInput } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ShowActiveTariff } from "../ShowActiveTariff/ShowActiveTariff";
import { List } from "./List/List";

const PayableValueContainer = () => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);
  const [tableData, setTableData] = useState<any>([]);
  const [activeTariffSuccess, setActiveTariffSuccess] =
    useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);

  const [initialValue, setInitialValue] = useState<any>({
    payableValueTypeEnum: null,
    value: "",
    tariffId: 0
  });
  const [payableTypesData, setPayableTypesData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const rolesData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ];
  const [activeTariff, setActiveTariff] = useState<number>(0);

  const addMutation = useSetMaximumPayableValue();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const { data, isLoading, isSuccess } =
    useGetPayableTypesThatShouldDefineMaximumValue();
  useEffect(() => {
    if (data && data.data) {
      try {
        let newOptions: any = [];
        let newPayableTypes = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        const result = data.data.result;
        result.forEach((row: any) => {
          newOptions.push({
            value: row.payableValueTypeEnum,
            label: row.title,
            valueType: row.valueType,
          });
        });

        newPayableTypes[0].options = newOptions;

        setPayableTypesData(newPayableTypes);
      } catch (er) {}
    }
  }, [isSuccess]);

  const onSubmit = (value: any) => {
    let data: {
      items: {
        payableValueTypeEnum: number;
        value: number;
      }[];
    } = { items: [] };


      data.items.push({
        payableValueTypeEnum: value.payableValueTypeEnum.value,
        value: value.value,
      });


    addMutation.mutate(data, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.payableValueList = !newEvent.payableValueList;
        setRefetchEvent(newEvent);
      },
    });
  }

    return (
      <>
       
            <Formik
              enableReinitialize={true}
              initialValues={initialValue}
              validationSchema={MaxPayableValueValidate}
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
                    <Card>
                      <CardHeader>
                        <CardTitle> سقف مبالغ </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col>
                            <ShowActiveTariff
                              setActiveTarrif={setActiveTariff}
                              setActiveTariffSuccess={setActiveTariffSuccess}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="4">
                            <BasicSelectOption
                              isLoading={isLoading}
                              significant={true}
                              name="payableValueTypeEnum"
                              placeHolder="انتخاب کنید ..."
                              data={payableTypesData}
                              lableText="نوع پرداختی"
                            />
                          </Col>
                          <Col sm="4">
                            <TextInput
                              lableText={
                                values.payableValueTypeEnum
                                  ? values.payableValueTypeEnum.valueType === 1
                                    ? "سقف مبلغ ( ریال )"
                                    : "سقف درصد"
                                  : "سقف مبلغ / درصد"
                              }
                              name="value"
                              placeholder={
                                values.payableValueTypeEnum
                                  ? values.payableValueTypeEnum.valueType === 1
                                    ? "سقف مبلغ ( ریال )"
                                    : "سقف درصد"
                                  : "سقف مبلغ / درصد"
                              }
                              significant
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="4">
                            <SubmitButton
                              isLoading={addMutation.isLoading}
                            ></SubmitButton>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Row style={{ marginTop: "25px" }}>
                      <Col>
                        <List
                          activeTariffSuccess={activeTariffSuccess}
                          activeTariff={activeTariff}
                          setCounter={setCounter}
                          tableData={tableData}
                          setTableData={setTableData}
                          setInitialValue={setInitialValue}
                          setIsInEditMode={setIsInEditMode}
                          setEditRowID={setEditRowID}
                          payableTypesData={payableTypesData}
                          isLoading={isLoading}
                        />
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
      </>
    );
  };


export { PayableValueContainer };
