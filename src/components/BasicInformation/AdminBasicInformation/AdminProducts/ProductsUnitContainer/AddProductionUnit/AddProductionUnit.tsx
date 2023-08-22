import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { ToastTypes } from "../../../../../../core/enums";
import { useCreateProductUnit } from "../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { addProductionUnitValidation } from "../../../../../../core/validations/product-unit.validation";
import { DropZone } from "../../../../../common/Form/DropZone/DropZone";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

const initialValue = {
  title: "",
  abbreviation: "",
};

const AddProductionUnit: React.FC = () => {
  const addMutation = useCreateProductUnit();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = (value: { title: string; abbreviation: string }) => {
    const unitObject = {
      title: value.title,
      abbreviation: value.abbreviation,
    };

    addMutation.mutate(unitObject, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.productionUnitList = !newEvent.productionUnitList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addProductionUnitValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      lableText="نام واحد"
                      name="title"
                      placeholder="نام"
                      significant
                    />
                  </div>
                  <div>
                    <TextInput
                      lableText="کلمه اختصاری"
                      name="abbreviation"
                      placeholder="کلمه اختصاری"
                      significant
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={addMutation.isLoading}
                  initialValue={initialValue}
                  schema={addProductionUnitValidation}
                  values={values}
                  isDisabled={false}
                />
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddProductionUnit };
