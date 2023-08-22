import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { FullOptionSel, OptionRowSel } from "../../../../../../core/models";
import { useCreateCancellationRequest } from "../../../../../../core/services/api";
import { useGetAllcancellationReasonForDropdown } from "../../../../../../core/services/api/cancelation.api";
import { multiFullOption, showToast } from "../../../../../../core/utils";
import { CreateLicenseCancellation } from "../../../../../../core/validations/create-license-cancellation.validation";
import { MultiSelectOption, SubmitButton } from "../../../../../common/Form";


const SelectCancellationReasonContainerNew: FC = () => {

  const [initialValues, setInitialValues] = useState<any>({
    canceletionReasons: null
  })
  
  const [cancellationReasonData, setCancellationReasonData] = useState<OptionRowSel[]>([])

  const addMutation = useCreateCancellationRequest()

  const history = useHistory();

  const { isLoading , data , isSuccess } = useGetAllcancellationReasonForDropdown()

  const { id } = useParams<any>();

  useEffect(()=> {
    if(data && data.data.result) {
      try{

        let newOptions: { value: number; label: string }[] = [];
        data.data.result.forEach((row: { id: number; title: string }) => {
          newOptions.push({ value: row.id, label: row.title });
        });

        setCancellationReasonData(newOptions);

      }catch(err){}
    }
  },[isSuccess])

  const onSubmit = (value: any) => {
    let canceletionReasons : number[] = [];

    if(value.canceletionReasons) {
      value.canceletionReasons.forEach((row: OptionRowSel) => {
        canceletionReasons.push(row.value);
      });
    }
    
    const setObj = {
      licenseId: +id,
      canceletionReasons: canceletionReasons
    }

    addMutation.mutate(setObj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        history.push("/MyLicense/Cancellation/CancellationReason/" + id);
      },
    });

  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>درخواست ابطال</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={CreateLicenseCancellation}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ values, resetForm, setFieldValue }) => {
              return (
                <Form>
                  <Row>
                    <Col sm="4">
                      <MultiSelectOption
                        labelText="دلایل ابطال"
                        name="canceletionReasons"
                        placeHolder="انتخاب کنید..."
                        significant={true}
                        isLoading={isLoading}
                        options={cancellationReasonData}
                        onChange={(e) => setFieldValue("canceletionReasons", e)}
                        hasLabel={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={addMutation.isLoading}
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { SelectCancellationReasonContainerNew };
