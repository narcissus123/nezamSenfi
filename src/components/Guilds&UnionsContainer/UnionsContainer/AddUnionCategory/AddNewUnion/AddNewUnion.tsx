import { Formik, Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import {
  IUnionObj,
  useAllUseTypes,
  useCreateUnion,
} from "../../../../../core/services/api";
import { useRefetchState } from "../../../../../core/utils/context/EventContext";
import { AddNewUnionType } from "../../../../../core/validations/add-unions.validations";
import { MultiSelectOption } from "../../../../common/Form";
import { FieldWrapper } from "../../../../common/Form";
import { SubmitButton } from "../../../../common/Form";
import { TextInput } from "../../../../common/Form";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
  setInitialPage: any;
}

const AddNewUnion: FC<IPropTypes> = ({ setInitialPage }) => {
  const [initialValues, setInitialValues] = useState<any>({
    unionName: null,
    unionTypes: null,
  });

  const [unionTypes, setUnionTypes] = useState([]);

  const allUseTypes = useAllUseTypes();
  const createUnion = useCreateUnion();

  const [unionId, setUnionId] = useState([]);

  const onSubmit = (value: any) => {
    let unionTypes: any = [];
    value.unionTypes.forEach((item: any) => {
      unionTypes.push({ id: item.value });
    });

    const obj: IUnionObj = {
      title: value.unionName,
      useTypes: unionTypes,
    };

    createUnion.mutate(obj);
  };

  useEffect(() => {
    if (allUseTypes.data && allUseTypes.data.data) {
      const result = allUseTypes.data.data.result;
      const types: any = [
        {
          label: " نوع کاربری اتحادیه را انتخاب کنید",
          options: [],
        },
      ];

      result.forEach((item: any) => {
        types[0].options.push({ value: item.id, label: item.title });
      });
      setUnionTypes(types);
    }
  }, [allUseTypes.isSuccess]);

  useEffect(() => {
    if (createUnion.isSuccess) {
      setInitialValues({
        unionName: null,
        unionTypes: null,
      });
    }
  }, [createUnion.isSuccess]);

  const handleOnChange = (e: any, setFieldValue: any) => {
    setFieldValue("unionTypes", e);
    setUnionId(e);
  };

  const { setRefetchEvent } = useRefetchState();

  useEffect(() => {
    if (createUnion.isSuccess) {
      setInitialPage(0);
      setRefetchEvent((state: any) => {
        return {
          ...state,
          newUnionList: !state.newUnionList,
        };
      });
    }
  }, [createUnion.isSuccess]);

  return (
    <Card>
      <CardTitle>افزودن اتحادیه جدید</CardTitle>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={AddNewUnionType}
        onSubmit={(value) => onSubmit(value)}
      >
        {({ values, setFieldValue, setFieldError }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={createUnion}>
              <Form>
                <TwoColumn>
                  <TextInput
                    name="unionName"
                    placeholder="نام اتحادیه را وارد کنید"
                    hasLabel
                    lableText="نام اتحادیه"
                    significant
                    type="text"
                  />

                  <MultiSelectOption
                    hasLabel
                    labelText="نوع کاربری اتحادیه"
                    name="unionTypes"
                    significant
                    options={unionTypes}
                    placeHolder="انواع کاربری اتحادیه را انتخاب کنید"
                    value={unionId}
                    isLoading={allUseTypes.isLoading}
                    onChange={(e) => handleOnChange(e, setFieldValue)}
                  />
                </TwoColumn>

                <SubmitButton
                  isLoading={createUnion.isLoading} //addUnionGuildMutation.isLoading}
                  schema={AddNewUnionType}
                  values={values}
                  initialValue={initialValues}
                />
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </Card>
  );
};

export { AddNewUnion };
