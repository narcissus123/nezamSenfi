import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { useGetConsomptionCostByFilter, useGetPayableValueOfRole } from "../../../../../core/services/api";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ModernDatePicker, SubmitButton } from "../../../../common/Form";
import { useGetAllTarrif } from "../../../../../core/services/api/tarrif.api";
import { OptionRowSel } from "../../../../../core/models";
import { locationType } from "../FixedPayableValueContainer";
import { UserRolesAdmin } from "../../../../../core/enums/user-role-admin.enum";

interface IPropTypes {
  payableTypesData: any
  activeTariff: any
  jobCategoryTypeData: any
  activeTariffSuccess:boolean
  type: locationType
}

const List: FC<IPropTypes> = ({type, jobCategoryTypeData, payableTypesData, activeTariff, activeTariffSuccess }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);
  const [countyData, setCountyData] = useState<any>([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [tariffsData, setTariffsData] = useState<OptionRowSel[]>([]);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    payableValueType: null,
    tariffId: 0,
    jobCategory: null
  });
  const getMutation = useGetPayableValueOfRole()
  const getAllTariffMutation = useGetAllTarrif();

  const fillList = (
    val: any,
    values: any,
    isFromSearch: boolean,
    isInitialization: boolean
  ) => {
    try {
      const result = val.data.result;
      if (result && result.items) {
        let newTable: any = [];
        result.items.forEach((row: any) => {
          newTable.push({
            payableValueTypeTitle: row.payableTypeTitle,
            value: row.value,
            tariffLetterNumber: row.tariffLetterNumber,
            jobCategoryTitle: row.jobCategoryTitle,
            fileAddress: row.fileAddress,
            fileFolder: row.fileFolder,
          });
        });

        if(isInitialization){
          setFilterState((old: any) => ({
            ...old,
            payableValueType: values.payableValueType
              ? values.payableValueType
              : null,
            tariffId: values.tariffId ? values.tariffId : null,
            jobCategory: values.jobCategory ? values.jobCategory : null,
            page: isFromSearch ? 1 : old.page,
          }));
        }else{
          setFilterState((old: any) => ({
            ...old,
            payableValueType: values.payableValueType
              ? values.payableValueType
              : null,
            tariffId: values.tariffId ? values.tariffId : null,
            page: isFromSearch ? 1 : old.page,
          }));
        }
      
        setTableData(newTable);
        setPageCount(Math.ceil(result.totalCount / pageSize));
      }
    } catch (err) {}
  };
  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const history = useHistory();

  useEffect(() => {
    if (activeTariffSuccess) {
      getAllTariffMutation.mutate(
        {
          page: 1,
          pageSize: 10000,
          userRoleOfFinancialPayableValue:
            type === "mainlocation"
              ? UserRolesAdmin.Admin
              : type === "province"
              ? UserRolesAdmin.ProvinceGuildRoomAdmin
              : UserRolesAdmin.CountyGuildRoomAdmin,
        },
        {
          onSuccess: (val: any) => {
            fillForm(val, activeTariff ? activeTariff.id : null);
          },
        }
      );
    }
  }, [activeTariffSuccess]);


  const fillForm = (val: any, activeTariff: any) => {
    if (val.data && val.data.result) {
      if (val.data.result.items) {
        let newTariffsData: OptionRowSel[] = [];
        val.data.result.items.forEach((row: any) => {
          newTariffsData.push({ label: row.title, value: row.id });
        });
        setTariffsData(newTariffsData);
        setFilterState((oldState: any) => ({
          ...oldState,
          tariffId: activeTariff ? { value: activeTariff, label: "" } : null,
        }));
      }
    }
  };

  useEffect(() => {
  
    if (activeTariffSuccess) {
      getMutation.mutate(
        {
          page: 1,
          pageSize: pageSize,
          tariffId: filterState.tariffId
            ? filterState.tariffId.value
            : activeTariff.id,
          userRoleOfFinancialPayableValue:
            type === "mainlocation"
              ? UserRolesAdmin.Admin
              : type === "province"
              ? UserRolesAdmin.ProvinceGuildRoomAdmin
              : UserRolesAdmin.CountyGuildRoomAdmin,
        },
        {
          onSuccess: (val: any) => {
            fillList(val, filterState, false, true);
          },
        }
      );
    }
  }, [pageSize, refetchEvent.fixedPayableValueList, activeTariffSuccess]);

  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: any = {
            page: 1,
            pageSize: pageSize,
            payableValueType: value.payableValueType
              ? value.payableValueType.value
              : null,
            tariffId: value.tariffId ? value.tariffId.value : null,
            jobCategory: value.jobCategory ? value.jobCategory.value : null,
            userRoleOfFinancialPayableValue:
              type === "mainlocation"
                ? UserRolesAdmin.Admin
                : type === "province"
                ? UserRolesAdmin.ProvinceGuildRoomAdmin
                : UserRolesAdmin.CountyGuildRoomAdmin,
          };
          getMutation.mutate(obj, {
            onSuccess: (val: any) => {
              fillList(val, filterState, true, false);
            },
          });
        }}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <Card>
                <CardHeader>
                  <CardTitle> جستجو </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={false}
                        significant={false}
                        name="payableValueType"
                        placeHolder="انتخاب کنید ..."
                        data={payableTypesData}
                        lableText="نوع پرداختی"
                        isClearable
                      />
                    </Col>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={false}
                        significant={false}
                        name="jobCategory"
                        placeHolder="انتخاب کنید ..."
                        data={jobCategoryTypeData}
                        lableText="گروه شغلی"
                        isClearable
                      />
                    </Col>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={getAllTariffMutation.isLoading}
                        significant={true}
                        name="tariffId"
                        placeHolder="انتخاب کنید ..."
                        data={tariffsData}
                        lableText="تعرفه"
                        isClearable
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton btnText="جستجو" isLoading={getMutation.isLoading} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle> لیست </CardTitle>
                </CardHeader>
                <CardBody>
                  <ListTable
                    columns={columns}
                    isLoading={getMutation.isLoading}
                    onPageChange={({ page, pageSize }) => {
                      getMutation.mutate(
                        {
                          page: page,
                          pageSize: pageSize,
                          tariffId: values.tariffId
                            ? values.tariffId.value
                            : null,
                          jobCategory: values.jobCategory
                            ? values.jobCategory.value
                            : null,
                          userRoleOfFinancialPayableValue:
                            type === "mainlocation"
                              ? UserRolesAdmin.Admin
                              : type === "province"
                              ? UserRolesAdmin.ProvinceGuildRoomAdmin
                              : UserRolesAdmin.CountyGuildRoomAdmin,
                        },
                        {
                          onSuccess: (val: any) => {
                            fillList(val, filterState, false, false);
                          },
                        }
                      );
                    }}
                    tableData={tableData}
                    pageCountList={pageCountList}
                    customPageSize={pageSize}
                    setInitialPage={(val) =>
                      setFilterState((old: any) => ({
                        ...old,
                        payableValueType: values.payableValueType,
                        tariffId: values.tariffId,
                        jobCategory: values.jobCategory,
                        page: val + 1,
                      }))
                    }
                    setPageSize={(val: any) => setPageSize(val)}
                    getCustomProps={{}}
                  >
                    {{
                      headerTable: (
                        <div
                          className="d-flex flex-wrap justify-content-left"
                          style={{ width: "100%" }}
                        ></div>
                      ),
                    }}
                  </ListTable>
                </CardBody>
              </Card>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export { List };
