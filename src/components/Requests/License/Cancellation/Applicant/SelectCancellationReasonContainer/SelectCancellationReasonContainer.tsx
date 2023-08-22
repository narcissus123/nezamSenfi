import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { LicenseRequestStatusEnum } from "../../../../../../core/enums/license-request-status.enums";
import { FullOptionSel, OptionRowSel } from "../../../../../../core/models";
import { useCreateCancellationRequest, useGetMyLicenseRequest, useUploadCancellationDocsByUserApplicant } from "../../../../../../core/services/api";
import { useGetAllcancellationReasonForDropdown, useGetMyAllCancellationReasonByLicenecnseRequestId } from "../../../../../../core/services/api/cancelation.api";
import { multiFullOption, showToast } from "../../../../../../core/utils";
import { CreateLicenseCancellation } from "../../../../../../core/validations/create-license-cancellation.validation";
import { MultiSelectOption, SimpleSubmitButton, SubmitButton } from "../../../../../common/Form";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { LicenseDetails } from "../../LicenseDetails/LicenseDetails";


const SelectCancellationReasonContainer: FC = () => {

  const [initialValues, setInitialValues] = useState<any>({
    canceletionReasons: null
  })
  
  const history = useHistory();

  const [cancellationReasonData, setCancellationReasonData] = useState<OptionRowSel[]>([])
  const [licenseRequestInfo, setLicenseRequestInfo] = useState<any>(null);

  const addMutation = useCreateCancellationRequest()

  const { isLoading , data , isSuccess } = useGetAllcancellationReasonForDropdown()
  const getMyLicenseReq = useGetMyLicenseRequest();

  const { id } = useParams<any>();

  const continueMutation = useUploadCancellationDocsByUserApplicant();

  useEffect(() => {
      getMyLicenseReq.mutate(+id, {
        onSuccess: (val) => {
          try{
            const result = val.data.result;
            setLicenseRequestInfo(result.licenseRequestDetails);
          }catch(err) {
          }
        },
      });
  }, [id]);

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>درخواست ابطال</CardTitle>
        </CardHeader>
        <CardBody>
          {getMyLicenseReq.isLoading ? (
            <FallBackSpinner />
          ) : (
            <>
              <Row>
                <Col>
                  <LicenseDetails isApplicant={true} getCancellationDetailsQuery={useGetMyAllCancellationReasonByLicenecnseRequestId} />
                </Col>
              </Row>
              {licenseRequestInfo &&
                licenseRequestInfo.status ===
                  LicenseRequestStatusEnum.CancellationRequestUpload && (
                  <Row style={{ marginTop: "25px" }}>
                    <Alert color="info" className="w-100 m-0 text-center">
                      در انتظار آپلود مدارک ابطال
                    </Alert>
                  </Row>
                )}

              {licenseRequestInfo &&
                licenseRequestInfo.status ===
                  LicenseRequestStatusEnum.CancellationRejected && (
                  <>
                    <Row style={{ marginBottom: "7px" }}>
                      <Alert color="danger" className="w-100 m-0 text-center">
                        درخواست ابطال شما رد شد!
                      </Alert>
                    </Row>
                    <Row>
                      <Alert color="info" className="w-100 m-0 text-center">
                        بعد از تصحیح مدارک دوباره روی دکمه ثبت کلیک کنید .
                      </Alert>
                    </Row>
                  </>
                )}

              {licenseRequestInfo &&
                (licenseRequestInfo.status ===
                  LicenseRequestStatusEnum.CancellationRequestUpload ||
                  licenseRequestInfo.status ===
                    LicenseRequestStatusEnum.CancellationUpdateDocument) && (
                  <>
                    <Row style={{ marginTop: "40px" }}>
                      <Col>
                        <SubmitButton
                          type="button"
                          isLoading={false}
                          btnText="آپلود مدارک ابطال"
                          clearable
                          clearableTxt="ثبت"
                          isClearableLoading={continueMutation.isLoading}
                          clearableDisable={false}
                          onClear={() => {
                            continueMutation.mutate(
                              { licenseRequestId: +id },
                              {
                                onSuccess: (val: any) => {
                                  showToast(
                                    ["با موفقیت انجام شد."],
                                    ToastTypes.success
                                  );
                                  history.push("/MyLicense");
                                },
                              }
                            );
                          }}
                          onClick={() => {
                            history.push("/PersonalInfo/CancellationDocuments");
                          }}
                        />
                      </Col>
                    </Row>
                  </>
                )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export { SelectCancellationReasonContainer };
