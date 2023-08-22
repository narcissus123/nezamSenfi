import React, { useContext } from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { AddMotorPowerValide } from "../../../../../../core/validations/admin-motor-power.validation";
import { Toggle } from "../../../../../common/Form";
import { useCreateEnginePower } from "../../../../../../core/services/api/parts-and-facilities.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { ToastTypes } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";

const initialValue = {
  name: "",
  code: "",
  order: "",
  status : false
};


const AddMotorPower: React.FC = () => {

  const createMutation = useCreateEnginePower()

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = (value : any) => {

    const motorEngineObj = {
      name: value.name,
      code: value.code,
      status: value.status ? 1 : 0,
      viewOrder: value.order
    }

    createMutation.mutate(motorEngineObj , {
      onSuccess : (val : any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.engineMotorList = !newEvent.engineMotorList;
        setRefetchEvent(newEvent);
      }
    })

  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={AddMotorPowerValide}
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
                     <Toggle
                      id="status"
                      name="status"
                      lableText="وضعیت"
                      significant
                      direction="ltr"
                      className="my-1"
                      onChange={(opt: any) => {
                        setFieldValue("status", opt.target.checked);
                      }}
                    />
                   
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={createMutation.isLoading}
                  initialValue={initialValue}
                  schema={AddMotorPowerValide}
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

export { AddMotorPower };
