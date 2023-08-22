import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";

import { columns } from "./MachineColumn";
import { MachineModal } from "./MachineModal";
import { useAdminMachineContext } from "../AdminMachineContainer";
import { Formik, Form } from "formik";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { productionType, productionTypeWithDefault } from "./../../../../../../core/data";
import { SimpleSubmitButton, SimpleTextInput, TextInput } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable";
import { useGetAllMachineManufacturer, useGetAllMachineTypes } from "../../../../../../core/services/api";

const MachineList: React.FC = () => {
  const {
    setfilterState,
    listData,
    pageCountList,
    filterState,
    mutation,
    setInitialPage,
    initialPage,
  } = useAdminMachineContext();

  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [typeMachineIdData , setTypeMachineIdData] = useState<any>([]);
  const [machineManufacturerIdData , setMachineManufacturerIdData] = useState<any>([]);

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

  const onSubmit = (value: any) => {
    mutation.mutate({
      // refetch with filter page == 1
      ...value,
      page: 1,
      typeMachineId: value.typeMachineId ? value.typeMachineId.value: 0,
      machineManufacturerId: value.machineManufacturerId ? value.machineManufacturerId.value: 0,
      productionType: value.productionType ? value.productionType.value: 0,
    });
    setfilterState({ ...value, page: 1 }); // setfilter to filter-state page == 1
    setInitialPage(0);
  };

  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => onSubmit(value)}
        enableReinitialize={true}
      >
        {({ values }) => {
          return (
            <Form>
              <MachineModal
                backdrop={true}
                currentId={selectedUser}
                data={listData}
                isOpen={showEditModal}
                setSelectedUser={setSelectedUser}
                toggleModal={() => setShowEditModal((val: any) => !val)}
              />
              <Row>
                <Col md="3">
                  <TextInput
                    id="title"
                    lableText="نام ماشین"
                    name="title"
                    placeholder="نام ماشین"
                  />
                </Col>
                <Col md="3">
                  <BasicSelectOption
                    lableText="نوع ماشین"
                    name="typeMachineId"
                    data={typeMachineIdData}
                    isClearable={true}
                  />
                </Col>
                <Col md="3">
                  <BasicSelectOption
                    lableText="نوع ساخت ماشین"
                    name="productionType"
                    data={productionType}
                    isLoading={isGetAllMachinTypesFetching}
                    isClearable={true}
                  />
                </Col>
                <Col md="3">
                  <BasicSelectOption
                    lableText="شرکت سازنده"
                    name="machineManufacturerId"
                    data={machineManufacturerIdData}
                    isLoading={isMachineManufacturerIsFetching}
                    isClearable={true}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "15px", paddingBottom: "25px" }}>
                <Col md="6">
                  <SimpleSubmitButton
                    isLoading={mutation.isLoading}
                    btnText="جستجو"
                  />
                </Col>
              </Row>

              <ListTable
                isLoading={mutation.isLoading}
                columns={columns}
                pageCountList={pageCountList}
                tableData={listData}
                onPageChange={({ page, pageSize }: any) => {
                  mutation.mutate({
                    page: page,
                    pageSize: pageSize,
                    title: values.title,
                    typeMachineId: values.typeMachineId
                      ? values.typeMachineId.value
                      : 0,
                    machineManufacturerId: values.machineManufacturerId
                      ? values.machineManufacturerId.value
                      : 0,
                    productionType: values.productionType
                      ? values.productionType.value
                      : 0,
                  });
                  setfilterState((prev: any) => ({ ...prev, page: page })); // set page-number in filterState
                }}
                initialPage={initialPage}
                setInitialPage={setInitialPage}
                customPageSize={filterState.pageSize}
                setPageSize={(pageSize) =>
                  setfilterState((prev: any) => ({
                    ...prev,
                    page: 1,
                    pageSize: pageSize,
                  }))
                } // set page-size in filteState
                getCustomProps={{ setShowEditModal, setSelectedUser }}
              ></ListTable>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { MachineList };
