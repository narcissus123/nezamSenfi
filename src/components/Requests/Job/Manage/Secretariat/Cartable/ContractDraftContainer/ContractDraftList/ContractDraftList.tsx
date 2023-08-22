import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { ListTable } from "../../../../../../../common/ListTable/ListTable";

import { columns } from "./Columns";

interface IPropsType {
  formData: any;
  setFormData: any;
}

const ContractDraftList: React.FC<IPropsType> = ({ formData, setFormData }) => {
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);
  const [pageSize, setPageSize] = useState<any>(100);

  // const getListMutation  = usePostGetMyCountyPositionRequestsByFilter();
  // const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  // useEffect(() => {
  //   getListMutation.mutate({ page:1, pageSize:pageSize})
  // }, [ refetchEvent.countyJobRequestList , pageSize ]);

  // useEffect(() => {
  //   if (getListMutation.data) {
  //     const result = getListMutation.data.data.result.items;

  //     let tableData:any = [];

  //     result.forEach((item: any) => {
  //       tableData.push({ id: item.id, statusTitle: item.statusTitle, statusId: item.status , county : item.countyTitle ,createDate: item.createDate });
  //     });
  //     setState(tableData);
  //     setPageCount(Math.ceil(getListMutation.data.data.result.totalCount / pageSize))
  //   }
  // }, [getListMutation.isSuccess,getListMutation.data]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>لیست ضمانت نامه ها</CardTitle>
        </CardHeader>
        <CardBody>
          <ListTable
            customPageSize={pageSize}
            isLoading={false} //getListMutation.isLoading}
            columns={columns}
            pageCountList={pageCountList}
            tableData={formData}
            initialPage={initialPage}
            setInitialPage={setInitialPage}
            getCustomProps={{ setFormData, formData }}
            onPageChange={({ page, pageSize }: any) => {}}
          >
            {{
              headerTable: <div style={{ width: "200px" }}></div>,
            }}
          </ListTable>
        </CardBody>
      </Card>
    </>
  );
};

export { ContractDraftList };
