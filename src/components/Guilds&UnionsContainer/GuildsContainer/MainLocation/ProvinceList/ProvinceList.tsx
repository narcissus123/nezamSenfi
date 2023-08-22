import React, { FC, useEffect, useState } from "react";

import { columns } from "./Columns";
import { useHistory } from "react-router-dom";
import { useGetAllprovinceByMainLocationId } from "../../../../../core/services/api/location.api";
import { EditModal } from "./EditModal/EditModal";
import { useGetAllProvinceGuildRoomsByFilter } from "../../../../../core/services/api/guilds.api";
import { ListTable } from "../../../../common/ListTable/ListTable";

interface IPropTypes {
  fetchRefresh: boolean;
  setFetchRefresh: () => void;
}

const ProvinceList: FC<IPropTypes> = ({ fetchRefresh, setFetchRefresh }) => {
  const history = useHistory();

  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [pageSize, setPageSize] = useState<any>(10);

  const pmutation = useGetAllprovinceByMainLocationId();

  const allProvinceGuildMutation = useGetAllProvinceGuildRoomsByFilter();

  useEffect(() => {
    allProvinceGuildMutation.mutate({ page: 1, pageSize: pageSize });
  }, [fetchRefresh , pageSize]);

  useEffect(() => {
    if (
      allProvinceGuildMutation.data &&
      allProvinceGuildMutation.data.data.result
    ) {
      let newState: any = [];
      allProvinceGuildMutation.data.data.result.provinceGuildRooms.forEach(
        (row: any) => {
          newState.push({
            id: row.id,
            name: row.proviceTitle,
            provinceDescription: row.description,
            title: row.title,
          });
        }
      );
      setState(newState);
      setPageCount(
        Math.ceil(
          allProvinceGuildMutation.data.data.result.totalCount / pageSize
        )
      );
    }
  }, [allProvinceGuildMutation.isSuccess]);

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );

  return (
    <>
      <EditModal
        setFetchRefresh={setFetchRefresh}
        backdrop={true}
        currentId={selectedUser}
        data={state}
        isOpen={showEditModal}
        toggleModal={() => setShowEditModal((val: any) => !val)}
      />

      <ListTable
        columns={columns}
        isLoading={allProvinceGuildMutation.isLoading}
        onPageChange={({ page, pageSize }) => {
          allProvinceGuildMutation.mutate({ page: page, pageSize: pageSize });
        }}
        tableData={state}
        pageCountList={pageCountList}
        customPageSize={pageSize}
        setPageSize={(val: any) => setPageSize(val)}
        getCustomProps={{
          mutation: pmutation,
          setShowEditModal: setShowEditModal,
          setSelectedUser: setSelectedUser,
        }}
      >
        {{
          headerTable: <div style={{ width: "200px" }}></div>,
        }}
      </ListTable>
    </>
  );
};

export { ProvinceList };
