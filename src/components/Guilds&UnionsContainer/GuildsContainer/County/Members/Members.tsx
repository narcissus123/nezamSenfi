import React, { FC, useState } from "react";
import { Card } from "reactstrap";
import { CountyList } from "./CountyList/CountyList";

interface IPropTypes {
  // toggleAdd: (val: boolean) => void;
}

const Members: FC<IPropTypes> = ({}) => {

  const [fetchRefresh , setFetchRefresh] = useState<boolean>(false)
  
  // const { id } = useParams<{ id: string }>();

  // const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  // const [tableData, setTableData] = useState([]);

  // const [pageCountList, setPageCount] = useState<any>(0);
  // const [pageSize, setPageSize] = useState<any>(10);
  // const [countyId, setCountyId] = useState<any>(null);

  // const [countyList, setCountyList] = useState<any>([
  //   {
  //     label: "لیست استان ها",
  //     options: [],
  //   },
  // ]);

  // const [filterState, setFilterState] = useState<any>({
  //   userNationalCode: "",
  //   name: "",
  //   page: 1,
  //   pageSize: pageSize,
  //   userRole: null,
  //   county: null,
  // });

  // //const [state,setState] = useState([])

  // const allCountyUserGuildMutation = useGetUserCountyGuildRoomsByCountyId();
  // const {
  //   isLoading,
  //   isSuccess,
  //   data,
  //   isFetching,
  // } = useGetOwnedUserCountyGuildRooms();

  // useEffect(() => {
  //   if (data) {
  //     let queryData: any = data;
  //     let newOptions: any = [];
  //     let newCounties = [
  //       {
  //         label: "سرلیست استان",
  //         options: [],
  //       },
  //     ];

  //     queryData.data.result.forEach((row: any) => {
  //       newOptions.push({ value: row.id, label: row.title });
  //     });
  //     try {
  //       newCounties[0].options = newOptions;
  //       setFilterState({
  //         ...filterState,
  //         county: {
  //           value: data.data.result[0].id,
  //           label: data.data.result[0].title,
  //         },
  //       });
  //       setCountyList(newCounties);
  //     } catch (error) {}
  //   }
  // }, [isSuccess, data]);

  // useEffect(() => {
  //   if (data && data.data.result) {
  //     if (data.data.result[0]) {
  //       allCountyUserGuildMutation.mutate({
  //         page: 1,
  //         pageSize: pageSize,
  //         countyId: parseInt(data.data.result[0].id),
  //         userRole: 0,
  //       });
  //       setCountyId(data.data.result[0].id);
  //     }
  //   }
  // }, [data, pageSize]);

  // useEffect(() => {
  //   if (
  //     allCountyUserGuildMutation.data &&
  //     allCountyUserGuildMutation.data.data.result
  //   ) {
  //     let newState: any = [];
  //     allCountyUserGuildMutation.data.data.result.countyGuildRooms.forEach(
  //       (row: any) => {
  //         let newRoles = "";
  //         row.roles.forEach((role: any) => {
  //           newRoles += `${role},`;
  //         });
  //         newState.push({
  //           id: row.userId,
  //           name: `${row.userFirstName} ${row.userLastName}`,
  //           userNationalCode: row.userNationalCode
  //             ? row.userNationalCode
  //             : "نامشخص",
  //           role: newRoles,
  //         });
  //       }
  //     );
  //     setTableData(newState);
  //     setPageCount(
  //       Math.ceil(
  //         allCountyUserGuildMutation.data.data.result.totalCount / pageSize
  //       )
  //     );
  //   }
  // }, [allCountyUserGuildMutation.isSuccess]);

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     maxWidth: 400,
  //   }),
  //   []
  // );

  // const history = useHistory();

  return (
    <Card>
      <CountyList setFetchRefresh={()=>{ setFetchRefresh((val:any) => !val)}} fetchRefresh={fetchRefresh} />
      {/* <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: IGuildCountyUsersFilter = {
            userNationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            userRole: value.userRole ? value.userRole.value : 0,
            countyId: value.county.value,
          };
          allCountyUserGuildMutation.mutate(obj);
        }}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <Row className="d-flex align-items-start clearfix">
                <Col lg="3" className="float-left">
                  <BasicSelectOption
                    name="county"
                    lableText="شهرستان"
                    placeHolder="انتخاب کنید..."
                    data={countyList}
                    isClearable={false}
                    isLoading={isFetching}
                    onChange={(opt, e) => {
                      setFieldValue("county", {
                        value: opt.value,
                        label: opt.label,
                      });
                      const obj: IGuildCountyUsersFilter = {
                        userNationalCode: values.userNationalCode,
                        name: values.name,
                        page: 1,
                        pageSize: pageSize,
                        userRole: values.userRole ? values.userRole.value : 0,
                        countyId: opt.value,
                      };
                      allCountyUserGuildMutation.mutate(obj);
                    }}
                  />
                </Col>
                <ListFilter
                  allCountyUserGuildMutation={allCountyUserGuildMutation}
                />
              </Row>
            </Form>
          </>
        )}
      </Formik>
      <ListTable
        columns={columns}
        isLoading={allCountyUserGuildMutation.isLoading || isFetching}
        onPageChange={({ page, pageSize }) => {
          if (countyId) {
            allCountyUserGuildMutation.mutate({
              page: page,
              pageSize: pageSize,
              countyId: parseInt(countyId),
              userRole: 0,
            });
          }
        }}
        tableData={tableData}
        pageCountList={pageCountList}
        customPageSize={pageSize}
        setPageSize={(val: any) => setPageSize(val)}
      >
        {{
          headerTable: (
            <div
              className="d-flex flex-wrap justify-content-left"
              style={{ width: "100%" }}
            ></div>
          ),
        }}
      </ListTable>*/}
    </Card> 
  );
};

export { Members };
