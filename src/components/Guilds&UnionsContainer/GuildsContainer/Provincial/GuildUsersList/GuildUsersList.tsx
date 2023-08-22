import React, { FC, useContext, useEffect, useState } from "react";
import { Card } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { useGetUserProvinceGuildRoomsByProvinceId } from "../../../../../core/services/api/guilds.api";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { IGuildUsersFilter } from "../../../../../core/models/guild-users-filter.model";

interface IPropTypes {
  // toggleAdd: (val: boolean) => void;
  isAdmin?: boolean;
}

const GuildUsersList: FC<IPropTypes> = ({ isAdmin }) => {
  const { id } = useParams<{ id: string }>();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);

  //const [state,setState] = useState([])

  const allProvinceUserGuildMutation =
    useGetUserProvinceGuildRoomsByProvinceId();

  useEffect(() => {
    allProvinceUserGuildMutation.mutate({
      page: 1,
      pageSize: pageSize,
      provinceId: parseInt(id),
      userRole: 0,
    });
  }, [refetchEvent.provinceGuildUser, pageSize]);

  useEffect(() => {
    if (
      allProvinceUserGuildMutation.data &&
      allProvinceUserGuildMutation.data.data.result
    ) {
      let newState: any = [];
      allProvinceUserGuildMutation.data.data.result.provinceGuildRooms.forEach(
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

  return (
    <Card>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: IGuildUsersFilter = {
            userNationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            userRole: value.userRole ? value.userRole.value : 0,
            provinceId: parseInt(id),
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
                    provinceId: parseInt(id),
                    userRole: 0,
                  });
                }}
                tableData={tableData}
                pageCountList={pageCountList}
                customPageSize={pageSize}
                setPageSize={(val: any) => setPageSize(val)}
                getCustomProps={{ isAdmin: isAdmin }}
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
