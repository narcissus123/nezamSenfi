import React, { useEffect, useState } from "react";

import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { CardWrapper } from "../../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { OwnedSearch } from "../OwnedSearch";

export interface IPropsType {
  useMutate: any;
  useOwnedProvinceGuildRooms?: any;
  columns: any;
  isAllGuildRoom?: boolean;
  getCustomProps?: any;
  getAllProvince?: any;
  getAllCounty?: any;
  isUnion?: boolean;
}

const SecretariatList: React.FC<IPropsType> = ({
  useMutate,
  useOwnedProvinceGuildRooms,
  columns,
  isAllGuildRoom = false,
  getCustomProps,
  getAllCounty,
  getAllProvince,
  isUnion,
}) => {
  const [initialPage, setInitialPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const [filterState, setFilterState] = useState<any>({
    name: "",
    nationalId: "",
    cityId: 0,
    status: 0,
    provinceId: 0,
    countyId: 0,
  });

  useEffect(() => {
    if (getAllProvince && getAllProvince.data && getAllProvince.data.data) {
      const provinceId =
        getAllProvince.data.data.result.length > 0
          ? getAllProvince.data.data.result[0].id
          : 0;
      if (!isAllGuildRoom) {
        setFilterState((old: any) => ({ ...old, provinceId: provinceId }));
      }
    }
  }, [getAllProvince ? getAllProvince.isSuccess : false]);

  
  useEffect(() => {
    if (useOwnedProvinceGuildRooms && useOwnedProvinceGuildRooms.data && useOwnedProvinceGuildRooms.data.data) {
      const provinceId =
        useOwnedProvinceGuildRooms.data.data.result.length > 0
          ? useOwnedProvinceGuildRooms.data.data.result[0].id
          : 0;
      
      setFilterState((old: any) => ({ ...old, provinceId: provinceId }));
    }
  }, [useOwnedProvinceGuildRooms ? useOwnedProvinceGuildRooms.isSuccess : false]);

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
        newPositionList.push(item);
      });

      setTableData(newPositionList);
      setPageCount(Math.ceil(useMutate.data.data.result.totalCount / pageSize));
    }
  }, [useMutate.isSuccess]);

  const onSearch = (searchObj: any) => {
    let newSearchFilter = {};
    setFilterState((old: any) => {
      newSearchFilter = {
        ...old,
        provinceId: searchObj.province ? searchObj.province.value : 0,
        countyId: searchObj.county ? searchObj.county.value : 0,
        name: searchObj.name ? searchObj.name : "",
        nationalId: searchObj.nationalId ? searchObj.nationalId : "",
        status: searchObj.status ? searchObj.status.value : 0,
        cityId: 0,
        page: 1,
        pageSize: pageSize,
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
          ownedProvince={
            getAllProvince ? getAllProvince : useOwnedProvinceGuildRooms
          }
          isAllGuildRoom={isAllGuildRoom}
          onSearch={onSearch}
          isLoading={useMutate.isLoading}
          allCounty={getAllCounty}
        />
      </CardWrapper>
      <CardWrapper text={`لیست درخواست های ${isUnion ? "اتحادیه" : "صنف"}`}>
        <ListTable
          isLoading={
            (getAllProvince && getAllProvince.isLoading) ||
            useMutate.isLoading ||
            (useOwnedProvinceGuildRooms && useOwnedProvinceGuildRooms.isLoading)
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

export { SecretariatList };
