import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { SimpleTextInput } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable";
import { useServicesTypesContext } from "./../AdminServicesTypesContainer";
import { columns } from "./ServicesTypesListColumns";
import { ServicesTypesModal } from "./ServicesTypesModal";

const ServicesTypesList: React.FC = () => {
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
  } = useServicesTypesContext();

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
              <ServicesTypesModal
                backdrop={true}
                currentId={selectedUser}
                data={listData}
                isOpen={showEditModal}
                setSelectedUser={setSelectedUser}
                toggleModal={() => setShowEditModal((val: any) => !val)}
              />
              <Row>
                <Col md="6">
                  <SimpleTextInput
                    id="title"
                    lableText="نوع خدمات"
                    name="title"
                    placeholder=" نوع خدمات"
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
                initialPage={initialPage}
                setInitialPage={setInitialPage}
                onPageChange={({ page, pageSize }: any) => {
                  mutation.mutate({ ...values, page: page });
                  setfilterState((prev: any) => ({ ...prev, page: page }));
                }}
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

export { ServicesTypesList };
