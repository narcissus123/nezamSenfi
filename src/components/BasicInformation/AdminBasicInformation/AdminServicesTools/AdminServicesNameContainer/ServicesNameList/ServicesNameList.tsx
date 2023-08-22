import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import { Formik, Form } from "formik";

import { ServicesNameModal } from "./ServicesNameModal";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { useGetServicesTypesForAdmin } from "./../../../../../../core/services/api";
import { useServicesNameContext } from "./../AdminServicesNameContainer";
import { columns } from "./ServicesNameListColumns";
import { ListTable } from "../../../../../common/ListTable";

export interface IPropsType {}

const initialFilter = {
  page: 1,
  pageSize: 10,
  title: "",
  agriculturalToolTypeId: { value: 0, label: "انتخاب کنید" },
};

const ServicesNameList: React.FC<IPropsType> = () => {
  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    data: allServicesType,
    isLoading: isLoadingType,
    isSuccess: isSuccessType,
  }: any = useGetServicesTypesForAdmin(); //types

  const {
    setfilterState,
    listData,
    pageCountList,
    filterState,
    mutation,
    setInitialPage,
    initialPage,
  }: any = useServicesNameContext();

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
          options: [{ value: 0, label: "هیچ کدام" }],
        },
      ];
      allServicesType.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setAllServicesTypes(pro);
    }
  }, [isSuccessType]);

  const onSubmit = (value: any) => {
    mutation.mutate({
      // refetch with filter page == 1
      ...value,
      page: 1,
      agriculturalToolTypeId: value.agriculturalToolTypeId.value,
    });
    setfilterState({ ...value, page: 1 }); // setfilter to filter-state page == 1
    setInitialPage(0);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={filterState}
        onSubmit={(value) => onSubmit(value)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <ServicesNameModal
                backdrop={true}
                currentId={selectedUser}
                data={listData}
                isOpen={showEditModal}
                toggleModal={() => setShowEditModal((val: any) => !val)}
                setSelectedUser={setSelectedUser}
              />
              <Row>
                <Col md="6">
                  <BasicSelectOption
                    lableText="نوع خدمات"
                    name="agriculturalToolTypeId"
                    data={allServicesTypes}
                    isLoading={isLoadingType}
                  />
                </Col>
                <Col md="6 align-items-center d-flex">
                  <Button color="primary" className="m-0" type="submit">
                    جستوجو
                  </Button>
                </Col>
              </Row>

              <ListTable
                isLoading={mutation.isLoading}
                columns={columns}
                pageCountList={pageCountList}
                tableData={listData}
                customPageSize={filterState.pageSize}
                initialPage={initialPage}
                setInitialPage={setInitialPage}
                setPageSize={(pageSize) =>
                  setfilterState((prev: any) => ({
                    ...prev,
                    page: 1,
                    pageSize: pageSize,
                  }))
                } // set page-size in filteState
                onPageChange={({ page, pageSize }: any) => {
                  mutation.mutate({
                    ...filterState,
                    page: page,
                    agriculturalToolTypeId:
                      filterState.agriculturalToolTypeId.value,
                  });
                  setfilterState((prev: any) => ({ ...prev, page: page })); // set page-number in filterState
                }}
                getCustomProps={{ setShowEditModal, setSelectedUser }}
              ></ListTable>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { ServicesNameList };
