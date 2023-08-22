import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { MultiSelectOption, TextArea, Toggle } from "../../../../../common/Form";
import { useCreateEngineType, useGetAllEnginePower } from "../../../../../../core/services/api/parts-and-facilities.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { ToastTypes } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";
import { AddMotorTypeValide } from "../../../../../../core/validations/admin-motor-type.validation";

const initialValue = {
  name: "",
  code: "",
  order: "",
  description : "",
  engineTypePowerIds : null
};


const AddMotorType: React.FC = () => {

  const [engineTypePowerIdsData , setEngineTypePowerIdsData] = useState<any>()
  const createMutation = useCreateEngineType()

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const {
    data: enginePowerData,
    isFetching: enginePowerIsFetching,
    isSuccess: enginePowerIsSuccess,
  } = useGetAllEnginePower();

  useEffect(() => {
    if (enginePowerData && enginePowerData.data) {
      const result = enginePowerData.data.result;
      let newOptions: any = [];
      result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.name });
      });
      setEngineTypePowerIdsData(newOptions);
    }
  }, [enginePowerIsSuccess]);

  const onSubmit = (value : any) => {

    let engineIds : any = []

    value.engineTypePowerIds.forEach((row:any) => {
      engineIds.push(row.value)
    })

    const motorEngineObj = {
      name: value.name,
      code: value.code,
      description: value.description,
      viewOrder: value.order,
      engineTypePowerIds: engineIds
    }

    createMutation.mutate(motorEngineObj , {
      onSuccess : (val : any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.engineTypeList = !newEvent.engineTypeList;
        setRefetchEvent(newEvent);
      }
    })

  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={AddMotorTypeValide}
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
                    <TextArea
                      lableText="توضیحات"
                      name="description"
                      placeholder="توضیحات"
                    />
                  </div>
                  <div>
                    <TextInput
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                      significant
                    />
                    <MultiSelectOption
                      labelText="قدرت موتور"
                      name="engineTypePowerIds"
                      placeHolder="انتخاب کنید..."
                      significant={true}
                      isLoading={enginePowerIsFetching}
                      options={engineTypePowerIdsData}
                      onChange={(e) => setFieldValue("engineTypePowerIds", e)}
                      hasLabel={true}
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={createMutation.isLoading}
                  initialValue={initialValue}
                  schema={AddMotorTypeValide}
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

export { AddMotorType };
