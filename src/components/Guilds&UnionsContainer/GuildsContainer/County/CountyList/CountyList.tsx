import React, { FC, useContext, useEffect, useState } from "react";
import { CardBody, CardHeader, CardTitle } from "reactstrap";

import { columns } from './Columns' 
import { useHistory } from "react-router-dom";

import { useGetAllprovinceByMainLocationId } from "../../../../../core/services/api";
import { useGetCountyGuildRoomsByProvinceId, usePostGetAllCountyGuildRoomsByFilter } from "../../../../../core/services/api";
import { EditModal } from "./EditModal";
import { SelectOption } from "../../../../common/SelectOption/SelectOption";
import { UseQueryResult } from "react-query";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";

interface IPropTypes {
  provinceQuery:UseQueryResult
}

const CountyList: FC<IPropTypes> = ({ provinceQuery}) => {
  const history = useHistory();

  const [state, setState] = useState([]);
  const [pageCountList, setPageCount] = useState(0);
  const [pageSize , setPageSize] = useState<any>(10)
  const [showEditModal , setShowEditModal] = useState<any>(false)
  const [selectedUser , setSelectedUser] = useState<any>(null)
  const [provinceId , setProvinceId] = useState<any>(null)

  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [currentUserProvinces, setCurrentUserProvinces] = useState<any>([]);

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );

  useEffect(()=>{
    if(provinceQuery.data){
      let queryData : any = provinceQuery.data
       let newOptions : any = []
      let newProvinces = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];
       
      queryData.data.result.forEach((row : any)=>{
        newOptions.push({id : row.id , title : row.proviceTitle})
      })
      newProvinces[0].options = newOptions
      setSelectedProvince({id: queryData.data.result[0].id , title : queryData.data.result[0].proviceTitle })
      
      setCurrentUserProvinces(newProvinces);
    }
  },[provinceQuery.isSuccess , provinceQuery.data])

  const pmutation = useGetAllprovinceByMainLocationId();

  const allCountyGuildMutation = usePostGetAllCountyGuildRoomsByFilter()
  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  useEffect(()=>{

    if (provinceQuery.data) {
      let queryData : any = provinceQuery.data
      if (queryData.data.result[0]) {
        allCountyGuildMutation.mutate({
          page: 1,
          pageSize: pageSize,
          provinceId: provinceId ? provinceId : parseInt(queryData.data.result[0].id),
        });
        setProvinceId(queryData.data.result[0].id)
      }
    }
  },[ refetchEvent.countyGuildList , provinceQuery.data , pageSize ])

  useEffect(() => {
    if( allCountyGuildMutation.data && allCountyGuildMutation.data.data.result ){
      let newState : any = []
      allCountyGuildMutation.data.data.result.countyGuildRooms.forEach(
        (row: any) => {
          newState.push({
            id: row.id,
            name: row.countyTitle,
            countyDescription: row.description,
            status: row.statusTitle,
            title: row.title,
          });
        }
      );
      setState(newState)
      setPageCount(Math.ceil(allCountyGuildMutation.data.data.result.totalCount / pageSize))
    }
  }, [allCountyGuildMutation.isSuccess ]);

  const getRoomsByProvinceId = useGetCountyGuildRoomsByProvinceId()


  return (
    <>
      <CardHeader>
        <CardTitle>لیست اصناف</CardTitle>
        <div className="" style={{ width: "200px" }}></div>
      </CardHeader>
      <CardBody>
        <EditModal
          backdrop={true}
          currentId={selectedUser}
          data={state}
          isOpen={showEditModal}
          toggleModal={() => setShowEditModal((val: any) => !val)}
        />

        <ListTable
          columns={columns}
          isLoading={
            allCountyGuildMutation.isLoading || getRoomsByProvinceId.isLoading || provinceQuery.isLoading
          }
          onPageChange={({ page, pageSize }) => {
            if (provinceId) {
              allCountyGuildMutation.mutate({
                page: page,
                pageSize: pageSize,
                provinceId: parseInt(provinceId),
              });
            }
          }}
          tableData={state}
          pageCountList={pageCountList}
          getCustomProps={{
            mutation: pmutation,
            setShowEditModal: setShowEditModal,
            setSelectedUser: setSelectedUser,
          }}
          customPageSize={pageSize}
          setPageSize={(val: any) => setPageSize(val)}
        >
          {{
            headerTable: (
              <div  
                style={{ width: "200px" }}
              >
                <SelectOption
                  isClearable={false}
                  onChange={(value) => {
                    setSelectedProvince(value);
                    if (value) {
                      allCountyGuildMutation.mutate({
                        page: 1,
                        pageSize: pageSize,
                        provinceId: parseInt(value.id),
                      });
                    } else {
                    }
                  }}
                  selectType={1}
                  selectedOption={selectedProvince}
                  options={currentUserProvinces}
                  placeholder="استان ... "
                  loading={provinceQuery.isLoading}
                />
              </div>
            ),
          }}
        </ListTable>
      </CardBody>
    </>
  );
};

export { CountyList };
