import React, { useContext } from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { AddTypesOfStructureValide } from "../../../../../../core/validations/admin-type-of-structures.validation";
import { TextArea, Toggle } from "../../../../../common/Form";
import { useCreateEnginePower } from "../../../../../../core/services/api/parts-and-facilities.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { ToastTypes } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";

const initialValue = {
  name: "",
  code: "",
  order: "",
  description : false
};


const AddTypesOfStructures: React.FC = () => {

  const createMutation = useCreateEnginePower()

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = (value : any) => {

    const typeOfStructureObj = {
      name: value.name,
      code: value.code,
      description: value.description,
      viewOrder: value.order
    }

    // createMutation.mutate(motorEngineObj , {
    //   onSuccess : (val : any) => {
    //     showToast(["با موفقیت انجام شد."], ToastTypes.success);
    //     const newEvent = { ...refetchEvent };
    //     newEvent.engineMotorList = !newEvent.engineMotorList;
    //     setRefetchEvent(newEvent);
    //   }
    // })

  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={AddTypesOfStructureValide}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      lableText="نام "
                      name="name"
                      placeholder="نام"
                      significant
                    />
                    <TextInput
                      lableText="کد"
                      name="code"
                      placeholder="کد"
                      significant
                    />
                  </div>
                  <div>
                    <TextInput
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                      significant
                    />
                    <TextArea
                      lableText="توضیحات"
                      name="description"
                      placeholder="توضیحات"
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={createMutation.isLoading}
                  initialValue={initialValue}
                  schema={AddTypesOfStructureValide}
                  values={values}
                />
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddTypesOfStructures };
