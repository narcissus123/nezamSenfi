import React, { useEffect, useState } from "react";

import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { CardWrapper } from "../../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { OwnedSearch } from "../OwnedSearch/OwnedSearch";

export interface IPropsType {
  useMutate: any;
  useOwnedProvinceGuildRooms?: any;
  useOwnCountyGuildRooms?: any;
  useOwUnionGuildRooms?: any;
  columns: any;
  isAllGuildRoom?: boolean;
  getCustomProps?: any;
  getOwnedMainLocationGuildRoom?: any;
  getLocationListMutation?: any;
}

const ManagerList: React.FC<IPropsType> = ({
  useMutate,
  useOwUnionGuildRooms,
  useOwnedProvinceGuildRooms,
  useOwnCountyGuildRooms,
  columns,
  isAllGuildRoom = false,
  getCustomProps,
  getOwnedMainLocationGuildRoom,
  getLocationListMutation,
}) => {
  const [initialPage, setInitialPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const [filterState, setFilterState] = useState<any>({
    certificateExaminationStatus: 0,
    employmentLicenseStatus: 0,
    endCreateDate: "",
    historyOfServiceAfterGraduation: 0,
    provinceId: 0,
    ratingStatus: 0,
    ratingTitle: "",
    startCreateDate: "",
    status: 0,
    tradeUnionLicenseStatus: 0,
    userId: 0,
    countyId: 0,
    countyUnionId: 0,
    page: 1,
    pageSize: pageSize,
    userNationalCode: "",
    mainLocationId: 1,
  });

  useEffect(() => {
    if (
      useOwnedProvinceGuildRooms &&
      useOwnedProvinceGuildRooms.data &&
      useOwnedProvinceGuildRooms.data.data
    ) {
      const provinceId =
        useOwnedProvinceGuildRooms.data.data.result.length > 0
          ? useOwnedProvinceGuildRooms.data.data.result[0].id
          : 0;
      setFilterState((old: any) => ({ ...old, provinceId: provinceId }));
    }
  }, [
    useOwnedProvinceGuildRooms ? useOwnedProvinceGuildRooms.isSuccess : false,
  ]);

  useEffect(() => {
    if (
      getOwnedMainLocationGuildRoom &&
      getOwnedMainLocationGuildRoom.isSuccess
    ) {
      const provinceId = getOwnedMainLocationGuildRoom.data.data.result[0].id;
      console.log(provinceId);

      setFilterState((old: any) => ({ ...old, mainLocationId: provinceId }));
    }
  }, [
    getOwnedMainLocationGuildRoom
      ? getOwnedMainLocationGuildRoom.isSuccess
      : false,
  ]);

  useEffect(() => {
    if (useOwnCountyGuildRooms && useOwnCountyGuildRooms.isSuccess) {
      const countyId =
        useOwnCountyGuildRooms.data.data.result.length > 0
          ? useOwnCountyGuildRooms.data.data.result[0].id
          : 0;
      setFilterState((old: any) => ({ ...old, countyId: countyId }));
    }
  }, [useOwnCountyGuildRooms ? useOwnCountyGuildRooms.isSuccess : false]);

  useEffect(() => {
    if (useOwUnionGuildRooms && useOwUnionGuildRooms.isSuccess) {
      try {
        const countyUnionId =
          useOwUnionGuildRooms.data.data.result.unions.length > 0
            ? useOwUnionGuildRooms.data.data.result.unions[0].id
            : 0;
        setFilterState((old: any) => ({
          ...old,
          countyUnionId: countyUnionId,
        }));
      } catch (e) {}
    }
  }, [useOwUnionGuildRooms ? useOwUnionGuildRooms.isSuccess : false]);

  useEffect(() => {
    if (!firstRender) {
      useMutate.mutate({ ...filterState, page: 1, pageSize: pageSize });
    } else setFirstRender(false);
  }, [pageSize]);

  useEffect(() => {
    if (useMutate.data && useMutate.data.data) {
      const positionList = useMutate.data.data.result;

      let newPositionList: any = [];
      positionList.items.forEach((item: any) => {
        newPositionList.push({
          id: item.id,
          userId: item.userId,
          province: item.provinceTitle,
          county: item.countyTitle,
          createDate: item.createDate,
          countyUnionId: item.countyUnionId,
          statusTitle: item.statusTitle,
          status: item.status,
          userFullName: item.userFirstName + " " + item.userLastName,
          userNationalCode: item.userNationalCode,
          union: item.unionTitle,
          mainLocationTitle: item.mainLocationTitle,
          unionTitle: item.unionTitle ? item.unionTitle : "",
        });
      });

      setTableData(newPositionList);
      setPageCount(Math.ceil(useMutate.data.data.result.totalCount / pageSize));
    }
  }, [useMutate.isSuccess]);

  const onSearch = (searchObj: any) => {
    let newSearchFilter = {};
    console.log(searchObj.mainLocationId);

    setFilterState((old: any) => {
      newSearchFilter = {
        ...old,
        provinceId: searchObj.province ? searchObj.province.value : 0,
        countyId: searchObj.county ? searchObj.county.value : 0,
        countyUnionId: searchObj.union ? searchObj.union.value : 0,
        //mainLocationId: searchObj.mainLocationId ? searchObj.mainLocationId : 0,
        startCreateDate: searchObj.startCreateDate
          ? searchObj.startCreateDate
          : "",
        endCreateDate: searchObj.endCreateDate ? searchObj.endCreateDate : "",
        userNationalCode: searchObj.userNationalCode
          ? searchObj.userNationalCode
          : "",
        page: 1,
        employmentLicenseStatus: searchObj.employmentLicenseStatus
          ? searchObj.employmentLicenseStatus.value
          : 0,
        ratingStatus: searchObj.ratingStatus ? searchObj.ratingStatus.value : 0,
        historyOfServiceAfterGraduation:
          searchObj.historyOfServiceAfterGraduation
            ? searchObj.historyOfServiceAfterGraduation.value
            : 0,
        ratingTitle: searchObj.ratingTitle,
        status: searchObj.status ? searchObj.status.value : 0,
      };
      return newSearchFilter;
    });

    useMutate.mutate(newSearchFilter);
    setInitialPage(0);
  };

  return (
    <>
      <CardWrapper text="جستجو">
        <OwnedSearch
          getLocationListMutation={getLocationListMutation}
          ownedProvince={useOwnedProvinceGuildRooms}
          isAllGuildRoom={isAllGuildRoom}
          onSearch={onSearch}
          ownedCounty={useOwnCountyGuildRooms}
          ownedUnion={useOwUnionGuildRooms}
          ownedMainLocation={getOwnedMainLocationGuildRoom}
          isLoading={
            (useOwUnionGuildRooms && useOwUnionGuildRooms.isLoading) ||
            (useOwnCountyGuildRooms && useOwnCountyGuildRooms.isLoading) ||
            (useOwnedProvinceGuildRooms &&
              useOwnedProvinceGuildRooms.isLoading) ||
            (getOwnedMainLocationGuildRoom &&
              getOwnedMainLocationGuildRoom.isLoading) ||
            useMutate.isLoading
          }
        />
      </CardWrapper>
      <CardWrapper text="لیست درخواست های شغل">
        <ListTable
          isLoading={
            (useOwUnionGuildRooms && useOwUnionGuildRooms.isLoading) ||
            (useOwnCountyGuildRooms && useOwnCountyGuildRooms.isLoading) ||
            (useOwnedProvinceGuildRooms &&
              useOwnedProvinceGuildRooms.isLoading) ||
            (getOwnedMainLocationGuildRoom &&
              getOwnedMainLocationGuildRoom.isLoading) ||
            (getLocationListMutation && getLocationListMutation.isLoading) ||
            useMutate.isLoading
          }
          columns={columns}
          pageCountList={pageCount}
          tableData={tableData}
          onPageChange={({ page, pageSize }) => {
            useMutate.mutate({
              ...filterState,
              page: page,
              pageSize: pageSize,
            });
            setFilterState((old: any) => ({ ...old, page: page }));
          }}
          initialPage={initialPage}
          setInitialPage={setInitialPage}
          getCustomProps={getCustomProps}
          customPageSize={pageSize}
          setPageSize={(val: any) => setPageSize(val)}
        >
          {{ headerTable: <p></p> }}
        </ListTable>
      </CardWrapper>
    </>
  );
};

export { ManagerList };
