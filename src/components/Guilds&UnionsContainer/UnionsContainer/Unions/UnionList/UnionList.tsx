
import React, { FC, useEffect, useState } from "react";
import { CardBody, CardHeader, CardTitle} from "reactstrap";

import { columns } from './Columns' 
import { useHistory } from "react-router-dom";
import { EditModal } from "./EditModal/EditModal";
import { SelectOption } from "../../../../common/SelectOption/SelectOption";
import { useGetCountyUnionByCountyId } from "../../../../../core/services/api";
import { ListTable } from "../../../../common/ListTable/ListTable";


interface IPropTypes {
  fetchRefresh:boolean
  setFetchRefresh : () => void
  unionsQuery : any
}

const UnionList: FC<IPropTypes> = ({ fetchRefresh , setFetchRefresh , unionsQuery}) => {
  const history = useHistory();

  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [showEditModal , setShowEditModal] = useState<any>(false)
  const [selectedUser , setSelectedUser] = useState<any>(null)
  const [pageSize , setPageSize] = useState<any>(10)

  const [countyList, setCountyList] = useState<any>([]);
  const [countyId, setCountyId] = useState<any>(null);
  const [selectedUserType, setSelectedUserType] = useState<any>(null);

  const CountyUnionsByCountyIdMutation = useGetCountyUnionByCountyId()

  useEffect(()=>{
    if(unionsQuery.data){
      let queryData : any = unionsQuery.data
       let newOptions : any = []
      let newCounties = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];
       
      queryData.data.result.forEach((row : any)=>{
        newOptions.push({id : row.id , title : row.countyTitle})
      })
      newCounties[0].options = newOptions
      setCountyList(newCounties);
      if(queryData.data.result[0]){
        setSelectedUserType({
          id: queryData.data.result[0].id,
          title: queryData.data.result[0].countyTitle,
        });
        // 
        // 
      }
      
    }
  },[unionsQuery.isSuccess , unionsQuery.data])

  // const pmutation = useGetAllprovinceByMainLocationId();

  // const allProvinceGuildMutation = useGetAllProvinceGuildRoomsByFilter()

   useEffect(()=>{
     if(unionsQuery.data && unionsQuery.data.data.result){
       if(unionsQuery.data.data.result[0]){
         CountyUnionsByCountyIdMutation.mutate({
           page: 1,
           pageSize: pageSize,
           countyId: countyId ? countyId : unionsQuery.data.data.result[0].id,
         });
         setCountyId(unionsQuery.data.data.result[0].id)
       }
       
     }
    
  },[fetchRefresh , unionsQuery.data , pageSize  ])

   useEffect(() => {
     if( CountyUnionsByCountyIdMutation.data && CountyUnionsByCountyIdMutation.data.data.result ){
       let newState : any = []
       CountyUnionsByCountyIdMutation.data.data.result.unions.forEach((row:any)=>{
         newState.push({
           id: row.id,
           name: row.unionTitle,
           status: row.statusTitle,
           countyName : row.countyTitle
         });
      })
       setState(newState)
       setPageCount(Math.ceil(CountyUnionsByCountyIdMutation.data.data.result.totalCount / pageSize))
     }
   }, [CountyUnionsByCountyIdMutation.isSuccess , CountyUnionsByCountyIdMutation.data]);


  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );

  
  return (
    <>
      <CardHeader>
        <CardTitle>لیست اتحادیه ها</CardTitle>
        <div className="" style={{ width: "200px" }}></div>
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
          columns={columns}
          isLoading={
            CountyUnionsByCountyIdMutation.isLoading ||
            unionsQuery.isFetching
          }
          onPageChange={({ page, pageSize }) => {
            CountyUnionsByCountyIdMutation.mutate({
              page: page,
              pageSize: pageSize,
              countyId: countyId,
            });
          }}
          tableData={state}
          pageCountList={pageCountList}
          customPageSize={pageSize}
          setPageSize={(val: any) => setPageSize(val)}
        >
          {{
            headerTable: (
              <div style={{ width: "200px" }}>
                <SelectOption
                  loading={unionsQuery.isLoading}
                  isClearable={false}
                  onChange={(value) => {
                    
                    setSelectedUserType(value);
                    if (value) {
                      CountyUnionsByCountyIdMutation.mutate({
                        page: 1,
                        pageSize: pageSize,
                        countyId: value.id,
                      });
                      setCountyId(value.id);
                    }
                  }}
                  selectType={1}
                  selectedOption={selectedUserType}
                  options={countyList}
                  placeholder="شهرستان ... "
                />
              </div>
            ),
          }}
        </ListTable>
      </CardBody>
    </>
  );
};

export { UnionList };
