import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, CardBody } from "reactstrap";

import {
  FormDivider,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";
import { TwoColumn } from "../../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { soilPatterns } from "../../../../../../../../../core/data";
import { PotoraphySoilDecompositionValidation } from "../../../../../../../../../core/validations/inspection-potography.validation";
import { ListTable } from "../../../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";

interface IPropTypes {
  setSoilDecompositionList: (val: any) => void;
  soilDecompositionList: any;
  disabled: boolean;
}

const SoilDecompositionForm: React.FC<IPropTypes> = ({
  setSoilDecompositionList,
  soilDecompositionList,
  disabled,
}) => {
  const [initialValue, setInitialValue] = useState({
    // تجزیه فیزیک و شیمایی خاک
    depthOfSampling: 0,
    percentOfSand: 0,
    percentOfLay: 0,
    percentOfClay: 0,
    organicCarbon: 0,
    organicMatter: 0,
    organicSaturation: 0,
    aciditySaturation: 0,
    ECSoil: 0,
    PercentOfNeutralizingMatter: 0,
    soilPattern: { value: 0, label: "انتخاب کنید" },
    id: null,
  });

  const onSubmit = (value: any, { resetForm }: any) => {
    if (value.id) {
      const index = soilDecompositionList.findIndex(
        ({ id }: any) => id === value.id
      );
      const allJsons = soilDecompositionList;
      allJsons[index] = value;
      setSoilDecompositionList([]);
      setSoilDecompositionList(allJsons);
    } else
      setSoilDecompositionList((old: any) => [
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
      depthOfSampling: 0,
      percentOfSand: 0,
      percentOfLay: 0,
      percentOfClay: 0,
      organicCarbon: 0,
      organicMatter: 0,
      organicSaturation: 0,
      aciditySaturation: 0,
      ECSoil: 0,
      PercentOfNeutralizingMatter: 0,
      soilPattern: { value: 0, label: "انتخاب کنید" },
      id: null,
    });
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={PotoraphySoilDecompositionValidation}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ setFieldError, values, resetForm }) => (
          <Form>
            <FormDivider textHeader=" تجزیه فیزیک و شیمایی خاک ">
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
                      lableText="درصد لای"
                      name="percentOfLay"
                      placeholder="درصد لای"
                      significant
                      disabled={disabled}
                    />
                    <TextInput
                      type="number"
                      lableText="کربن آلی"
                      name="organicCarbon"
                      placeholder="کربن آلی"
                      significant
                      disabled={disabled}
                    />
                    <TextInput
                      type="number"
                      lableText="درصد اشباع"
                      name="organicSaturation"
                      placeholder="درصد اشباع"
                      significant
                      disabled={disabled}
                    />
                    <TextInput
                      type="number"
                      lableText="هدایت الکتریکی"
                      name="ECSoil"
                      placeholder="هدایت الکتریکی"
                      significant
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="number"
                      lableText="درصد شن"
                      name="percentOfSand"
                      placeholder="درصد شن"
                      significant
                      disabled={disabled}
                    />
                    <TextInput
                      type="number"
                      lableText="درصد رس"
                      name="percentOfClay"
                      placeholder="درصد رس"
                      significant
                      disabled={disabled}
                    />
                    <TextInput
                      type="number"
                      lableText="درصد ماده آلی"
                      name="organicMatter"
                      placeholder="درصد ماده آلی"
                      significant
                      disabled={disabled}
                    />
                    <TextInput
                      type="number"
                      lableText="اسیدیتیه گل اشباع"
                      name="aciditySaturation"
                      placeholder="اسیدیتیه گل اشباع"
                      significant
                      disabled={disabled}
                    />
                    <TextInput
                      type="number"
                      lableText="درصد مواد خنثی شونده"
                      name="PercentOfNeutralizingMatter"
                      placeholder="درصد مواد خنثی شونده"
                      significant
                      disabled={disabled}
                    />
                  </div>
                </TwoColumn>
                <BasicSelectOption
                  lableText="بافت خاک"
                  name="soilPattern"
                  data={soilPatterns}
                  significant
                  isDisabled={disabled}
                />
                {!disabled && (
                  <SubmitButton
                    isLoading={false}
                    btnText={values.id ? "ویرایش" : "ذخیره"}
                    values={values}
                    clearable
                    clearableTxt="پاکسازی"
                    onClear={() => {
                      setInitialValue({
                        depthOfSampling: 0,
                        percentOfSand: 0,
                        percentOfLay: 0,
                        percentOfClay: 0,
                        organicCarbon: 0,
                        organicMatter: 0,
                        organicSaturation: 0,
                        aciditySaturation: 0,
                        ECSoil: 0,
                        PercentOfNeutralizingMatter: 0,
                        soilPattern: { value: 0, label: "انتخاب کنید" },
                        id: null,
                      });
                      resetForm();
                    }}
                    schema={PotoraphySoilDecompositionValidation}
                  />
                )}

                <hr />
                <ListTable
                  columns={columns}
                  isLoading={false}
                  onPageChange={() => {}}
                  pageCountList={0}
                  tableData={soilDecompositionList}
                  customPageSize={100}
                  getCustomProps={{
                    setSoilDecompositionList: setSoilDecompositionList,
                    setInitialValue: setInitialValue,
                    disabled: disabled,
                  }}
                ></ListTable>
              </CardBody>
            </FormDivider>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { SoilDecompositionForm };
