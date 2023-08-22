import React, { FC, useState } from "react";
import { Card } from "reactstrap";
import { ProvinceList } from "./ProvinceList/ProvinceList";

const Members: FC = () => {
  // const { id } = useParams<{ id: string }>();

  // const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const [fetchRefresh, setFetchRefresh] = useState<boolean>(false);

  // const [tableData, setTableData] = useState([]);

  // const [pageCountList, setPageCount] = useState<any>(0);
  // const [pageSize, setPageSize] = useState<any>(10);

  // const [provinceList, setProvinceList] = useState<any>([
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
  //   province: null,
  // });

  // //const [state,setState] = useState([])

  // const allProvinceUserGuildMutation = useGetUserProvinceGuildRoomsByProvinceId();
  // const {
  //   isLoading,
  //   isSuccess,
  //   data,
  //   isFetching,
  // } = useOwnedUserProvinceGuildRooms();

  // useEffect(() => {
  //   if (data) {
  //     let queryData: any = data;
  //     let newOptions: any = [];
  //     let newProvinces = [
  //       {
  //         label: "سرلیست استان",
  //         options: [],
  //       },
  //     ];

  //     queryData.data.result.forEach((row: any) => {
  //       newOptions.push({ value: row.id, label: row.title });
  //     });
  //     try {
  //       newProvinces[0].options = newOptions;
  //       setFilterState({
  //         ...filterState,
  //         province: {
  //           value: data.data.result[0].id,
  //           label: data.data.result[0].title,
  //         },
  //       });
  //       setProvinceList(newProvinces);
  //     } catch (error) {}
  //   }
  // }, [isSuccess, data]);

  // useEffect(() => {
  //   if (data && data.data.result) {
  //     if (data.data.result[0]) {
  //       allProvinceUserGuildMutation.mutate({
  //         page: 1,
  //         pageSize: pageSize,
  //         provinceId: parseInt(data.data.result[0].id),
  //         userRole: 0,
  //       });
  //     }
  //   }
  // }, [data, pageSize]);

  // useEffect(() => {
  //   if (
  //     allProvinceUserGuildMutation.data &&
  //     allProvinceUserGuildMutation.data.data.result
  //   ) {
  //     let newState: any = [];
  //     allProvinceUserGuildMutation.data.data.result.provinceGuildRooms.forEach(
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
  //         allProvinceUserGuildMutation.data.data.result.totalCount / pageSize
  //       )
  //     );
  //   }
  // }, [allProvinceUserGuildMutation.isSuccess]);

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     maxWidth: 400,
  //   }),
  //   []
  // );

  // const history = useHistory();

  return (
    <Card>
      <ProvinceList
        setFetchRefresh={() => {
          setFetchRefresh((val: any) => !val);
        }}
        fetchRefresh={fetchRefresh}
      />

      {/* <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: IGuildUsersFilter = {
            userNationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            userRole: value.userRole ? value.userRole.value : 0,
            provinceId: value.province.value,
          };
          allProvinceUserGuildMutation.mutate(obj);
        }}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <Row>
                <ListFilter
                  allProvinceUserGuildMutation={allProvinceUserGuildMutation}
                />
              </Row>
              <Row className="d-flex align-items-start clearfix">
                <Col>
                  <ListTable
                    columns={columns}
                    isLoading={
                      allProvinceUserGuildMutation.isLoading || isFetching
                    }
                    onPageChange={({ page, pageSize }) => {
                      allProvinceUserGuildMutation.mutate({
                        page: page,
                        pageSize: pageSize,
                        provinceId: parseInt(values.province.id),
                        userRole: 0,
                      });
                    }}
                    tableData={tableData}
                    pageCountList={pageCountList}
                    customPageSize={pageSize}
                    setPageSize={(val: any) => setPageSize(val)}
                  >
                    {{
                      headerTable: (
                        <div style={{ width: "200px" }}>
                          <BasicSelectOption
                            name="province"
                            lableText="استان"
                            placeHolder="انتخاب کنید..."
                            data={provinceList}
                            isClearable={false}
                            isLoading={isFetching}
                            onChange={(opt, e) => {
                              setFieldValue("province", {
                                value: opt.value,
                                label: opt.label,
                              });
                              const obj: IGuildUsersFilter = {
                                userNationalCode: values.userNationalCode,
                                name: values.name,
                                page: 1,
                                pageSize: pageSize,
                                userRole: values.userRole
                                  ? values.userRole.value
                                  : 0,
                                provinceId: opt.value,
                              };
                              allProvinceUserGuildMutation.mutate(obj);
                            }}
                          />
                        </div>
                      ),
                    }}
                  </ListTable>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Formik>*/}
    </Card>
  );
};

export { Members };
