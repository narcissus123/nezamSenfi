import React, { FC, useEffect, useState } from "react";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import { columns } from "./Columns";
import { EditColumns } from "./EdirColumns";
import { useHistory, useParams } from "react-router-dom";

import { EditModal } from "./EditModal/EditModal";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { usePostGetMyResumesInPositionRequest } from "../../../../../../core/services/api";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";
import { useRefetchState } from "../../../../../../core/utils/context/EventContext";
import { IJobResumeFilter } from "../../../../../../core/models/job-resume-filter.model";
import { useGlobalState } from "../../../../../../core/utils/context/GlobalContext";
import { JobRequestStatus } from "../../../../../../core/enums/job-request-status";

interface IPropTypes {
  fetchRefresh: boolean;
  setFetchRefresh: () => void;
}

const JobRequestList: FC<IPropTypes> = ({ fetchRefresh, setFetchRefresh }) => {
  const history = useHistory();

  const [filterState, setFilterState] = useState<any>({
    OrganizationTitle: "",
    StartDate: "",
    EndDate: "",
    PositionId: 0,
    PositionRequestId: 0,
    CountyId: 0,
  });

  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);
  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [pageSize, setPageSize] = useState<any>(10);

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );

  const getResumeMutation = usePostGetMyResumesInPositionRequest();
  const { refetchEvent } = useRefetchState();

  useEffect(() => {
    getResumeMutation.mutate({ ...filterState, page: 1, pageSize: pageSize });
  }, [refetchEvent.jobResumeList, pageSize]);

  useEffect(() => {
    if (getResumeMutation.data && getResumeMutation.data.data) {
      const result = getResumeMutation.data.data.result.items;
      let tableData: any = [];

      result.forEach((item: any) => {
        tableData.push({
          id: item.id,
          statusId: item.status,
          union: item.unionTitle,
          createDate: item.createDate,
        });
      });
      try {
        setState(tableData);
        setPageCount(
          Math.ceil(getResumeMutation.data.data.result.totalCount / pageSize)
        );
      } catch (error) {}
    }
  }, [getResumeMutation.isSuccess]);

  const { req_id } = useGlobalState();

  const params: any = useParams();

  const onSubmit = (value: any) => {
    const resumeSerachObject: IJobResumeFilter = {
      CountyId: value.CountyId ? value.CountyId.value : 0,
      EndDate: value.EndDate ? value.EndDate : "",
      OrganizationTitle: value.OrganizationTitle ? value.OrganizationTitle : "",
      PositionRequestId: parseInt(req_id[0]),
      PositionId: 0,
      StartDate: value.StartDate ? value.StartDate : "",
    };

    getResumeMutation.mutate(resumeSerachObject);
    setInitialPage(0);
  };

  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={onSubmit}
        enableReinitialize={true}
        onReset={(a: any) => {}}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => {
          return (
            <>
              <Form>
                <Card>
                  <CardHeader>
                    <CardTitle>جستجو</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ListFilter
                      mutation={getResumeMutation}
                      setFieldValue={setFieldValue}
                      onResetClick={resetForm}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <EditModal
                      setFetchRefresh={setFetchRefresh}
                      backdrop={true}
                      currentId={selectedUser}
                      data={state}
                      isOpen={showEditModal}
                      toggleModal={() => setShowEditModal((val: any) => !val)}
                    />

                    <ListTable
                      columns={
                        +params.status === JobRequestStatus.RejectBySecretariat
                          ? EditColumns
                          : columns
                      }
                      isLoading={getResumeMutation.isLoading}
                      onPageChange={({ page, pageSize }) => {
                        getResumeMutation.mutate({
                          page: page,
                          pageSize: pageSize,
                        });
                      }}
                      tableData={state}
                      pageCountList={pageCountList}
                      customPageSize={pageSize}
                      setPageSize={(val: any) => setPageSize(val)}
                      setInitialPage={setInitialPage}
                      getCustomProps={{
                        setShowEditModal: setShowEditModal,
                        setSelectedUser: setSelectedUser,
                      }}
                    >
                      {{
                        headerTable: <div style={{ width: "200px" }}></div>,
                      }}
                    </ListTable>
                  </CardBody>
                </Card>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export { JobRequestList };
