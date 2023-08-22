import React, { useEffect, useState } from "react";
import { User } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Collapse, ListGroup, ListGroupItem, Row } from "reactstrap";
import { LicenseRequestStatusEnum } from "../../../../../../core/enums/license-request-status.enums";
import {
  useAcceptAfterVisit,
  useAcceptLicenseReqestExpertiseByExpert,
  useGetLicenseRequestDetailByExpert,
  useGetLicenseRequestHistoryByExpert,
  useRejectAfterVisit,
  useRejectLicenseReqestExpertiseByExpert,
} from "../../../../../../core/services/api";
import { SimpleSubmitButton } from "../../../../../common/Form";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Timeline from "../../../../../common/timeline";
import { CardWrapper } from "../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { StatusWrapper } from "../../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { CheckComponent } from "./CheckComponent/CheckComponent";
import Styles from "./DetailsPage.module.scss";
import { SetVisitDateModal } from "./SetVisitDateModal";
import { File } from "react-feather";
import { HistoryLicenseRequest } from "../HistoryLicenseRequest/HistoryLicenseRequest";
import { UserType } from "../../../../../../core/enums";
import { ProfilePictureServer } from "../../../../../common/ProfilePictureServer/ProfilePictureServer";
import { UserMachineInfo } from "../../../shared/UserMachineInfo/UserMachineInfo";
import { UserServicesInfo } from "../../../shared/UserServicesInfo/UserServicesInfo";
import { fullOption, gradeStatus } from "../../../../../../core/utils";
import { EducationFiledType } from "../../../../../../core/data/personal-info.data";

export interface IPropsType {}

const DetailsPageContainer: React.FC<IPropsType> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [licenseRequestDetails, setLicenseRequestDetails] = useState<any>(null); // edit type
  const [primaryInformation, setPrimaryInformation] = useState<any>(null); // edit type
  const [requesterUserRealInfo, setRequesterUserRealInfo] = useState<any>(null); // edit type
  const [requesterUserLegalInfo, setRequesterUserLegalInfo] =
    useState<any>(null); // edit type
  const [isVisitDate, setIsVisitDate] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const { isSuccess, data, isFetching, refetch } =
    useGetLicenseRequestDetailByExpert(+id);

  useEffect(() => {
    if (isSuccess) {
      if (data?.data.result.userType === UserType.Real) {
        setRequesterUserRealInfo(data?.data.result.requesterUserRealInfo);
      } else
        setRequesterUserLegalInfo(data?.data.result.requesterUserLegalInfo);
      setLicenseRequestDetails(data?.data.result.licenseRequestDetails);
      setPrimaryInformation(data?.data.result.primaryInformation);
    }
  }, [isSuccess, refetch, data]);

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
          <Timeline
            data={[
              {
                title: "اطلاعات متقاضی",
                color: "success",
                icon: <User size={14} />,
                customContent: requesterUserRealInfo ? (
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

                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              {`تحصیلات: ${
                                requesterUserRealInfo &&
                                fullOption(
                                  requesterUserRealInfo.educationLevel,
                                  gradeStatus
                                ).label
                              } `}
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              {`رشته: ${
                                requesterUserRealInfo &&
                                fullOption(
                                  requesterUserRealInfo.educationFiledEnum,
                                  EducationFiledType
                                ).label
                              } `}
                            </ListGroupItem>
                          </ListGroup>

                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              ماشین آلات :
                              <UserMachineInfo id={id} />
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              ادوات و خدمات :
                              <UserServicesInfo id={id} />
                            </ListGroupItem>
                          </ListGroup>
                        </ListGroup>
                      </Col>
                    </Row>
                  </>
                ) : (
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
                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              ماشین آلات :
                              <UserMachineInfo id={id} />
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              ادوات و خدمات :
                              <UserServicesInfo id={id} />
                            </ListGroupItem>
                          </ListGroup>
                        </ListGroup>
                      </Col>
                    </Row>
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
                          {primaryInformation.guildUnitTypeTitle.length > 0 && (
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              نوع واحد صنفی:
                              {primaryInformation.guildUnitTypeTitle}
                            </ListGroupItem>
                          )}
                          {primaryInformation.statusOfGuildUnitTitle.length >
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
                          {primaryInformation.carSupplyTitle ? (
                            primaryInformation.carSupplyTitle.length > 0 && (
                              <ListGroupItem
                                className={Styles["item-flex"]}
                                tag="a"
                              >
                                حمل و نقل:
                                {primaryInformation.carSupplyTitle}
                              </ListGroupItem>
                            )
                          ) : (
                            <></>
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
                  </ListGroup>
                ),
              },
              {
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
                        getMutation={useGetLicenseRequestHistoryByExpert}
                        isOpen={isHistoryOpen}
                        id={+id}
                      />
                    </Collapse>
                    <hr />
                  </>
                ),
              },
            ]}
          />
          <StatusWrapper
            curStatus={[licenseRequestDetails && licenseRequestDetails.status]}
            guildStatus={[LicenseRequestStatusEnum.WaitingForExpert]}
          >
            <CheckComponent
              rejectType="RejectByExpertReasonTypeEnum"
              refetch={refetch}
              acceptMutation={useAcceptLicenseReqestExpertiseByExpert}
              rejectMutation={useRejectLicenseReqestExpertiseByExpert}
            />
          </StatusWrapper>

          <StatusWrapper
            curStatus={[licenseRequestDetails && licenseRequestDetails.status]}
            guildStatus={[LicenseRequestStatusEnum.AcceptingAfterVisit]}
          >
            <CheckComponent
              isFromAfterVisit={true}
              refetch={refetch}
              acceptMutation={useAcceptAfterVisit}
              rejectMutation={useRejectAfterVisit}
              rejectType="RejectAfterVisitByExpertReasonTypeEnum"
              isSecondCheck
            />
          </StatusWrapper>

          <StatusWrapper
            curStatus={[licenseRequestDetails && licenseRequestDetails.status]}
            guildStatus={[
              LicenseRequestStatusEnum.SetingLicenseRequestVisitDate,
            ]}
          >
            <SimpleSubmitButton
              isLoading={false}
              btnText="اعلام قرار بازدید"
              onCLick={() => setIsVisitDate(true)}
              className="mt-2"
            />
          </StatusWrapper>
        </>
      )}
    </CardWrapper>
  );
};

export { DetailsPageContainer };
