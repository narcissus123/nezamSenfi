import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, CardBody } from "reactstrap";

import {
  FormDivider,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";
import { TwoColumn } from "../../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { PotoraphySoilNutrientsValidation } from "../../../../../../../../../core/validations/inspection-potography.validation";
import { ListTable } from "../../../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";

interface IPropTypes {
  setSoilNutrientList: (val: any) => void;
  soilNutrientList: any;
  disabled: boolean;
}

const SoilNutrientsForm: React.FC<IPropTypes> = ({
  setSoilNutrientList,
  soilNutrientList,
  disabled,
}) => {
  const [initialValue, setInitialValue] = useState<any>({
    // عناصر غذایی موجود در خاک
    depthOfSampling: 0,
    percentageOfNitrogen: 0,
    Phosphorus: 0,
    potassium: 0,
    Magnesium: 0,
    Iron: 0,
    Manganese: 0,
    Roy: 0,
    Copper: 0,
    bor: 0,
    Calcium: 0,
    id: null,
  });

  const onSubmit = (value: any, { resetForm }: any) => {
    if (value.id) {
      const index = soilNutrientList.findIndex(
        ({ id }: any) => id === value.id
      );
      const allJsons = soilNutrientList;
      allJsons[index] = value;
      setSoilNutrientList([]);
      setSoilNutrientList(allJsons);
    } else
      setSoilNutrientList((old: any) => [
        ...old,
        {
          ...value,
          id:
            old.length > 0
              ? Math.max.apply(
                  Math,
                  old.map((o: any) => o.id)
                ) + 1
              : 1,
        },
      ]);

    setInitialValue({
      // عناصر غذایی موجود در خاک
      depthOfSampling: 0,
      percentageOfNitrogen: 0,
      Phosphorus: 0,
      potassium: 0,
      Magnesium: 0,
      Iron: 0,
      Manganese: 0,
      Roy: 0,
      Copper: 0,
      bor: 0,
      Calcium: 0,
      id: null,
    });
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={PotoraphySoilNutrientsValidation}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ setFieldError, values, resetForm }) => (
          <>
            <Form>
              <FormDivider textHeader=" عناصر غذایی موجود در خاک ">
                <CardBody>
                  <Field name="id" style={{ display: "none" }} />
                  <TwoColumn>
                    <div>
                      <TextInput
                        type="number"
                        lableText="عمق نمونه گیری"
                        name="depthOfSampling"
                        placeholder="عمق نمونه گیری"
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="فسفر قابل جذب"
                        name="Phosphorus"
                        placeholder="فسفر قابل جذب"
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="منیزم"
                        name="Magnesium"
                        placeholder="منیزم "
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="منگنز"
                        name="Manganese"
                        placeholder="منگنز "
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="مس"
                        name="Copper"
                        placeholder="مس "
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="درصد کلسیم"
                        name="Calcium"
                        placeholder="درصد کلسیم "
                        significant
                        disabled={disabled}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="number"
                        lableText="درصد ازت کل "
                        name="percentageOfNitrogen"
                        placeholder="درصد ازت کل"
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="پتاسیم قابل جذب "
                        name="potassium"
                        placeholder="پتاسیم قابل جذب"
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="آهن "
                        name="Iron"
                        placeholder="آهن"
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="روی  "
                        name="Roy"
                        placeholder="روی "
                        significant
                        disabled={disabled}
                      />
                      <TextInput
                        type="number"
                        lableText="بُر  "
                        name="bor"
                        placeholder="بُر "
                        significant
                        disabled={disabled}
                      />
                    </div>
                  </TwoColumn>
                  {!disabled && (
                    <SubmitButton
                      isLoading={false}
                      btnText={values.id ? "ویرایش" : "ذخیره"}
                      values={values}
                      clearable
                      clearableTxt="پاکسازی"
                      onClear={() => {
                        resetForm();
                        setInitialValue({
                          // عناصر غذایی موجود در خاک
                          depthOfSampling: 0,
                          percentageOfNitrogen: 0,
                          Phosphorus: 0,
                          potassium: 0,
                          Magnesium: 0,
                          Iron: 0,
                          Manganese: 0,
                          Roy: 0,
                          Copper: 0,
                          bor: 0,
                          Calcium: 0,
                          id: null,
                        });
                      }}
                      schema={PotoraphySoilNutrientsValidation}
                    />
                  )}

                  <hr />
                  <ListTable
                    columns={columns}
                    isLoading={false}
                    onPageChange={() => {}}
                    pageCountList={0}
                    tableData={soilNutrientList}
                    customPageSize={100}
                    getCustomProps={{
                      setSoilNutrientList: setSoilNutrientList,
                      setInitialValue: setInitialValue,
                      disabled: disabled,
                    }}
                  ></ListTable>
                </CardBody>
              </FormDivider>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export { SoilNutrientsForm };
