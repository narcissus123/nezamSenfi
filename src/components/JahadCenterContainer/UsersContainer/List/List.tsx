import React, { FC, useContext, useEffect, useState } from "react";
import {Card} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { ListFilter } from "./ListFilter/ListFilter";
import { ListTable } from "../../../common/ListTable/ListTable";
import { Formik , Form } from "formik";
import { useGetUserJahadCenterByJahadCenterId } from "../../../../core/services/api/jahad-center.api";
import { refetchContext } from "../../../../core/utils/context/EventContext";


interface IPropTypes {
  // toggleAdd: (val: boolean) => void;
  isAdmin ?  : boolean
}

const List: FC<IPropTypes> = ({ isAdmin }) => {
  
  const {id} = useParams<{id:string}>();

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize , setPageSize] = useState<any>(10)

  //const [state,setState] = useState([])

  const getMutation = useGetUserJahadCenterByJahadCenterId()

  useEffect(()=>{
    getMutation.mutate({page : 1 , pageSize:pageSize , jahadCenterId:parseInt(id) , userRole : 0})
  },[refetchEvent.jahadCenterUsers , pageSize])

  useEffect(() => {
    if( getMutation.data && getMutation.data.data.result ){
      let newState : any = []
      getMutation.data.data.result.users.forEach((row:any)=>{
        let newRoles = ''
        row.roles.forEach((role : any)=>{
          newRoles += `${role},`
        })
        newState.push({
          id: row.userId,
          name: `${row.userFirstName} ${row.userLastName}`,
          userNationalCode: row.userNationalCode ? row.userNationalCode :'نامشخص',
          role :newRoles ,
        });
      })
      setTableData(newState)
      setPageCount(Math.ceil(getMutation.data.data.result.totalCount / pageSize))
    }
  }, [getMutation.isSuccess]);

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );

  const history = useHistory();
  const [filterState,setFilterState] = useState<any>({
    userNationalCode:"",
    name:"",
    page:1,
    pageSize:pageSize,
    userRole: null
  })

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
            jahadCenterId: parseInt(id),
          };
          getMutation.mutate(obj);
        }}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <ListTable
                columns={columns}
                isLoading={getMutation.isLoading}
                onPageChange={({ page, pageSize }) => {
                  getMutation.mutate({
                    page: page,
                    pageSize: pageSize,
                    jahadCenterId: parseInt(id),
                    userRole: 0,
                  });
                }}
                tableData={tableData}
                pageCountList={pageCountList}
                customPageSize={pageSize}
                setPageSize={(val: any) => setPageSize(val)}
                getCustomProps={{isAdmin:isAdmin}}
              >
                {{
                  headerTable: (
                    <div
                      className="d-flex flex-wrap justify-content-left"
                      style={{ width: "100%" }}
                    >
                      <ListFilter
                        getMutation={getMutation}
                      />
                    </div>
                  ),
                }}
              </ListTable>
            </Form>
          </>
        )}
      </Formik>
    </Card>
  );
};

export { List };
