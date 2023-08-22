import React, { FC, useContext, useEffect, useState } from "react";
import { Card } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { usePostGetUsersOfMainLocationGuildRooms } from "../../../../../core/services/api/guilds.api";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";
import { refetchContext } from "../../../../../core/utils/context/EventContext";

interface IPropTypes {
  // toggleAdd: (val: boolean) => void;
  isAdmin?: boolean;
  mainLocationId: any;
}

const GuildUsersList: FC<IPropTypes> = ({ isAdmin, mainLocationId }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);

  //const [state,setState] = useState([])

  const allProvinceUserGuildMutation =
    usePostGetUsersOfMainLocationGuildRooms();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    allProvinceUserGuildMutation.mutate({
      page: 1,
      pageSize: pageSize,
      userRole: 0,
    });
  }, [pageSize, refetchEvent.mainlocationGuildUser]);

  useEffect(() => {
    if (
      allProvinceUserGuildMutation.data &&
      allProvinceUserGuildMutation.data.data.result
    ) {
      let newState: any = [];
      allProvinceUserGuildMutation.data.data.result.mainLocationGuildRooms.forEach(
        (row: any) => {
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
        }
      );
      setTableData(newState);
      setPageCount(
        Math.ceil(
          allProvinceUserGuildMutation.data.data.result.totalCount / pageSize
        )
      );
    }
  }, [allProvinceUserGuildMutation.isSuccess]);

  const history = useHistory();
  const [filterState, setFilterState] = useState<any>({
    userNationalCode: "",
    name: "",
    page: 1,
    pageSize: pageSize,
    userRole: null,
  });

  return (
    <Card>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: any = {
            userNationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            userRole: value.userRole ? value.userRole.value : 0,
          };
          allProvinceUserGuildMutation.mutate(obj);
        }}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <div
                className="d-flex flex-wrap justify-content-left"
                style={{ width: "100%" }}
              >
                <ListFilter
                  allProvinceUserGuildMutation={allProvinceUserGuildMutation}
                />
              </div>
              <ListTable
                columns={columns}
                isLoading={allProvinceUserGuildMutation.isLoading}
                onPageChange={({ page, pageSize }) => {
                  allProvinceUserGuildMutation.mutate({
                    page: page,
                    pageSize: pageSize,
                    userRole: 0,
                  });
                }}
                tableData={tableData}
                pageCountList={pageCountList}
                customPageSize={pageSize}
                setPageSize={(val: any) => setPageSize(val)}
                getCustomProps={{
                  isAdmin: isAdmin,
                  mainLocationId: mainLocationId,
                }}
              >
                {{
                  headerTable: <p></p>,
                }}
              </ListTable>
            </Form>
          </>
        )}
      </Formik>
    </Card>
  );
};

export { GuildUsersList };
