import React, { FC, useContext, useEffect, useState } from "react";
import { Card } from "reactstrap";

import { useHistory, useParams } from "react-router-dom";
import { columns } from "./UserColumns";

import { ListTable } from "../../../../common/ListTable/ListTable";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { useGetUserUnionByUnionId } from "../../../../../core/services/api";

interface IPropTypes {
  // toggleAdd: (val: boolean) => void;
  isAdmin?: boolean;
}

const UnionUsersList: FC<IPropTypes> = ({ isAdmin }) => {
  const { id } = useParams<{ id: string }>();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);

  //const [state,setState] = useState([])

  const allUnionUserMutation = useGetUserUnionByUnionId();

  useEffect(() => {
    allUnionUserMutation.mutate({
      page: 1,
      pageSize: pageSize,
      countyUnionId: parseInt(id),
      userRole: 0,
    });
  }, [refetchEvent.unionUserList, pageSize]);

  useEffect(() => {
    if (allUnionUserMutation.data && allUnionUserMutation.data.data.result) {
      let newState: any = [];
      allUnionUserMutation.data.data.result.userUnions.forEach((row: any) => {
        let newRoles = "";
        row.roles.forEach((role: any) => {
          newRoles += `${role},`;
        });
        newState.push({
          id: row.userId,
          name: `${row.userFirstName} ${row.userLastName}`,
          userNationalCode: row.userNationalCode
            ? row.userNationalCode
            : "نامشخص",
          role: newRoles,
        });
      });

      setTableData(newState);
      setPageCount(
        Math.ceil(allUnionUserMutation.data.data.result.totalCount / pageSize)
      );
    }
  }, [allUnionUserMutation.isSuccess, allUnionUserMutation.data]);

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );

  const history = useHistory();
  const [filterState, setFilterState] = useState<any>({
    userNationalCode: "",
    name: "",
    page: 1,
    pageSize: pageSize,
    userRole: null,
  });

  const onSubmit = (value: any) => {
    const unionFilterData: any = {
      userNationalCode: value.userNationalCode,
      name: value.name,
      page: 1,
      pageSize: pageSize,
      userRole: value.userRole ? value.userRole.value : 0,
      countyUnionId: parseInt(id),
    };
    allUnionUserMutation.mutate(unionFilterData);
  };

  return (
    <Card>
      <Formik
        initialValues={filterState}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ values }) => (
          <>
            <Form>
              <ListFilter allUnionUserMutation={allUnionUserMutation} />
            </Form>
            <ListTable
              columns={columns}
              isLoading={allUnionUserMutation.isLoading}
              onPageChange={({ page, pageSize }) => {
                const unionFilterData: any = {
                  userNationalCode: values.userNationalCode,
                  name: values.name,
                  page: page,
                  pageSize: pageSize,
                  userRole: values.userRole ? values.userRole.value : 0,
                  countyUnionId: parseInt(id),
                };
                allUnionUserMutation.mutate(unionFilterData);
              }}
              tableData={tableData}
              customPageSize={pageSize}
              setPageSize={setPageSize}
              pageCountList={pageCountList}
              getCustomProps={{ isAdmin: isAdmin }}
            >
              {{
                headerTable: (
                  <div
                    className="d-flex flex-wrap justify-content-left"
                    style={{ width: "100%" }}
                  ></div>
                ),
              }}
            </ListTable>
          </>
        )}
      </Formik>
    </Card>
  );
};

export { UnionUsersList };
