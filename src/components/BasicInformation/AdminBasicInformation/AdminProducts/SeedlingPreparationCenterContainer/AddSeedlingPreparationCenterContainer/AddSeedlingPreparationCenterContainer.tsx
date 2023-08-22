import { Form, Formik } from "formik";
import React, { useContext,} from "react";
import { ToastTypes } from "../../../../../../core/enums";
import { useCreateSeedlingPreparationCenter } from "../../../../../../core/services/api";

import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { AddMotorPowerValide } from "../../../../../../core/validations/admin-motor-power.validation";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { Toggle } from "../../../../../common/Form/Toggle/Toggle";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

const AddSeedlingPreparationCenterContainer: React.FC = () => {

  const initialValue = {
    name: "",
    code: "",
    order: "",
    status : false
  };

  const createMutation = useCreateSeedlingPreparationCenter()

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = (value : any) => {

    const motorEngineObj = {
      name: value.name,
      code: value.code,
      status: value.status ? 1 : 2,
      viewOrder: value.order
    }

    createMutation.mutate(motorEngineObj , {
      onSuccess : (val : any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.seedlingPreparationCenter = !newEvent.seedlingPreparationCenter;
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
                      lableText="نام نهال / بذر"
                      name="name"
                      placeholder="نام نهال / بذر ..."
                      significant
                    />
                    <TextInput
                      lableText="کد نهال / بذر"
                      name="code"
                      placeholder="کد ..."
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

export { AddSeedlingPreparationCenterContainer };
