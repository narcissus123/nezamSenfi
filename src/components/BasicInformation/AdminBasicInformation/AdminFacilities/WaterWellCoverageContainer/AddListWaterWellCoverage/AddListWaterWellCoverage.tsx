import React, { useContext } from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { TextArea } from "../../../../../common/Form/InputComponents/TextArea/TextArea";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { useCreateWaterWellWall } from "../../../../../../core/services/api/parts-and-facilities.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { ToastTypes } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";
import { AddWaterWellWalValidate } from "../../../../../../core/validations/admin-water-well-wall.validation";

const AddListWaterWellCoverage: React.FC = () => {
  const initialValue = {
    name: "",
    code: "",
    order: "",
    describe: "",
  };

  const createMutation = useCreateWaterWellWall();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
 
  const onSubmit = (value: any) => {

    const waterWellWallCreateObj = {
      name: value.name,
      code: value.code,
      description: value.describe,
      viewOrder: value.order,
    };

    createMutation.mutate(waterWellWallCreateObj,{
      onSuccess : (val : any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.waterWellList = !newEvent.waterWellList;
        setRefetchEvent(newEvent);
      }
    })
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={AddWaterWellWalValidate}
        onSubmit={onSubmit}
      >
        {({ values }) => {
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
                      name="describe"
                      placeholder="توضیحات"
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={createMutation.isLoading}
                  initialValue={initialValue}
                  schema={AddWaterWellWalValidate}
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

export { AddListWaterWellCoverage };
