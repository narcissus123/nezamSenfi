import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { useGetAllPayableValueOfMainLocation } from "../../../../../core/services/api";
import { OptionRowSel } from "../../../../../core/models";
import { useGetAllTarrif } from "../../../../../core/services/api/tarrif.api";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form";

interface IPropTypes {
  activeTariff: any
  activeTariffSuccess: boolean
}

const List: FC<IPropTypes> = ({ activeTariff, activeTariffSuccess }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);
  const [countyData, setCountyData] = useState<any>([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
  });
  const getMutation = useGetAllPayableValueOfMainLocation();
  const getAllTariffMutation = useGetAllTarrif();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const [tariffsData, setTariffsData] = useState<OptionRowSel[]>([]);

  const history = useHistory();

  const fillList = (
    val: any,
    values: any,
    isFromSearch: boolean,
    isInitialization: boolean
  ) => {
    try {
      const result = val.data.result;
      if (result && result.items) {
        if (isInitialization) {
          setFilterState((old: any) => ({
            ...old,
            payableValueTypeEnumSearch: values.payableValueTypeEnumSearch
              ? values.payableValueTypeEnumSearch
              : null,
            page: isFromSearch ? 1 : old.page,
          }));
        } else {
          setFilterState((old: any) => ({
            ...old,
            payableValueTypeEnumSearch: values.payableValueTypeEnumSearch
              ? values.payableValueTypeEnumSearch
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
  }, [pageSize, refetchEvent.maxPayableValueList, activeTariffSuccess]);

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

  const Search = (values: any) => {
    let obj = {
      page: 1,
      pageSize: pageSize,
      tariffId: values.tariffId ? values.tariffId.value : null,
    };
    getMutation.mutate(obj, {
      onSuccess: (val: any) => {
        fillList(val, values, true, false);
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {}}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <Card>
                <CardHeader>
                  <CardTitle>جستجو</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
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
                      <SubmitButton
                        btnText="جستجو"
                        isLoading={getMutation.isLoading}
                        onClick={() => Search(values)}
                        type="button"
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
