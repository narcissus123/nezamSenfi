import React, { FC, useEffect, useState } from "react";
import { Alert, Card, CardBody } from "reactstrap";
import { FormDivider, SimpleSubmitButton } from "../../../../../../common/Form";
import { ApplicantInfo } from "./ApplicantInfo/ApplicantInfo";
import { SetPrimaryInfoLicense } from "./SetPrimaryInfoLicense";
import { PiecesList } from "./PiecesList/PiecesList";
import { useHistory, useParams } from "react-router-dom";
import {
  useGetLicenseRequestDetailByExpert,
  useSendExpertisingToMacthing,
} from "../../../../../../../core/services/api";
import { ToastTypes, UserType } from "../../../../../../../core/enums";
import { showToast } from "../../../../../../../core/utils";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { HistoryComponent } from "../HistoryComponent/HistoryComponent";
import { LicenseRequestStatusEnum } from "../../../../../../../core/enums/license-request-status.enums";

const SetPrimaryInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [primaryInformation, setPrimaryInformation] = useState<any>(null); // edit type
  const [requesterUserRealInfo, setRequesterUserRealInfo] = useState<any>(null); // edit type
  const [requesterUserLegalInfo, setRequesterUserLegalInfo] =
    useState<any>(null); // edit type
  const [licenseRequestDetails, setlicenseRequestDetails] = useState<any>(null);
  const [sectionIds, setSectionIds] = useState<any>([]); // edit type
  const [status, setStatus] = useState<{
    status: number;
    statusTitle: string;
  } | null>(null); // edit type

  const history = useHistory();

  const sendToMatching = useSendExpertisingToMacthing();

  const { isSuccess, data, isLoading, refetch } =
    useGetLicenseRequestDetailByExpert(+id);

  useEffect(() => {
    if (isSuccess) {
      if (data?.data.result.userType === UserType.Real) {
        setRequesterUserRealInfo(data?.data.result.requesterUserRealInfo);
      } else
        setRequesterUserLegalInfo(data?.data.result.requesterUserLegalInfo);

      setlicenseRequestDetails(data?.data.result.licenseRequestDetails);
      setPrimaryInformation(data?.data.result.primaryInformation);
      setStatus({
        status: data?.data.result.licenseRequestDetails.status,
        statusTitle: data?.data.result.licenseRequestDetails.statusTitle,
      });
      const secIds: { sectionId: number }[] = [];
      data?.data.result.sections.forEach((sec: any) => {
        secIds.push({
          ...sec,
          roundedArea: parseFloat(sec.area).toFixed(2),
          roundedPerimeter: parseFloat(sec.perimeter).toFixed(2),
        });
      });
      setSectionIds(secIds);
    }
  }, [isSuccess, data]);

  return (
    <>
      <SweetAlertCallback
        mutation={sendToMatching}
        title="تایید نهایی"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          sendToMatching.mutate(+id, {
            onSuccess: () => {
              showToast(["با موفقیت انجام شد"], ToastTypes.success);
              history.push("/ManageLicense/MyCartable");
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از تایید این درخواست اطمینان دارید؟
      </SweetAlertCallback>
      <ApplicantInfo
        isLoading={isLoading}
        requesterUserInfo={
          requesterUserRealInfo ? requesterUserRealInfo : requesterUserLegalInfo
        }
        isReal={requesterUserRealInfo ? true : false}
      />
      <HistoryComponent />
      <SetPrimaryInfoLicense
        primaryInformation={primaryInformation}
        cityOrVillageId={
          licenseRequestDetails ? licenseRequestDetails.cityOrVillageId : null
        }
        description={licenseRequestDetails ? licenseRequestDetails.description : null}
        countyUnionId={licenseRequestDetails ? licenseRequestDetails.countyUnionId : null}
        status={status}
        refetch={refetch}
      />
      {primaryInformation &&
      primaryInformation.fixedOrMobieTypeByExpert === 1 ? (
        <PiecesList
          setSectionIds={setSectionIds}
          sectionIds={sectionIds}
          isLoading={isLoading}
          licenseRequestDetails={licenseRequestDetails}
          status={licenseRequestDetails && licenseRequestDetails.status}
        />
      ) : primaryInformation &&
        primaryInformation.fixedOrMobieTypeByExpert === 2 ? (
        <Card>
          <CardBody>
            <FormDivider textHeader="">
              <Alert
                color="primary"
                className="d-flex justify-content-center align-items-center mt-1"
              >
                <SimpleSubmitButton
                  btnText="کارشناسی پروانه"
                  isLoading={false}
                  disabled={
                    (licenseRequestDetails &&
                      licenseRequestDetails.status !==
                        LicenseRequestStatusEnum.Expertise &&
                      licenseRequestDetails.status !==
                        LicenseRequestStatusEnum.Matching) ||
                    (licenseRequestDetails.status ===
                      LicenseRequestStatusEnum.Matching &&
                      licenseRequestDetails.rejectExpertStatus !== 1)
                  }
                  className="mr-1"
                  onCLick={() => history.push(`/Inspection/8/Capacity/${id}`)}
                />
                <p>برای ادامه کارشناسی پروانه از این قسمت اقدام کنید</p>
              </Alert>
            </FormDivider>
          </CardBody>
        </Card>
      ) : null}
      <Card>
        <CardBody>
          <FormDivider textHeader="">
            <Alert
              color="primary"
              className="d-flex justify-content-center align-items-center mt-1"
            >
              <SimpleSubmitButton
                btnText="تایید نهایی کارشناسی"
                isLoading={sendToMatching.isLoading}
                disabled={
                  sendToMatching.isLoading ||
                  isLoading ||
                  (licenseRequestDetails &&
                    licenseRequestDetails.status !==
                      LicenseRequestStatusEnum.Expertise &&
                    licenseRequestDetails.status !==
                      LicenseRequestStatusEnum.Matching) ||
                  (licenseRequestDetails &&
                    licenseRequestDetails.status ===
                      LicenseRequestStatusEnum.Matching &&
                    licenseRequestDetails.rejectExpertStatus !== 1)
                }
                onCLick={() => setShowConfirmation(true)}
                className="mr-1"
              />
              {licenseRequestDetails &&
              licenseRequestDetails.status ===
                LicenseRequestStatusEnum.Matching &&
              licenseRequestDetails.rejectExpertStatus === 1 ? (
                <p>برای تایید نهایی کارشناسی دکمه تایید نهایی را انتخاب کنید</p>
              ) : licenseRequestDetails &&
                licenseRequestDetails.status >
                  LicenseRequestStatusEnum.Expertise ? (
                <p>این درخواست کارشناسی شده است</p>
              ) : primaryInformation &&
                primaryInformation.fixedOrMobieTypeByExpert === 1 ? (
                <p>
                  این پرونده دارای {sectionIds.length} قطعه است که اطلاعات{" "}
                  {
                    sectionIds.filter((sec: any) => sec.progressBar === 1)
                      .length
                  }{" "}
                  قطعه تکمیل شده است
                </p>
              ) : (
                <p>برای تایید نهایی کارشناسی دکمه تایید نهایی را انتخاب کنید</p>
              )}
            </Alert>
          </FormDivider>
        </CardBody>
      </Card>
    </>
  );
};

export { SetPrimaryInfo };
