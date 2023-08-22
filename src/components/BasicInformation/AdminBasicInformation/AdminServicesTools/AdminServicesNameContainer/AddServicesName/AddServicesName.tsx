import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Row } from "reactstrap";

import { TextInput } from "../../../../../common/Form";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton";
import { ICreateServicesName } from "./../../../../../../core/models";
import { addServicesValidations } from "../../../../../../core/validations/services-tools.validation";
import { useCreateServicesName } from "../../../../../../core/services/api";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { useGetServicesTypesForAdmin } from "./../../../../../../core/services/api";
import { useServicesNameContext } from "./../AdminServicesNameContainer";

const initialValue: ICreateServicesName = {
  title: "",
  agriculturalToolsTypeId: { value: null, label: "انتخاب کنید" },
};

const AddServicesName: React.FC = () => {
  const {
    mutation,
    initialFilter,
    setfilterState,
    filterState,
    setInitialPage,
  } = useServicesNameContext();
  const CreateServicesName = useCreateServicesName();

  const {
    data: allServicesType,
    isLoading: isLoadingType,
    isSuccess: isSuccessType,
  }: any = useGetServicesTypesForAdmin(); //types

  const [allServicesTypes, setAllServicesTypes] = useState([
    {
      label: "نام خدمات را انتخاب کنید",
      options: [],
    },
  ]);

  useEffect(() => {
    if (allServicesType) {
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      allServicesType.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setAllServicesTypes(pro);
    }
  }, [isSuccessType]);

  const onSubmit = (value: ICreateServicesName, { resetForm }: any) => {
    const submitData: any = {
      ...value,
      agriculturalToolsTypeId: value.agriculturalToolsTypeId.value,
    };
    CreateServicesName.mutate(submitData, {
      onSuccess: () => {
        resetForm();
        mutation.mutate({
          // refetch without filter
          ...initialFilter,
          agriculturalToolTypeId: initialFilter.agriculturalToolTypeId.value,
          pageSize: filterState.pageSize,
        });
        setfilterState({ ...initialFilter, pageSize: filterState.pageSize }); // reset filter state
        setInitialPage(0); // reset page-number
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addServicesValidations}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <TextInput
                    id="title"
                    lableText="نام خدمات"
                    name="title"
                    placeholder="نام خدمات"
                    significant={true}
                  />
                  <BasicSelectOption
                    lableText="نوع خدمات"
                    significant={true}
                    name="agriculturalToolsTypeId"
                    data={allServicesTypes}
                    isLoading={isLoadingType}
                  />
                </TwoColumn>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={CreateServicesName.isLoading}
                      initialValue={initialValue}
                      schema={addServicesValidations}
                      values={values}
                      isDisabled={CreateServicesName.isLoading}
                    />
                  </Col>
                </Row>
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddServicesName };
