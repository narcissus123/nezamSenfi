import React, { FC, useContext, useEffect, useState } from "react";
import { CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

import { columns } from './Columns' 
import { useHistory } from "react-router-dom";
import { useGetAllCountyByProvinceId, useGetAllprovinceByMainLocationId, useGetAllprovinces } from "../../../../../core/services/api";
import { useGetCountyGuildRoomsByProvinceId, usePostGetAllCountyGuildRoomsByFilterForMainLocationAdmin } from "../../../../../core/services/api";
import { EditModal } from "./EditModal/EditModal";
import { SelectOption } from "../../../../common/SelectOption/SelectOption";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";


const AdminCountyList: FC = () => {
  const history = useHistory();

  const [state, setState] = useState([]);
  const [pageCountList, setPageCount] = useState(0);
  const [pageSize , setPageSize] = useState<any>(10)
  const [showEditModal , setShowEditModal] = useState<any>(false)
  const [selectedUser , setSelectedUser] = useState<any>(null)
  const [provinceId , setProvinceId] = useState<any>(null)
  const [countyId , setCountyId] = useState<any>(null)

  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedCounty, setSelectedCounty] = useState<any>(null);
  const [currentUserProvinces, setCurrentUserProvinces] = useState<any>([]);
  const [currentUserCounties, setCurrentUserCounties] = useState<any>([]);

  const {data , isSuccess , isFetching} = useGetAllprovinces()
  const getCountiesMutation = useGetAllCountyByProvinceId()

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );

   useEffect(()=>{
     if(data){
       let queryData : any = data
        let newOptions : any = []
       let newProvinces = [
         {
           label: "سرلیست استان",
           options: [],
         },
      ];
       
       queryData.data.result.forEach((row : any)=>{
         newOptions.push({id : row.id , title : row.title})
       })
       newProvinces[0].options = newOptions
       setCurrentUserProvinces(newProvinces);
     }
   },[isSuccess , data])

  const pmutation = useGetAllprovinceByMainLocationId();


  const allCountyGuildMutation = usePostGetAllCountyGuildRoomsByFilterForMainLocationAdmin()
  const allCountiesMutation = useGetAllCountyByProvinceId()


  useEffect(()=>{
    if(allCountiesMutation.data){
      let queryData : any = allCountiesMutation.data
       let newOptions : any = []
      let newCounties = [
        {
          label: "سرلیست شهرستان ها",
          options: [],
        },
     ];
      
      queryData.data.result.forEach((row : any)=>{
        newOptions.push({id : row.id , title : row.title})
      })
      newCounties[0].options = newOptions
      setCurrentUserCounties(newCounties);
    }
  },[allCountiesMutation.isSuccess , allCountiesMutation.data])

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

   useEffect(() => {

     allCountyGuildMutation.mutate({
       page: 1,
       pageSize: pageSize,
       provinceId: 0,
       countyId : 0
     });

   }, [refetchEvent.countyGuildList, , pageSize]);

  useEffect(() => {
    if( allCountyGuildMutation.data && allCountyGuildMutation.data.data.result ){
      let newState : any = []
      allCountyGuildMutation.data.data.result.countyGuildRooms.forEach(
        (row: any) => {
          newState.push({
            id: row.id,
            name: row.countyTitle,
            guild: row.title,
            description: row.description,
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
        <CardTitle>لیست اصناف شهرستانی</CardTitle>
        <div className="" style={{ width: "300px" }}></div>
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
            allCountyGuildMutation.isLoading || getRoomsByProvinceId.isLoading
          }
          onPageChange={({ page, pageSize }) => {

              allCountyGuildMutation.mutate({
                page: page,
                pageSize: pageSize,
                provinceId: selectedProvince
                  ? parseInt(selectedProvince.id)
                  : 0,
                countyId: selectedCounty ? parseInt(selectedCounty.id) : 0,
              });
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
              <Row>
                <Col sm="4" style={{ width: "400px" }}>
                  <SelectOption
                    isClearable={true}
                    onChange={(value) => {
                      setSelectedProvince(value);
                      if (value) {
                        allCountyGuildMutation.mutate({
                          page: 1,
                          pageSize: pageSize,
                          provinceId: parseInt(value.id),
                          countyid : 0
                        });
                        allCountiesMutation.mutate(value.id)
                      } else {
                        setSelectedCounty(null)
                        setCurrentUserCounties([])
                        allCountyGuildMutation.mutate({
                          page: 1,
                          pageSize: pageSize,
                          provinceId: 0,
                          countyId : 0
                        });
                      }
                    }}
                    selectType={1}
                    selectedOption={selectedProvince}
                    options={currentUserProvinces}
                    placeholder="استان ... "
                    loading={isFetching}
                  />
                </Col>
                <Col sm="4" style={{ width: "400px" }}>
                  <SelectOption
                    isClearable={false}
                    onChange={(value) => {
                      setSelectedCounty(value);
                       if (value) {
                         allCountyGuildMutation.mutate({
                           page: 1,
                           pageSize: pageSize,
                          provinceId: parseInt(selectedProvince.id),
                          countyId: parseInt(value.id)
                      });
                       } else {
                        allCountyGuildMutation.mutate({
                          page: 1,
                          pageSize: pageSize,
                          provinceId: parseInt(selectedProvince.id),
                          countyId: 0,
                        });
                       }
                    }}
                    selectType={1}
                    selectedOption={selectedCounty}
                    options={currentUserCounties}
                    placeholder="شهرستان ... "
                    loading={allCountiesMutation.isLoading}
                  />
                </Col>
              </Row>
            ),
          }}
        </ListTable>
      </CardBody>
    </>
  );
};

export { AdminCountyList };
