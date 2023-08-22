import React, { useEffect, useState } from "react";
import { Calendar, User } from "react-feather";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Collapse,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { File } from "react-feather";
import { LicenseRequestStatusEnum } from "../../../../../../../../core/enums/license-request-status.enums";
import {
  useConfirmJahadIdeaByIssuingResponsible,
  useDownloadLetterOfIntersctionForDIstrictCourt,
  useGetLicenseRequestDetailByIssuingResponsible,
  useGetLicenseRequestHistoryByIssuingResponsible,
  useSelectLicenseRequestByUnionIssuingResponsible,
  useServeLicenseRequestFile,
} from "../../../../../../../../core/services/api";
import {
  FormDivider,
  SimpleSubmitButton,
} from "../../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Timeline from "../../../../../../../common/timeline";
import { CardWrapper } from "../../../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { StatusWrapper } from "../../../../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { HistoryLicenseRequest } from "../../../HistoryLicenseRequest/HistoryLicenseRequest";
import { ConfirmJahadIdea } from "../../FacilityAndOperationLicense/ConfirmJahadIdea/ConfirmJahadIdea";
import { JahadLetterOperations } from "../../FacilityAndOperationLicense/JahadLetterOperations/JahadLetterOperations";
import Styles from "./RequestDetails.module.scss";
import { SectionsList } from "./SectionsList/SectionsList";
import { SelectComponent } from "./SelectComponent";
import { SetVisitDateModal } from "./SetVisitDateModal/SetVisitDateModal";
import { UserType } from "../../../../../../../../core/enums";
import { ProfilePictureServer } from "../../../../../../../common/ProfilePictureServer/ProfilePictureServer";
import { PrintRequestList } from "./PrintRequestList";

export interface IPropsType {
  isFromCartable?: boolean;
}

const RequestDetails: React.FC<IPropsType> = ({ isFromCartable }) => {
  const { id } = useParams<{ id: string }>();
  const [licenseRequestDetails, setLicenseRequestDetails] = useState<any>(null); // edit type
  const [primaryInformation, setPrimaryInformation] = useState<any>(null); // edit type
  const [requesterUserRealInfo, setRequesterUserRealInfo] = useState<any>(null); // edit type
  const [requesterUserLegalInfo, setRequesterUserLegalInfo] =
    useState<any>(null); // edit type
  const [isVisitDate, setIsVisitDate] = useState<boolean>(false);
  const [sections, setSections] = useState<any>(null); // edit type
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isConfirmingJahadIdea, setIsConfirmingJahadIdea] =
    useState<boolean>(false);

  const { isSuccess, data, isFetching, refetch } =
    useGetLicenseRequestDetailByIssuingResponsible(+id);

  const getdistrictLetterMutation =
    useDownloadLetterOfIntersctionForDIstrictCourt();

  useEffect(() => {
    if (isSuccess) {
      setLicenseRequestDetails(data?.data.result.licenseRequestDetails);
      setPrimaryInformation(data?.data.result.primaryInformation);
      if (data?.data.result.userType === UserType.Real) {
        setRequesterUserRealInfo(data?.data.result.requesterUserRealInfo);
      } else
        setRequesterUserLegalInfo(data?.data.result.requesterUserLegalInfo);

      let sections: any = [];
      data?.data.result.sections.forEach((sec: any) => {
        sections.push({
          ...sec,
          roundedArea: parseFloat(sec.area).toFixed(2),
          roundedPerimeter: parseFloat(sec.perimeter).toFixed(2),
        });
      });
      setSections(sections);
    }
  }, [isSuccess, refetch, data]);

  const downloadDistrictLetter = () => {
    getdistrictLetterMutation.mutate(+id);
  };

  return (
    <CardWrapper text="بررسی درخواست پروانه">
      {isFetching &&
      !licenseRequestDetails &&
      !primaryInformation &&
      (!requesterUserRealInfo || !requesterUserLegalInfo) ? (
        <FallBackSpinner />
      ) : (
        <>
          <SetVisitDateModal
            isOpen={isVisitDate}
            toggleModal={() => setIsVisitDate(false)}
          />
          <ConfirmJahadIdea
            title="تایید نظر جهاد"
            isOpen={isConfirmingJahadIdea}
            toggleModal={() => setIsConfirmingJahadIdea(false)}
            sendMutation={useConfirmJahadIdeaByIssuingResponsible}
          />
          <Timeline
            data={[
              {
                title: "اطلاعات متقاضی",
                color: "success",
                icon: <User size={14} />,
                customContent: (
                  <>
                    {requesterUserRealInfo ? (
                      <>
                        <Row>
                          <Col md="3">
                            <ProfilePictureServer
                              profilePic={
                                requesterUserRealInfo
                                  ? requesterUserRealInfo.profilePicture
                                  : requesterUserLegalInfo
                                  ? requesterUserLegalInfo.profilePic
                                  : null
                              }
                            />
                          </Col>
                          <Col
                            md="9"
                            className="d-flex align-content-center flex-wrap"
                          >
                            {" "}
                            <ListGroup tag="div" style={{ flex: 1 }}>
                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  <Link
                                    target="_blank"
                                    to={`/UserList/RealUsersList/${
                                      requesterUserRealInfo &&
                                      requesterUserRealInfo.userId
                                    }`}
                                  >
                                    نام متقاضی :{" "}
                                    {requesterUserRealInfo
                                      ? requesterUserRealInfo.name
                                      : ""}{" "}
                                    {requesterUserRealInfo
                                      ? requesterUserRealInfo.lastName
                                      : ""}
                                  </Link>
                                </ListGroupItem>

                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  {`جنسیت : ${
                                    requesterUserRealInfo
                                      ? requesterUserRealInfo.genderTitle
                                      : ""
                                  }`}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  نام پدر :{" "}
                                  {requesterUserRealInfo
                                    ? requesterUserRealInfo.fathersName
                                    : ""}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  تاریخ تولد :{" "}
                                  {requesterUserRealInfo
                                    ? requesterUserRealInfo.birthDate
                                    : ""}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  تلفن همراه :{" "}
                                  {requesterUserRealInfo
                                    ? requesterUserRealInfo.cellphone
                                    : ""}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  ایمیل :{" "}
                                  {requesterUserRealInfo
                                    ? requesterUserRealInfo.email
                                    : ""}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  کد ملی :{" "}
                                  {requesterUserRealInfo
                                    ? requesterUserRealInfo.idNumber
                                    : ""}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  شماره شناسنامه :{" "}
                                  {requesterUserRealInfo
                                    ? requesterUserRealInfo.nationalCode
                                    : ""}
                                </ListGroupItem>
                              </ListGroup>
                            </ListGroup>
                          </Col>
                        </Row>
                      </>
                    ) : requesterUserLegalInfo ? (
                      <>
                        <Row>
                          <Col md="3">
                            <ProfilePictureServer
                              profilePic={
                                requesterUserRealInfo
                                  ? requesterUserRealInfo.profilePicture
                                  : requesterUserLegalInfo
                                  ? requesterUserLegalInfo.profilePic
                                  : null
                              }
                            />
                          </Col>
                          <Col
                            md="9"
                            className="d-flex align-content-center flex-wrap"
                          >
                            {" "}
                            <ListGroup tag="div" style={{ flex: 1 }}>
                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  <Link
                                    target="_blank"
                                    to={`/UserList/RealUsersList/${
                                      requesterUserLegalInfo &&
                                      requesterUserLegalInfo.userId
                                    }`}
                                  >
                                    نام شرکت :{" "}
                                    {requesterUserLegalInfo &&
                                      requesterUserLegalInfo.name}
                                  </Link>
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  {`شناسه ملی : ${
                                    requesterUserLegalInfo &&
                                    requesterUserLegalInfo.nationalId
                                  }`}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  نوع شرکت :{" "}
                                  {requesterUserLegalInfo &&
                                    requesterUserLegalInfo.companyTypeTitle}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  کد اقتصادی :{" "}
                                  {requesterUserLegalInfo &&
                                    requesterUserLegalInfo.economicCode}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  تلفن :{" "}
                                  {requesterUserLegalInfo &&
                                    requesterUserLegalInfo.cellphone}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  ایمیل :{" "}
                                  {requesterUserLegalInfo &&
                                    requesterUserLegalInfo.email}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  شماره ثبت :{" "}
                                  {requesterUserLegalInfo &&
                                    requesterUserLegalInfo.registrationNumber}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  تاریخ ثبت شرکت :{" "}
                                  {requesterUserLegalInfo &&
                                    requesterUserLegalInfo.companyRegistrationDateJalali}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  مکان ثبت شرکت :{" "}
                                  {requesterUserLegalInfo &&
                                    requesterUserLegalInfo.companyRegistrationPlace}
                                </ListGroupItem>
                              </ListGroup>
                            </ListGroup>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <Alert color="info">
                        مشکلی رخ داده است لطفا چند لحظه دیگر دوباره امتحان کنید!
                      </Alert>
                    )}
                  </>
                ),
              },

              {
                title: "اطلاعات درخواست پروانه",
                color: "success",
                icon: <User size={14} />,
                customContent: (
                  <ListGroup tag="div">
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {licenseRequestDetails
                          ? licenseRequestDetails.unionUseTypeJobTitle
                          : ""}{" "}
                        : شغل
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        نوع کاربری:{" "}
                        {licenseRequestDetails
                          ? licenseRequestDetails.useTypeTitle
                          : ""}
                      </ListGroupItem>
                    </ListGroup>
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        نوع واحد صنفی:{" "}
                        {licenseRequestDetails
                          ? licenseRequestDetails.fixedOrMobieTypeTitle
                          : ""}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        موقعیت:{" "}
                        {licenseRequestDetails
                          ? licenseRequestDetails.cityOrVillageTitle
                          : ""}
                      </ListGroupItem>
                    </ListGroup>
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        وضعیت:{" "}
                        {licenseRequestDetails
                          ? licenseRequestDetails.statusTitle
                          : ""}
                      </ListGroupItem>
                      {licenseRequestDetails &&
                        licenseRequestDetails.countOFAreas > 0 && (
                          <ListGroupItem
                            className={Styles["item-flex"]}
                            tag="a"
                          >
                            تعداد قطعات: {licenseRequestDetails.countOFAreas}
                          </ListGroupItem>
                        )}
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      {licenseRequestDetails && licenseRequestDetails.area > 0 && (
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          مساحت بزرگترین قطعه: {licenseRequestDetails.area}
                        </ListGroupItem>
                      )}
                      {licenseRequestDetails &&
                        licenseRequestDetails.allArea > 0 && (
                          <ListGroupItem
                            className={Styles["item-flex"]}
                            tag="a"
                          >
                            مجموع مساحت قطعات : {licenseRequestDetails.allArea}
                          </ListGroupItem>
                        )}
                    </ListGroup>

                    {primaryInformation &&
                      (primaryInformation.guildUnitTypeTitle ||
                        primaryInformation.statusOfGuildUnitTitle) && (
                        <ListGroup className="list-group-horizontal-sm">
                          {primaryInformation.guildUnitTypeTitle &&
                            primaryInformation.guildUnitTypeTitle.length >
                              0 && (
                              <ListGroupItem
                                className={Styles["item-flex"]}
                                tag="a"
                              >
                                نوع واحد صنفی:
                                {primaryInformation.guildUnitTypeTitle}
                              </ListGroupItem>
                            )}
                          {primaryInformation.statusOfGuildUnitTitle &&
                            primaryInformation.statusOfGuildUnitTitle.length >
                              0 && (
                              <ListGroupItem
                                className={Styles["item-flex"]}
                                tag="a"
                              >
                                وضعیت واحد صنفی :
                                {primaryInformation.statusOfGuildUnitTitle}
                              </ListGroupItem>
                            )}
                        </ListGroup>
                      )}
                    {primaryInformation &&
                      (primaryInformation.carSupplyTitle ||
                        primaryInformation.licenseTypeEnumTitle) && (
                        <ListGroup className="list-group-horizontal-sm">
                          {primaryInformation.carSupplyTitle.length > 0 && (
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              حمل و نقل:
                              {primaryInformation.carSupplyTitle}
                            </ListGroupItem>
                          )}
                          {primaryInformation.licenseTypeEnumTitle &&
                            primaryInformation.licenseTypeEnumTitle.length >
                              0 && (
                              <ListGroupItem
                                className={Styles["item-flex"]}
                                tag="a"
                              >
                                نوع درخواست:
                                {primaryInformation.licenseTypeEnumTitle}
                              </ListGroupItem>
                            )}
                        </ListGroup>
                      )}
                    {licenseRequestDetails &&
                      licenseRequestDetails.description && (
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          توضیحات :{" "}
                          {licenseRequestDetails
                            ? licenseRequestDetails.description
                            : ""}
                        </ListGroupItem>
                      )}

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        شغل :{" "}
                        {primaryInformation ? (
                          primaryInformation.jobs ? (
                            <>
                              <ul>
                                {primaryInformation.jobs.map((row: any) => {
                                  return (
                                    <li>{`${row.title} ${
                                      row.isMain ? "- شغل اصلی" : ""
                                    }`}</li>
                                  );
                                })}
                              </ul>
                            </>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </ListGroupItem>
                    </ListGroup>
                  </ListGroup>
                ),
              },
              isFromCartable
                ? {
                    title: "تاریخچه درخواست",
                    color: "success",
                    icon: <File size={14} />,
                    customContent: (
                      <>
                        <Button
                          color="primary"
                          outline
                          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                        >
                          مشاهده تاریخچه
                        </Button>

                        <Collapse isOpen={isHistoryOpen}>
                          <HistoryLicenseRequest
                            getMutation={
                              useGetLicenseRequestHistoryByIssuingResponsible
                            }
                            isOpen={isHistoryOpen}
                            id={+id}
                          />
                        </Collapse>
                        <hr />
                      </>
                    ),
                  }
                : {},
              isFromCartable
                ? {
                    title: `${
                      primaryInformation &&
                      primaryInformation.fixedOrMobieTypeByExpert === 1
                        ? "جزییات قطعات"
                        : "جزییات کارشناسی"
                    }`,
                    color: "success",
                    icon: <Calendar size={14} />,
                    customContent: (
                      <FormDivider
                        textHeader={
                          primaryInformation &&
                          primaryInformation.fixedOrMobieTypeByExpert === 1
                            ? "لیست قطعات"
                            : "جزییات کارشناسی"
                        }
                      >
                        {primaryInformation &&
                        primaryInformation.fixedOrMobieTypeByExpert === 1 ? (
                          <>
                            {sections && sections.length > 0 && (
                              <SectionsList sections={sections} />
                            )}
                            {sections && sections.length === 0 && (
                              <Alert color="info" className="mt-1">
                                قطعه ای موجود نمی باشد!
                              </Alert>
                            )}
                          </>
                        ) : (
                          <>
                            <>
                              <Alert
                                color="primary"
                                className="d-flex justify-content-center align-items-center mt-1"
                              >
                                <Link
                                  target="_blank"
                                  to={`/IssueingResponsible/Inspection/10/Capacity/${id}`}
                                >
                                  <SimpleSubmitButton
                                    btnText="جزئیات کارشناسی"
                                    isLoading={false}
                                    className="mr-1"
                                    onCLick={() => {}}
                                  />
                                </Link>

                                <p>نوع واحد صنفی این درخواست سیار میباشد.</p>
                              </Alert>
                            </>
                          </>
                        )}
                      </FormDivider>
                    ),
                  }
                : {},
              {
                title: "قطعات",
                color: "success",
                icon: <File size={14} />,
                customContent: <PrintRequestList sections={sections} />,
              },
            ]}
          />
          <StatusWrapper
            curStatus={[licenseRequestDetails && licenseRequestDetails.status]}
            guildStatus={[
              LicenseRequestStatusEnum.WaitingForIssuingResponsible,
            ]}
          >
            <SelectComponent
              selectMutation={useSelectLicenseRequestByUnionIssuingResponsible}
            />
          </StatusWrapper>

          <StatusWrapper
            curStatus={[licenseRequestDetails && licenseRequestDetails.status]}
            guildStatus={[
              LicenseRequestStatusEnum.WattingForRequestOriginalDocuments,
            ]}
          >
            <>
              {isFromCartable && (
                <SimpleSubmitButton
                  isLoading={false}
                  btnText="اعلام زمان دریافت اسناد"
                  onCLick={() => setIsVisitDate(true)}
                  className="mt-2"
                />
              )}
            </>
          </StatusWrapper>
          <StatusWrapper
            curStatus={[licenseRequestDetails && licenseRequestDetails.status]}
            guildStatus={[
              LicenseRequestStatusEnum.WatingForIssuingResponsibleConformationOfJahadIdea,
            ]}
          >
            <Col md="auto">
              <SimpleSubmitButton
                type="button"
                btnText="تایید نظر جهاد"
                isLoading={false}
                onCLick={() => setIsConfirmingJahadIdea(true)}
                className="mr-1"
              />
            </Col>
          </StatusWrapper>

          <Row style={{ margin: "25px 0px" }}>
            <StatusWrapper
              curStatus={[
                licenseRequestDetails && licenseRequestDetails.status,
              ]}
              guildStatus={[
                LicenseRequestStatusEnum.WatingForJahadInvastigation,
                LicenseRequestStatusEnum.WatingForIssuingResponsibleConformationOfJahadIdea,
                LicenseRequestStatusEnum.WatingForIssuingResponsibleRejectionOfJahadIdea,
              ]}
            >
              <>{isFromCartable && <JahadLetterOperations />}</>
            </StatusWrapper>
          </Row>

          {/* <Row style={{ margin: "25px 0px" }}>
            <Col>
              <StatusWrapper
                curStatus={[
                  licenseRequestDetails && licenseRequestDetails.status,
                ]}
                guildStatus={[LicenseRequestStatusEnum.WatingForDistrictCourt]}
              >
                {isFromCartable && (
                  <SimpleSubmitButton
                    type="button"
                    isLoading={
                      getdistrictLetterMutation.isLoading ||
                      getdistrictLetterMutation.isLoading
                    }
                    btnText="دانلود نامه هیئت بدوی"
                    onCLick={downloadDistrictLetter}
                  />
                )}
              </StatusWrapper>
            </Col>
          </Row> */}
        </>
      )}
    </CardWrapper>
  );
};

export { RequestDetails };
