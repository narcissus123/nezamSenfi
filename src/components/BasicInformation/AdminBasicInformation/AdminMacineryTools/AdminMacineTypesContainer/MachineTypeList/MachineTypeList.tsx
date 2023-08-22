import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { Formik, Form } from "formik";
import { columns } from "./MachineTypeColumns";

import { SimpleTextInput } from "../../../../../common/Form";
import { MachineTypeModal } from "./MachineTypeModal";
import { useMachineTypeContext } from "./../AdminMacineTypesContainer";
import { ListTable } from "../../../../../common/ListTable";

const MachineTypeList: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    initialPage,
    setInitialPage,
    setfilterState,
    listData,
    pageCountList,
    filterState,
    mutation,
  } = useMachineTypeContext();

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
              <MachineTypeModal
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
              >
                {{
                  headerTable: (
                    <Row>
                      <Col md="6">
                        <SimpleTextInput
                          id="title"
                          lableText="نوع ماشین"
                          name="title"
                          placeholder="نوع ماشین"
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

export { MachineTypeList };
