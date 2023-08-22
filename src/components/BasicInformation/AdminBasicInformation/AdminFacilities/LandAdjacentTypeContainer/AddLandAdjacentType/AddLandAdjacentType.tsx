import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { Col, Row } from "reactstrap";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TextArea } from "../../../../../common/Form/InputComponents/TextArea/TextArea";
import { AddLandAdjacentTypeValidation } from "../../../../../../core/validations/land-adjacent-type.validation";
import { useCreateSectionProximity } from "../../../../../../core/services/api/parts-and-facilities.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../../core/utils";
import { ToastTypes } from "../../../../../../core/enums";

const initialValue = {
  name: "",
  code: "",
  type: null,
  order: "",
  describe: "",
};

const AddLandAdjacentType: React.FC = () => {


  const createMutation = useCreateSectionProximity()

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = ( values : any ) => {
    
    const newSectionProximityObj = {
      name: values.name,
      code: values.code,
      description: values.describe,
      type: values.type.value,
      viewOrder: values.order
    }

    createMutation.mutate(newSectionProximityObj , {
      onSuccess : ( val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.sectionProximityList = !newEvent.sectionProximityList;
        setRefetchEvent(newEvent);
      }
    })

  }

  const typeData = [
    {value : 1 , label : 'عوارض طبیعی'},
    {value : 2 , label : 'عوارض'}
  ]

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={AddLandAdjacentTypeValidation}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      id="name"
                      lableText="نام"
                      name="name"
                      placeholder="نام"
                      significant={true}
                    />
                    <TextInput
                      id="code"
                      lableText="کد"
                      name="code"
                      placeholder="کد"
                      significant={true}
                    />
                    <BasicSelectOption
                      lableText="نوع"
                      significant={true}
                      name="type"
                      placeHolder="انتخاب کنید ..."
                      data={typeData}
                    />
                  </div>
                  <div>
                    <TextInput
                      id="order"
                      type="number"
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                    />
                    <TextArea
                      lableText="توضیحات"
                      name="describe"
                      placeholder="توضیحات"
                    />
                  </div>
                </TwoColumn>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={createMutation.isLoading}
                      initialValue={initialValue}
                      schema={AddLandAdjacentTypeValidation}
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

export { AddLandAdjacentType };
 
