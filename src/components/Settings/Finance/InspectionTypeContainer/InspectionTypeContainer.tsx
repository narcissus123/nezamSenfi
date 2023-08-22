import { Formik, Form } from "formik";
import React, {  useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { FullOptionSel } from "../../../../core/models";
import { useAddConsomptionCost, useNewInspectionInspectionType } from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { InspectionTypeValidate } from "../../../../core/validations/inspection-type.validation";
import { FormDivider, ModernDatePicker, SubmitButton, TextInput } from "../../../common/Form";
import { ShowActiveTariff } from "../ShowActiveTariff/ShowActiveTariff";
import { List } from "./List/List";





const InspectionTypeContainer = () => {
  const [initialValue, setInitialValue] = useState<any>({});
  const [payableTypesData, setPayableTypesData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const rolesData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ];

  const [activeTariff, setActiveTariff] = useState<number>(0);
     const [activeTariffSuccess, setActiveTariffSuccess] =
       useState<boolean>(false);
     const addMutation = useNewInspectionInspectionType();

     const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

     const onSubmit = (value: any) => {
       let addTypeObj: {
         inspectionTableTypeLandArea: number;
         baseLandAmount: number;
         baseLandTariffPercentage: number;
         extraLandTariffPercentage: number;
         startDateTimeAsShamsi: string;
       }[] = [];

       addTypeObj = [
         {
           inspectionTableTypeLandArea: 1,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage1,
           extraLandTariffPercentage: value.extraLandTariffPercentage1,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 2,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage2,
           extraLandTariffPercentage: value.extraLandTariffPercentage2,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 3,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage3,
           extraLandTariffPercentage: value.extraLandTariffPercentage3,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 4,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage4,
           extraLandTariffPercentage: value.extraLandTariffPercentage4,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 5,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage5,
           extraLandTariffPercentage: value.extraLandTariffPercentage5,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 6,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage6,
           extraLandTariffPercentage: value.extraLandTariffPercentage6,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 7,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage7,
           extraLandTariffPercentage: value.extraLandTariffPercentage7,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 8,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage8,
           extraLandTariffPercentage: value.extraLandTariffPercentage8,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
         {
           inspectionTableTypeLandArea: 9,
           baseLandAmount: value.baseLandAmount,
           baseLandTariffPercentage: value.baseLandTariffPercentage9,
           extraLandTariffPercentage: value.extraLandTariffPercentage9,
           startDateTimeAsShamsi: value.startDateTimeAsShamsi,
         },
       ];

       addMutation.mutate(addTypeObj, {
         onSuccess: (val: any) => {
           showToast(["با موفقیت انجام شد."], ToastTypes.success);
           // const newEvent = { ...refetchEvent };
           // newEvent.costManagementList = !newEvent.costManagementList;
           // setRefetchEvent(newEvent);
         },
       });
     };

     return (
       <>
         <Card>
           <CardHeader>
             <CardTitle> درصد تعرفه هکتاری </CardTitle>
           </CardHeader>
           <CardBody>
             <Formik
               enableReinitialize={true}
               initialValues={initialValue}
               validationSchema={InspectionTypeValidate}
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
                     <Row>
                       <Col>
                         <ShowActiveTariff
                           setActiveTariffSuccess={setActiveTariffSuccess}
                           setActiveTarrif={setActiveTariff}
                         />
                       </Col>
                     </Row>
                     <Row>
                       <Col sm="4">
                         <TextInput
                           lableText="مبلغ مبنا ( ریال )"
                           name="baseLandAmount"
                           placeholder="وارد کنید ..."
                           significant
                         />
                       </Col>
                       <Col sm="4">
                         <ModernDatePicker
                           name="startDateTimeAsShamsi"
                           lableText="از تاریخ"
                           placeholder="وارد کنید..."
                           hasMaximum
                         />
                       </Col>
                     </Row>

                     <FormDivider textHeader="کمتر از یک هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage1"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage1"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="1.1 تا 2.5 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage2"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage2"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="2.6 تا 5 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage3"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage3"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="5.1 تا 10 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage4"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage4"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="10.1 تا 50 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage5"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage5"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="50.1 تا 100 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage6"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage6"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="100.1 تا 500 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage7"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage7"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="500.1 تا 1000 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage8"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage8"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>
                     <FormDivider textHeader="بیش از 1000 هکتار">
                       <CardBody>
                         <Row>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد تعرفه هر قطعه اضافی"
                               name="extraLandTariffPercentage9"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                           <Col sm="4">
                             <TextInput
                               lableText="درصد مبنا محاسبه تعرفه"
                               name="baseLandTariffPercentage9"
                               placeholder="وارد کنید ..."
                               significant
                             />
                           </Col>
                         </Row>
                       </CardBody>
                     </FormDivider>

                     <Row>
                       <Col sm="4">
                         <SubmitButton
                           isLoading={addMutation.isLoading}
                           values={values}
                           schema={InspectionTypeValidate}
                           initialValue={initialValue}
                         />
                       </Col>
                     </Row>
                   </Form>
                 );
               }}
             </Formik>
           </CardBody>
         </Card>

         <List
           activeTariffSuccess={activeTariffSuccess}
           activeTariff={activeTariff}
         />
       </>
     );
};

export { InspectionTypeContainer };
