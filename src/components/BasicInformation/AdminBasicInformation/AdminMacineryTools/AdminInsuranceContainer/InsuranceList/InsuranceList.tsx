import React, { useState } from "react";
import { Row } from "reactstrap";

import { InsuranceModal } from "./InsuranceModal";
import { columns } from "./InsuranceListColumns";
import { Form, Formik } from "formik";
import { Col } from "reactstrap";
import { Button } from "reactstrap";
import { useAdminInsuranceContext } from "./../AdminInsuranceContainer";
import { SimpleTextInput } from "../../../../../common/Form";

import { ListTable } from "../../../../../common/ListTable";

const InsuranceList: React.FC = () => {
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
  } = useAdminInsuranceContext();

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
              <InsuranceModal
                backdrop={true}
                currentId={selectedUser}
                isOpen={showEditModal}
                data={listData}
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
              >
                {{
                  headerTable: (
                    <Row>
                      <Col md="6">
                        <SimpleTextInput
                          id="title"
                          lableText="نام شرکت بیمه"
                          name="title"
                          placeholder="نام شرکت بیمه"
                        />
                      </Col>
                      <Col md="6 align-items-center d-flex">
                        <Button color="primary" className="m-0" type="submit">
                          جستوجو
                        </Button>
                      </Col>
                    </Row>
                  ),
                }}
              </ListTable>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { InsuranceList };
