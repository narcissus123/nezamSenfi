import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { useGetConsomptionCostByFilter, useGetInspectionInspectionTypeLandAreaModel, useGetInspectionInspectionTypeValues } from "../../../../../core/services/api";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FullOptionSel, OptionRowSel } from "../../../../../core/models";
import { SubmitButton } from "../../../../common/Form";
import { useGetAllTarrif } from "../../../../../core/services/api/tarrif.api";



interface IPropTypes {
  activeTariff: any
  activeTariffSuccess: any
}

const List: FC<IPropTypes> = ({  activeTariff, activeTariffSuccess  }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    inspectionTableTypeLandArea: null,
  });
  const getMutation = useGetInspectionInspectionTypeValues()
  const getAllTariffMutation = useGetAllTarrif();
  const [tariffsData, setTariffsData] = useState<OptionRowSel[]>([]);

  const [landTypeData, setLandTypeData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const { data , isLoading , isSuccess } = useGetInspectionInspectionTypeLandAreaModel()

  const fillList = (
    val: any,
    values: any,
    isFromSearch: boolean,
    isInitialization: boolean
  ) => {
    try {
      const result = val.data.result;
      if (result && result.items) {
        if(isInitialization){
          setFilterState((old: any) => ({
            ...old,
            inspectionTableTypeLandArea: values.inspectionTableTypeLandArea
              ? values.inspectionTableTypeLandArea
              : null,
            page: isFromSearch ? 1 : old.page,
          }));
        }else{
          setFilterState((old: any) => ({
            ...old,
            inspectionTableTypeLandArea: values.inspectionTableTypeLandArea
              ? values.inspectionTableTypeLandArea
              : null,
            tariffId: values.tariffId,
            page: isFromSearch ? 1 : old.page,
          }));
        }
      
        setTableData(result.items);
        setPageCount(Math.ceil(result.totalCount / pageSize));
      }
    } catch (err) {}
  };

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
      getAllTariffMutation.mutate(
        {
          page: 1,
          pageSize: 10000,
        },
        {
          onSuccess: (val: any) => {
            fillForm(val, activeTariff ? activeTariff.id : null);
          },
        }
      );
    }
  }, [activeTariffSuccess]);

  useEffect(()=>{
    if (activeTariffSuccess) {
      getMutation.mutate(
        {
          page: 1,
          pageSize: pageSize,
          tariffId: filterState.tariffId
            ? filterState.tariffId.value
            : activeTariff.id,
        },
        {
          onSuccess: (val: any) => {
            fillList(val, filterState, false, true);
          },
        }
      );
    }
  }, [ pageSize  , refetchEvent.maxPayableValueList, activeTariffSuccess ])

  useEffect(() => {
    if(data && data.data){
      let newOptions: FullOptionSel[] = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];
      let options: any = [];
      data.data.result.forEach((row: any) => {
        options.push({ value: row.inspectionTableTypeLandArea, label: row.title });
      });
      newOptions[0].options = options;
      setLandTypeData(newOptions);
    }


  }, [isSuccess])


  const history = useHistory();


  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: any = {
            page: 1,
            pageSize: pageSize,
            inspectionTableTypeLandArea: value.inspectionTableTypeLandArea
              ? value.inspectionTableTypeLandArea.value
              : null,
            tariffId: value.tariffId ? value.tariffId.value : null,
          };
          getMutation.mutate(obj, {
            onSuccess: (val: any) => {
              fillList(val, value, true, false);
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
                        lableText="نوع"
                        placeHolder="انتخاب کنید..."
                        name="inspectionTableTypeLandArea"
                        data={landTypeData}
                        isClearable={true}
                        isLoading={false}
                      />
                    </Col>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={getAllTariffMutation.isLoading}
                        name="tariffId"
                        placeHolder="انتخاب کنید ..."
                        data={tariffsData}
                        lableText="تعرفه"
                        isClearable
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        btnText="جستجو"
                        isLoading={getMutation.isLoading}
                        values={values}
                      />
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
                          inspectionTableTypeLandArea:
                            values.inspectionTableTypeLandArea
                              ? values.inspectionTableTypeLandArea.value
                              : null,
                          tariffId: values.tariffId
                            ? values.tariffId.value
                            : null,
                        },
                        {
                          onSuccess: (val: any) =>
                            fillList(val, values, false, false),
                        }
                      );
                    }}
                    tableData={tableData}
                    pageCountList={pageCountList}
                    customPageSize={pageSize}
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
