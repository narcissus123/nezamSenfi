import { Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "reactstrap";
import { addMachineTypeValidate } from "../../../../../../core/validations/admin-machinery-tools.validation";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

const AddJobFields: React.FC = () => {
  const initialValue = {};

  // const CreateInsurance = useCreateInsurance()
  // const {setListState,filterState,mutation,ListState,setfilterState} = useAdminInsuranceContext()

  // const onSubmit = (value:ICreateManufacturerType) => {
  //   CreateInsurance.mutate(value,{
  //     onSuccess:() => {
  //       mutation.mutate(filterState,{
  //         onSuccess:(value:any) => {
  //           setListState(value.listItem)
  //         }
  //       })
  //     }
  //   })
  // }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        onSubmit={(value) => alert(value)}
      >
        {({ values }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="6">
                    <BasicSelectOption
                      lableText="نام بخش "
                      significant={true}
                      name="productionType"
                      placeHolder="انتخاب کنید"
                      data={[]}
                    />
                    <BasicSelectOption
                      lableText="نام زیر بخش "
                      significant={true}
                      name="productionType"
                      placeHolder="انتخاب کنید"
                      data={[]}
                    />
                    <BasicSelectOption
                      lableText="نام رسته "
                      significant={true}
                      name="productionType"
                      placeHolder="انتخاب کنید"
                      data={[]}
                    />
                  </Col>
                  <Col md="6">
                    <TextInput
                      id="sectionCode"
                      significant={true}
                      lableText="نام زمینه فعالیت"
                      name="sectionCode"
                      placeholder="نام زمینه فعالیت"
                    />
                    <TextInput
                      id="sectionCode"
                      significant={true}
                      lableText="کد زمینه فعالیت"
                      name="sectionCode"
                      placeholder="کد زمینه فعالیت"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={false}
                      initialValue={initialValue}
                      schema={addMachineTypeValidate}
                      values={values}
                      isDisabled={false}
                    />
                  </Col>
                </Row>
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddJobFields };
