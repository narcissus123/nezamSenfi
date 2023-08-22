import React, { Fragment, useState } from "react";
import { File, FileText, User } from "react-feather";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Collapse,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { JobRequestStatus } from "../../../../../../core/enums/job-request-status";
import {
  useGetConfirmInquiriesByManager,
  useGetCountyGuildRoomPositionRequestInquiriesManager,
  useGetCountyUnionPositionRequestInquiriesManager,
  useGetMainLocationGuildRoomPositionRequestInquiriesManager,
  useChangeSecretariatOfCountyGuildRoomPositionRequestByManger,
  useGetProvinceGuildRoomPositionRequestInquiriesManager,
  useGetSecretariatOfCountyCountyGuildRoomPositionRequest,
  useChangeSecretariatOfCountyUnionPositionRequestByManger,
  useGetSecretariatOfCountyUnionPositionRequest,
  useChangeSecretariatOfProvinceGuildRoomPositionRequestByManger,
  useGetSecretariatOfProvinceGuildRoomPositionRequest,
  useGetSecretariatOfMainLocationGuildRoomPositionRequest,
  useChangeSecretariatOfMainLocationGuildRoomPositionRequestByManger,
} from "../../../../../../core/services/api";
import { IsIncludes, showToast } from "../../../../../../core/utils";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import { ChangeSecretariat } from "../../../../../common/ChangeSecretariat/ChangeSecretariat";
import { SimpleSubmitButton, SubmitButton } from "../../../../../common/Form";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { SweetAlertCallback } from "../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import Timeline from "../../../../../common/timeline";
import { CardWrapper } from "../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { ManagerConfirmInquiry } from "../../UpManager/Cartable/ManagerConfirmInquiry/ManagerConfirmInquiry";
import { ArchiveRequestModal } from "./ArchiveRequestModal/ArchiveRequestModal";
import { CheckComponent } from "./CheckComponent/CheckComponent";
import { ConfirmPaymentModal } from "./ConfirmPaymentModal/ConfirmPaymentModal";
import { GuarantorsList } from "./GuarantorsList/GuarantorsList";
import { HistoryJobRequest } from "./HistoryJobRequest";
import { ResumeJobRequest } from "./ResumeJobRequest";
import Styles from "./SecretariatCheckJobRequests.module.scss";
import { SelectComponent } from "./SelectComponent/SelectComponent";

export interface IPropsType {
  initialValues?: any;
  isLoading?: boolean;
  selectMutation?: any;
  isSecretariatCartable?: boolean;
  type?: string;
  isDetails?: boolean;
  historyMutation?: any;
  resumeMutation?: any;
  isManagerCartable?: boolean;
  archiveMutation?: any;
  acceptPayment?: any;
  rejectPayment?: any;
  isActiveUpManager?: any;
  getContractMutation?: any;
  guarantorsDetailsMutation?: any;
}

const SecretariatCheckJobRequests: React.FC<IPropsType> = ({
  initialValues,
  isLoading,
  selectMutation,
  children,
  isSecretariatCartable = false,
  isDetails,
  type = "",
  historyMutation,
  resumeMutation,
  isManagerCartable = false,
  archiveMutation,
  acceptPayment,
  rejectPayment,
  isActiveUpManager,
  getContractMutation,
  guarantorsDetailsMutation,
}) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState<any>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<any>(false);

  const [isInquiryOpen, setIsInquiryOpen] = useState<any>(false);

  const [isGuarantorsOpen, setIsGuarantorsOpen] = useState<any>(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isAcceptPaymentOpen, setIsAcceptPaymentOpen] = useState(false);
  const [isRejectPaymentOpen, setIsRejectPaymentOpen] = useState(false);
  const { id }: any = useParams();
  const contractMutation = getContractMutation();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isChangeSecretariatOpen, setIsChangeSecretariatOpen] =
    useState<boolean>(false);

  const location = useLocation();

  const confirmMutation = useGetConfirmInquiriesByManager();
  const history = useHistory();

  const serveContractFile = () => {
    contractMutation.mutate(id, {
      onSuccess: (val: any) => {
        console.log(val);
      },
    });
  };

  return (
    <CardWrapper text="بررسی درخواست شغل">
      <SweetAlertCallback
        mutation={confirmMutation}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          confirmMutation.mutate(id, {
            onSuccess: (val: any) => {
              setShowConfirmation(false);
              showToast(["با موفقیت انجام شد."], ToastTypes.success);
              // executive
              if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ExecutiveManagerJobRequestslist/Province/"
                )
              ) {
                history.push(
                  "/ManageCartable/ProvinceExecutiveManagerCartable"
                );
              } else if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ExecutiveManagerJobRequestslist/MainLocation/"
                )
              ) {
                history.push(
                  "/ManageCartable/MainLocationExecutiveManagerCartable"
                );
              } else if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ExecutiveManagerJobRequestslist/County/"
                )
              ) {
                history.push("/ManageCartable/CountyExecutiveManagerCartable");
              } else if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ExecutiveManagerJobRequestslist/Union/"
                )
              ) {
                history.push("/ManageCartable/UnionExecutiveManagerCartable");
              }
              // vice
              else if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ViceManagerJobRequestslist/Province/"
                )
              ) {
                history.push("/ManageCartable/ProvinceViceManagerCartable");
              } else if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ViceManagerJobRequestslist/County/"
                )
              ) {
                history.push("/ManageCartable/CountyViceManagerCartable");
              } else if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ViceManagerJobRequestslist/MainLocation/"
                )
              ) {
                history.push("/ManageCartable/MainLocationViceManagerCartable");
              } else if (
                IsIncludes(
                  location.pathname,
                  "/ManageRequests/ViceManagerJobRequestslist/Union/"
                )
              ) {
                history.push("/ManageCartable/UnionViceManagerCartable");
              }
              // manager
              else if (type === "MainLocation")
                history.push(
                  "/ManageRequests/MainLocationManagerJobRequestList"
                );
              else if (type === "Province")
                history.push("/ManageRequests/ProvinceManagerJobRequestList");
              else if (type === "County")
                history.push("/ManageRequests/CountyManagerJobRequestList");
              else if (type === "Union")
                history.push("/ManageRequests/UnionManagerJobRequestList");
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از تأیید این درخواست مطمئنید؟
      </SweetAlertCallback>

      <ConfirmPaymentModal
        confirmMutation={acceptPayment}
        isOpen={isAcceptPaymentOpen}
        toggleModal={() => setIsAcceptPaymentOpen(false)}
        positionRequestId={+id}
        statusTitle="تایید"
        type={type}
      />
      <ConfirmPaymentModal
        confirmMutation={rejectPayment}
        isOpen={isRejectPaymentOpen}
        toggleModal={() => setIsRejectPaymentOpen(false)}
        positionRequestId={+id}
        statusTitle="رد"
        type={type}
      />
      <ArchiveRequestModal
        archiveMutation={archiveMutation}
        isOpen={isOpen}
        positionRequestId={+id}
        toggleModal={() => setIsOpen(false)}
        type={type}
      />

      {isManagerCartable && (
        <ChangeSecretariat
          hasSecretariat={initialValues.status > 2}
          isOpen={isChangeSecretariatOpen}
          toggleModal={() => setIsChangeSecretariatOpen(false)}
          getUserQuery={
            isSameString(type, "county")
              ? useGetSecretariatOfCountyCountyGuildRoomPositionRequest
              : isSameString(type, "province")
              ? useGetSecretariatOfProvinceGuildRoomPositionRequest
              : isSameString(type, "MainLocation")
              ? useGetSecretariatOfMainLocationGuildRoomPositionRequest
              : useGetSecretariatOfCountyUnionPositionRequest
          }
          useMutate={
            isSameString(type, "province")
              ? useChangeSecretariatOfProvinceGuildRoomPositionRequestByManger
              : isSameString(type, "county")
              ? useChangeSecretariatOfCountyGuildRoomPositionRequestByManger
              : isSameString(type, "MainLocation")
              ? useChangeSecretariatOfMainLocationGuildRoomPositionRequestByManger
              : useChangeSecretariatOfCountyUnionPositionRequestByManger
          }
        />
      )}

      <>
        {isLoading ? (
          <FallBackSpinner setHeight={300} />
        ) : (
          <>
            {initialValues.status === JobRequestStatus.FinishSuccessfully && (
              <Alert color="info">این درخواست با موفقیت به پایان رسید.</Alert>
            )}

            <Timeline
              data={[
                {
                  title: "اطلاعات درخواست شغل",
                  color: "success",
                  icon: <User size={14} />,
                  customContent: (
                    <ListGroup tag="div">
                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          نام متقاضی : {initialValues.fullName} -{" "}
                          <Link
                            to={
                              initialValues.userType === 1
                                ? `/UserList/RealUsersList/${initialValues.userId}`
                                : `/UserList/LegalUsersList/${initialValues.userId}`
                            }
                            target="_blank"
                          >
                            مشاهده جزئیات کاربر
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`تاریخ درخواست : ${initialValues.createDate}`}
                        </ListGroupItem>
                      </ListGroup>

                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`سطح درخواست : ${initialValues.type}`}
                        </ListGroupItem>
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          نوع ارایه خدمت: {initialValues.positionTitle}
                        </ListGroupItem>
                      </ListGroup>

                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`شماره ملی کاربر : ${initialValues.userNationalCode}`}
                        </ListGroupItem>
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`وضعیت درخواست : ${initialValues.statusTitle}`}
                        </ListGroupItem>
                      </ListGroup>

                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`سابقه خدمت پس از تحصیل : ${initialValues.historyOfServiceAfterGraduation}`}
                        </ListGroupItem>
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`موضوع رتبه یا پروانه اشتغال : ${initialValues.ratingTitle}`}
                        </ListGroupItem>
                      </ListGroup>
                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`وضعیت رتبه: ${initialValues.ratingStatus}`}
                        </ListGroupItem>
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`نوع کاربر: ${initialValues.userTypeTitle}`}
                        </ListGroupItem>
                      </ListGroup>
                      {initialValues.status >
                        JobRequestStatus.SettingPresentDate && (
                        <ListGroup className="list-group-horizontal-sm">
                          <ListGroupItem
                            className={Styles["item-flex"]}
                            tag="a"
                          >
                            {`تاریخ اعلان برای حضور : ${initialValues.invitationDate}`}
                          </ListGroupItem>
                          <ListGroupItem
                            className={Styles["item-flex"]}
                            tag="a"
                          >
                            {`تعداد ضامن : ${initialValues.guarantorCount}`}
                          </ListGroupItem>
                        </ListGroup>
                      )}
                      {initialValues.status ===
                        JobRequestStatus.FinishSuccessfully && (
                        <ListGroup className="list-group-horizontal-sm">
                          <ListGroupItem
                            className={Styles["item-flex"]}
                            tag="a"
                          >
                            {`شماره پرسنلی: ${initialValues.personalCode}`}
                          </ListGroupItem>
                        </ListGroup>
                      )}
                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`توضیحات: ${
                            initialValues.description
                              ? initialValues.description
                              : "ثبت نشده است"
                          }`}
                        </ListGroupItem>
                      </ListGroup>
                    </ListGroup>
                  ),
                },
                {
                  title: "تاریخچه",
                  // color: "#28c76f",
                  icon: <FileText size={14} />,
                  customContent: (
                    <Fragment>
                      <Button
                        color="primary"
                        //id="reportToggler2"
                        outline
                        onClick={() => {
                          setIsHistoryOpen(!isHistoryOpen);
                        }}
                      >
                        مشاهده تاریخچه
                      </Button>
                      <hr />

                      <Collapse
                        style={{ marginTop: "30px" }}
                        isOpen={isHistoryOpen}
                        //toggler="#reportToggler2"
                      >
                        <HistoryJobRequest
                          historyMutation={historyMutation}
                          initialValues={initialValues}
                          isOpen={isHistoryOpen}
                          type={type}
                        />
                      </Collapse>
                    </Fragment>
                  ),
                },
                // resume
                {
                  title: "رزومه ها",
                  // color: "#28c76f",
                  icon: <File size={14} />,
                  customContent: (
                    <Fragment>
                      <Button
                        color="primary"
                        // id="reportToggler3"
                        outline
                        onClick={() => {
                          setIsResumeOpen(!isResumeOpen);
                        }}
                      >
                        مشاهده رزومه
                      </Button>
                      <hr />

                      <Collapse
                        style={{ marginTop: "30px" }}
                        isOpen={isResumeOpen}
                        // toggler="#reportToggler3"
                      >
                        <ResumeJobRequest
                          resumeMutation={resumeMutation}
                          initialValues={initialValues}
                          isOpen={isResumeOpen}
                        />
                      </Collapse>
                    </Fragment>
                  ),
                },
                initialValues.status >=
                JobRequestStatus.SendInquiryLetterBySecretariat
                  ? {
                      title: "استعلامات",
                      // color: "#28c76f",
                      icon: <FileText size={14} />,
                      customContent: (
                        <Fragment>
                          <Button
                            color="primary"
                            // id="reportToggler3"
                            outline
                            onClick={() => {
                              setIsInquiryOpen(!isInquiryOpen);
                            }}
                          >
                            مشاهده نامه ها
                          </Button>
                          <hr />

                          <Collapse
                            style={{ marginTop: "30px" }}
                            isOpen={isInquiryOpen}
                            // toggler="#reportToggler3"
                          >
                            <ManagerConfirmInquiry
                              secretariatId={initialValues.secretariatId}
                              from={type}
                              status={initialValues.status}
                              isOpen={isInquiryOpen}
                              getMutation={
                                type === "County"
                                  ? useGetCountyGuildRoomPositionRequestInquiriesManager
                                  : type === "Province"
                                  ? useGetProvinceGuildRoomPositionRequestInquiriesManager
                                  : type === "MainLocation"
                                  ? useGetMainLocationGuildRoomPositionRequestInquiriesManager
                                  : useGetCountyUnionPositionRequestInquiriesManager
                              }
                            />
                          </Collapse>
                        </Fragment>
                      ),
                    }
                  : {},
                // guarantors
                initialValues.status >
                  JobRequestStatus.WaitingForAttachmentsAndGuarantors && {
                  title: "ضامن های ثبت شده",
                  // color: "#28c76f",
                  icon: <File size={14} />,
                  customContent: (
                    <Fragment>
                      <Button
                        color="primary"
                        // id="reportToggler3"
                        outline
                        onClick={() => {
                          setIsGuarantorsOpen(!isGuarantorsOpen);
                        }}
                      >
                        مشاهده ضامن ها
                      </Button>
                      <hr />

                      <Collapse
                        style={{ marginTop: "30px" }}
                        isOpen={isGuarantorsOpen}
                        // toggler="#reportToggler3"
                      >
                        <GuarantorsList
                          getGuarantorsMutation={guarantorsDetailsMutation}
                          initialValues={initialValues}
                          isOpen={isGuarantorsOpen}
                        />
                      </Collapse>
                    </Fragment>
                  ),
                },
              ]}
            />
          </>
        )}

        {!isDetails &&
          !isManagerCartable &&
          initialValues.status ===
            JobRequestStatus.WattingForSelectBySecretariat && (
            <SelectComponent selectMutation={selectMutation} type={type} />
          )}

        {!isDetails &&
          isSecretariatCartable &&
          initialValues.status ===
            JobRequestStatus.InvestigationBySecretariat && (
            <CheckComponent isManagerCartable={isManagerCartable} type={type} />
          )}

        {!isDetails &&
          isManagerCartable &&
          initialValues.status === JobRequestStatus.InvestigationByManager && (
            <CheckComponent isManagerCartable={isManagerCartable} type={type} />
          )}

        {!isDetails &&
          !isManagerCartable &&
          (initialValues.status === JobRequestStatus.VisitedByApplicantUser ||
            initialValues.status === JobRequestStatus.RejectInquiryLetters ||
            initialValues.status ===
              JobRequestStatus.GiveMoneyBackAndWatingForArchive ||
            initialValues.status ===
              JobRequestStatus.WaitingForSignatureAndArchive) && (
            <SimpleSubmitButton
              isLoading={false}
              btnText="بایگانی درخواست"
              onCLick={() => setIsOpen(true)}
            />
          )}

        {!isDetails &&
          isManagerCartable &&
          initialValues.status === JobRequestStatus.ConfirmPayment && (
            <SubmitButton
              btnText="تایید تراکنش"
              clearable
              clearableTxt="رد تراکنش"
              clearableDisable={
                isActiveUpManager
                  ? isActiveUpManager.data && isActiveUpManager.data.data.result
                  : false
              }
              isClearableLoading={isActiveUpManager.isLoading}
              isLoading={false}
              onClear={() => setIsRejectPaymentOpen(true)}
              onClick={() => setIsAcceptPaymentOpen(true)}
            />
          )}

        {!isDetails &&
          isManagerCartable &&
          initialValues.status ===
            JobRequestStatus.SendInquiryLetterBySecretariat && (
            <SimpleSubmitButton
              isLoading={false}
              color="primary"
              btnText=" تایید درخواست استعلامات"
              onCLick={() => {
                setShowConfirmation(true);
              }}
            ></SimpleSubmitButton>
          )}

        {!isLoading && isManagerCartable && (
          <SimpleSubmitButton
            isLoading={false}
            className={Styles["change-secretariat"]}
            btnText={
              initialValues.status > 2 ? "تغییر دبیرخانه" : "تخصیص دبیرخانه"
            }
            onCLick={() => setIsChangeSecretariatOpen(true)}
          />
        )}

        <Row style={{ margin: "10px 0px" }}>
          {initialValues.status >
            JobRequestStatus.WaitingForAttachmentsAndGuarantors && (
            <Button color="primary" onClick={serveContractFile}>
              دانلود قرارداد
              {contractMutation.isLoading && (
                <Spinner
                  style={{ position: "relative", top: "-3px", right: "6px" }}
                  color="white"
                  size="sm"
                />
              )}
            </Button>
          )}
        </Row>
      </>
    </CardWrapper>
  );
};

export { SecretariatCheckJobRequests };
