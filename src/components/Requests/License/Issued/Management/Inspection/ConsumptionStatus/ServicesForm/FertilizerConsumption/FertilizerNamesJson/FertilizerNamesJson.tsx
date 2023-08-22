import { Field, Form, Formik } from "formik";
import React, { FC, useState } from "react";
import { FullOptionSel } from "../../../../../../../../../../core/models";
import {
  FormDivider,
  SubmitButton,
} from "../../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import * as Yup from "yup";
import { ListTable } from "../../../../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";
import { CardBody, Col, Row } from "reactstrap";

interface IPropTypes {
  fertilizerNamesJson: any;
  setFertilizerNamesJson: (val: any) => void;
  textHeader: string;
  nameOfFertilizerEnum: FullOptionSel[];
  amounValidate?: number;
  FertilizerEnumGroup: any;
  isExpert: boolean;
}

const FertilizerNamesJson: FC<IPropTypes> = ({
  fertilizerNamesJson,
  setFertilizerNamesJson,
  textHeader,
  nameOfFertilizerEnum,
  amounValidate = 0,
  FertilizerEnumGroup,
  isExpert,
}) => {
  const getTotalAmount = (val: number) => {
    let some = 0;

    fertilizerNamesJson.forEach((item: any) => {
      some += item.amount.value;
    });

    if (isEditing) some -= editingAmount;

    return val + some <= amounValidate;
  };

  const validate = Yup.object().shape({
    nameOfFertilizerEnum: Yup.object()
      .shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    amount: Yup.object()
      .shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
      .test(
        "amount",
        "مقدار انتخابی بیش از حد مجاز",
        (val) => !!val && getTotalAmount(val.value)
      )
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  });

  const [initialValue, setinitialValue] = useState<any>({
    nameOfFertilizerEnum: null,
    amount: null,
    id: null,
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingAmount, setEditingAmount] = useState<number>(0);

  const onSubmit = (values: any, { resetForm }: any) => {
    if (!isEditing)
      setFertilizerNamesJson((old: any) => [
        ...old,
        {
          ...values,
          id:
            old.length > 0
              ? Math.max.apply(
                  Math,
                  old.map((o: any) => o.id)
                ) + 1
              : 1,
        },
      ]);
    else {
      const fertilizerIndex = fertilizerNamesJson.findIndex(
        ({ id }: any) => id === values.id
      );
      const allJsons = fertilizerNamesJson;
      allJsons[fertilizerIndex] = values;
      setFertilizerNamesJson([]);
      setFertilizerNamesJson(allJsons);
      setIsEditing(false);
      setEditingAmount(0);
      setinitialValue({
        nameOfFertilizerEnum: null,
        amount: null,
        id: null,
      });
    }
    resetForm();
  };

  return (
    <FormDivider textHeader={textHeader}>
      <CardBody>
        <Formik
          initialValues={initialValue}
          onSubmit={onSubmit}
          validationSchema={validate}
          enableReinitialize
        >
          {({ values, resetForm }) => (
            <Form>
              {/* <Row> */}
              {/* <Col sm="6"> */}
              <Field name="id" style={{ display: "none" }} />
              <BasicSelectOption
                lableText="نام کود"
                name="nameOfFertilizerEnum"
                placeHolder="انتخاب کنید..."
                significant
                data={nameOfFertilizerEnum}
                hasLabel={true}
                isDisabled={!isExpert}
              />
              {/* </Col> */}
              {/* <Col sm="6"> */}
              <BasicSelectOption
                lableText="مقدار کود"
                name="amount"
                placeHolder="انتخاب کنید..."
                significant
                isDisabled={!isExpert}
                data={FertilizerEnumGroup}
                hasLabel={true}
              />
              {/* </Col> */}
              {/* </Row> */}

              {isExpert && (
                <SubmitButton
                  isLoading={false}
                  btnText={isEditing ? "ویرایش" : "ثبت"}
                  values={values}
                  clearable
                  clearableTxt="پاکسازی"
                  onClear={() => {
                    setinitialValue({
                      nameOfFertilizerEnum: null,
                      amount: null,
                      id: null,
                    });
                    resetForm();
                  }}
                  schema={validate}
                />
              )}

              <hr />

              <ListTable
                columns={columns}
                isLoading={false}
                onPageChange={() => {}}
                pageCountList={0}
                tableData={fertilizerNamesJson}
                customPageSize={1000}
                getCustomProps={{
                  setTableData: setFertilizerNamesJson,
                  setListInitialValue: setinitialValue,
                  setIsEditing: setIsEditing,
                  setEditingAmount: setEditingAmount,
                  isExpert,
                }}
              ></ListTable>
            </Form>
          )}
        </Formik>
      </CardBody>
    </FormDivider>
  );
};

export { FertilizerNamesJson };
