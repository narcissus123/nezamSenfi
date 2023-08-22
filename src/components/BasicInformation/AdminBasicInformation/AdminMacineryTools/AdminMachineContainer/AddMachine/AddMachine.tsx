import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Row } from "reactstrap";
import { TextInput } from "../../../../../common/Form";

import { SubmitButton } from "../../../../../common/Form";
import { addMachineTypeValidate } from "../../../../../../core/validations/admin-machinery-tools.validation";
import { useCreateAdminMachine, useGetAllMachineManufacturer, useGetAllMachineTypes } from "./../../../../../../core/services/api";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { productionType } from "./../../../../../../core/data";
import { adminMachineValidation } from "../../../../../../core/validations/admin-add-machine.validation";
import { useAdminMachineContext } from "../AdminMachineContainer";

const initialValue = {
  title: "",
  typeMachineId: { value: 0, label: "انتخاب کنید" },
  machineManufacturerId: { value: 0, label: "انتخاب کنید" },
  productionType: { value: 0, label: "انتخاب کنید" },
};

const AddMachine: React.FC = () => {
  const {
    mutation,
    initialFilter,
    setfilterState,
    filterState,
    setInitialPage,
  } = useAdminMachineContext();

  const [typeMachineIdData , setTypeMachineIdData] = useState<any>([]);
  const [machineManufacturerIdData , setMachineManufacturerIdData] = useState<any>([]);

  const CreateMachine = useCreateAdminMachine();

  const {
    data: getAllMachinTypes,
    isSuccess: isGetAllMachinTypsSuccess,
    isLoading: isGetAllMachinTypesLoading,
    isFetching: isGetAllMachinTypesFetching,
  } = useGetAllMachineTypes();

  const {
    data: getAllMachineManufacturer,
    isSuccess: isMachineManufacturerSuccess,
    isLoading: isMachineManufacturerLoading,
    isFetching : isMachineManufacturerIsFetching,
  } = useGetAllMachineManufacturer();

  useEffect(() => {
    if (getAllMachineManufacturer?.data.result) {
      const result = getAllMachineManufacturer.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setMachineManufacturerIdData(pro);
    }
  }, [isMachineManufacturerSuccess]);

  useEffect(() => {
    // save machin-types to state
    if (getAllMachinTypes?.data.result) {
      const result = getAllMachinTypes.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setTypeMachineIdData(pro);
    }
  }, [isGetAllMachinTypsSuccess]);

  const onSubmit = (value: any, { resetForm }: any) => {
    const submitValue = {
      title: value.title,
      typeMachineId: value.typeMachineId.value,
      machineManufacturerId: value.machineManufacturerId.value,
      productionType: value.productionType.value,
    };
    CreateMachine.mutate(submitValue, {
      onSuccess: () => {
        resetForm();
        mutation.mutate({
          // refetch without filter
          ...initialFilter,
          productionType: initialFilter.productionType.value,
          typeMachineId: initialFilter.typeMachineId.value,
          machineManufacturerId: initialFilter.machineManufacturerId.value,
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
        validationSchema={adminMachineValidation}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <>
                    <TextInput
                      id="title"
                      lableText="نام ماشین"
                      name="title"
                      placeholder="نام ماشین"
                      significant={true}
                    />
                    <BasicSelectOption
                      lableText="نوع ماشین"
                      significant={true}
                      name="typeMachineId"
                      data={typeMachineIdData}
                    />
                  </>
                  <>
                    <BasicSelectOption
                      lableText="نوع ساخت ماشین"
                      significant={true}
                      name="productionType"
                      data={productionType}
                      isLoading={isGetAllMachinTypesFetching}
                    />
                    <BasicSelectOption
                      lableText="شرکت سازنده"
                      significant={true}
                      name="machineManufacturerId"
                      data={machineManufacturerIdData}
                      isLoading={isMachineManufacturerIsFetching}
                    />
                  </>
                </TwoColumn>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={CreateMachine.isLoading}
                      initialValue={initialValue}
                      schema={addMachineTypeValidate}
                      values={values}
                      isDisabled={CreateMachine.isLoading}
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

export { AddMachine };
