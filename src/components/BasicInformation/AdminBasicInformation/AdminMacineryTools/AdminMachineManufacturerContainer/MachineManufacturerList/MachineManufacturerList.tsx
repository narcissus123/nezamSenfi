import React, { useState } from "react";
import { Row } from "reactstrap";

import { MachineManufacturerModal } from "./MachineManufacturerModal";
import { columns } from "./MachineManufacturerColumns";
import { useMachineManufacturerContext } from "./../AdminMachineManufacturerContainer";
import { Formik, Form } from "formik";
import { Col } from "reactstrap";
import { Button } from "reactstrap";
import { SimpleTextInput } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable";

const MachineManufacturerList: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    setfilterState,
    listData,
    pageCountList,
    filterState,
    mutation,
    setInitialPage,
    initialPage,
  } = useMachineManufacturerContext();

  const onSubmit = (value: any) => {
    mutation.mutate({ ...value, page: 1 }); // refetch with filter page == 1
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
        {({ values }) => {
          return (
            <Form>
              <Row>
                <Col md="6">
                  <SimpleTextInput
                    id="title"
                    lableText="نام شرکت"
                    name="title"
                    placeholder="نام شرکت"
                  />
                </Col>
                <Col md="6 align-items-center d-flex">
                  <Button color="primary" className="m-0" type="submit">
                    جستوجو
                  </Button>
                </Col>
              </Row>
              <MachineManufacturerModal
                backdrop={true}
                currentId={selectedUser}
                data={listData}
                isOpen={showEditModal}
                setSelectedUser={setSelectedUser}
                toggleModal={() => setShowEditModal((val: any) => !val)}
              />

              <ListTable
                isLoading={mutation.isLoading}
                columns={columns}
                pageCountList={pageCountList}
                tableData={listData}
                onPageChange={({ page, pageSize }: any) => {
                  mutation.mutate({ ...filterState, page: page });
                  setfilterState((prev: any) => ({ ...prev, page: page }));
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

export { MachineManufacturerList };
