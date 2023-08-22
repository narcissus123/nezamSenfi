import { Formik, Form } from "formik";
import React, {  useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes, UserAdminRolesEnum, UserAdminRolesEnumPersian } from "../../../../core/enums";
import { FullOptionSel } from "../../../../core/models";
import { useAddConsomptionCost, useGetPayableTypesForSetToRoles, useSetPaymentTypeRole } from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { AddCostManagementValidate } from "../../../../core/validations/add-cost-management.validation";
import { PaymentTypeRoles } from "../../../../core/validations/payment-type-roles.validation";
import { SubmitButton, TextInput, Toggle } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ShowActiveTariff } from "../ShowActiveTariff/ShowActiveTariff";
import { List } from "./List/List";

const RolesContainer = () => {
  const [initialValue, setInitialValue] = useState<any>({
    payableValueTypeId: null,
    roleId: null,
    inSharing: false
  });
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);
  const [tableData, setTableData] = useState<any>([]);
  const [counter, setCounter] = useState<number>(1);
  const [activeTariff, setActiveTariff] = useState<number>(0);
  const [activeTariffSuccess, setActiveTariffSuccess] = useState<boolean>(false);
  const [payableTypesData, setPayableTypesData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const rolesData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        {
          value: UserAdminRolesEnum.Admin,
          label: UserAdminRolesEnumPersian.Admin,
        },
        {
          value: UserAdminRolesEnum.ProvinceGuildRoomAdmin,
          label: UserAdminRolesEnumPersian.ProvinceGuildRoomAdmin,
        },
        {
          value: UserAdminRolesEnum.CountyGuildRoomAdmin,
          label: UserAdminRolesEnumPersian.CountyGuildRoomAdmin,
        },
      ],
    },
  ];

  const addMutation = useSetPaymentTypeRole();
  const { data, isLoading , isSuccess } = useGetPayableTypesForSetToRoles()

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  
  useEffect(() => {
    if(data && data.data ) {
      try{
        let newOptions : any = []
        let newPayableTypes = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        const result = data.data.result;
        result.forEach((row: any) => {
      
          newOptions.push({
            value: row.payableValueType,
            label: row.payableTypeTitle,
          });
        
        });

        newPayableTypes[0].options = newOptions;

        setPayableTypesData(newPayableTypes);

      }catch(er) {

      }


    }

  },[isSuccess])

  const onSubmit = (value: any) => {
    let data: {
      items: {
        payableValueTypeId: number;
        roleId: number;
        inSharing: boolean;
      }[];
    } = { items: [] };

    data.items.push({
      payableValueTypeId: value.payableValueTypeId.value,
      roleId: value.roleId.value,
      inSharing: value.inSharing,
    });

    addMutation.mutate(data, {
      onSuccess: (val: any) => {
        const newEvent = { ...refetchEvent };
        newEvent.rolesContainerList = !newEvent.rolesContainerList;
        setRefetchEvent(newEvent);
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={PaymentTypeRoles}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          touched,
          getFieldProps,
          setFieldValue,
        }) => {
          return (
            <Form>
              <Card>
                <CardHeader>
                  <CardTitle> تقسیم وظایف </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <ShowActiveTariff setActiveTariffSuccess={setActiveTariffSuccess} setActiveTarrif={setActiveTariff} />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={isLoading}
                        significant={true}
                        name="payableValueTypeId"
                        placeHolder="انتخاب کنید ..."
                        data={payableTypesData}
                        lableText="نوع پرداختی"
                      />
                    </Col>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={false}
                        significant={true}
                        name="roleId"
                        placeHolder="انتخاب کنید ..."
                        data={rolesData}
                        lableText="نقش"
                      />
                    </Col>
                    <Col sm="4" style={{ paddingTop: "22px" }}>
                      <Toggle
                        id="inSharing"
                        name="inSharing"
                        lableText="لحاظ در تسهیم"
                        significant
                        direction="ltr"
                        className="my-1"
                        onChange={(opt: any) => {
                          setFieldValue("inSharing", opt.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        schema={PaymentTypeRoles}
                        isLoading={addMutation.isLoading}
                      ></SubmitButton>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Row style={{ marginTop: "25px" }}>
                <Col>
                  <List
                    activeTariffSuccess={activeTariffSuccess}
                    activeTariff={activeTariff}
                    tableData={tableData}
                    setTableData={setTableData}
                    setInitialValue={setInitialValue}
                    setIsInEditMode={setIsInEditMode}
                    setEditRowID={setEditRowID}
                    payableTypesData={payableTypesData}
                    rolesData={rolesData}
                    isLoading={isLoading}
                    setCounter={setCounter}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { RolesContainer };
