import { Formik, Form } from "formik";
import React, {  useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../core/enums";
import { useAddConsomptionCost } from "../../../core/services/api";
import { showToast } from "../../../core/utils";
import { refetchContext } from "../../../core/utils/context/EventContext";
import { AddCostManagementValidate } from "../../../core/validations/add-cost-management.validation";
import { AddJahadCenterValidate } from "../../../core/validations/add-jahad-center.validation";
import { SubmitButton, TextInput } from "../../common/Form";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

import { List } from "./List/List";




const CostManagementContainer = () => {


  const [initialValue , setInitialValue] = useState<any>({
    from1 : "",
    from2 : "",
    oprator  : null,
    type : null,
  })

  const [operatorData, setOperatorData] = useState<any>([
    {value : 1, label : "مساوی" },
    {value : 2, label : "بزرگتر" },
    {value : 3 , label : "کوچک تر" },
    {value : 4, label : "مابین" },
  ]);
  const [typeData, setTypeData] = useState<any>([
    {value : 1, label : "هزینه آب" },
    {value : 2, label : "هزینه برق سالیانه" },
    {value : 3, label : "هزینه گازشهری" },
    {value : 4, label : "هزینه کود" },
    {value : 5, label : "هزینه سم" },
    {value : 6, label : "هزینه تعمیرات" },
    {value : 7, label : "هزینه لاستیک" },
  ]);
  

  const addMutation = useAddConsomptionCost();


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  
  const onSubmit = (value:any) => {

    const addCostObj = {
      from1: value.from1,
      from2: value.oprator.value === 4 ? value.from2 : value.from1,
      type: value.type.value,
      oprator: value.oprator.value,
    };
    
    addMutation.mutate(addCostObj , {onSuccess : (val : any) => {
      showToast(["با موفقیت انجام شد."], ToastTypes.success);
      const newEvent = { ...refetchEvent };
      newEvent.costManagementList = !newEvent.costManagementList;
      setRefetchEvent(newEvent);
    }})
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>هزینه جدید</CardTitle>
        </CardHeader>
        <CardBody>


          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={AddCostManagementValidate}
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
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={false}
                        significant={true}
                        name="type"
                        placeHolder="انتخاب کنید ..."
                        data={typeData}
                        lableText="قسمت مورد استفاده"
                      />
                    </Col>
                    <Col sm="4">
                      {" "}
                      <BasicSelectOption
                        isLoading={false}
                        significant={true}
                        name="oprator"
                        placeHolder="انتخاب کنید ..."
                        data={operatorData}
                        lableText="حالات قیمت"
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        name="from1"
                        placeholder="عدد وارد کنید ..."
                        lableText={
                          values.oprator && values.oprator.value === 4
                            ? "قیمت - از (ریال)"
                            : "قیمت (ریال)"
                        }
                        significant
                      />
                    </Col>
                  </Row>
                  {values.oprator && values.oprator.value === 4 && (
                    <Row>
                      <Col sm="4">
                        <TextInput
                          name="from2"
                          placeholder="عدد وارد کنید ..."
                          lableText="قیمت - تا (ریال)"
                          significant
                        />
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={addMutation.isLoading}
                        values={values}
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
    
      <List /> 

   
    </>
  );
};

export { CostManagementContainer };
