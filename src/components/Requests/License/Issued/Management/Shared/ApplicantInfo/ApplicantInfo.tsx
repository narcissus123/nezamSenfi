import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Card, CardBody, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { FormDivider } from "../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./ApplicantInfo.module.scss";
import { UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../../../../../../core/models/axios-result.model";
import { FullOptionSel } from "../../../../../../../core/models";
import { UserType } from "../../../../../../../core/enums";
import { RejectExpertStatusEnum } from "../../../../../../../core/enums/reject-expert-status.enums";
import { ProfilePictureServer } from "../../../../../../common/ProfilePictureServer/ProfilePictureServer";
import { UserMachineInfo } from "../../../../shared/UserMachineInfo/UserMachineInfo";
import { UserServicesInfo } from "../../../../shared/UserServicesInfo/UserServicesInfo";
import { fullOption, gradeStatus } from "../../../../../../../core/utils";
import { EducationFiledType } from "../../../../../../../core/data/personal-info.data";

interface IUserType {
  birthDate: string;
  cellphone: string;
  email: string;
  fathersName: string;
  genderTitle: string;
  idNumber: string;
  lastName: string;
  name: string;
  nationalCode: string;
  postalCode: string;
  userId: number;
  nationalId: string;
  companyTypeTitle: string;
  economicCode: string;
  registrationNumber: string;
  companyRegistrationDateJalali: string;
  companyRegistrationPlace: string;
  setCountyId?: any
}

interface IPropTypes {
  req_id: string;
  useGetLicenseRequestDetail: any;
  setFixedOrMobieTypeByExpert?: (val: number) => void;
  setJobs?: (val: any) => void;
  setRejectedExpertize?: (val: boolean) => void;
  setCountyId?: any,
}

const ApplicantInfo: FC<IPropTypes> = ({
  req_id,
  useGetLicenseRequestDetail,
  setFixedOrMobieTypeByExpert,
  setJobs,
  setRejectedExpertize,
  setCountyId,
}) => {
  const { isSuccess, data, isLoading, refetch } = useGetLicenseRequestDetail(
    +req_id
  );
  const [requesterUserRealInfo, setRequesterUserRealInfo] = useState<any>(null); // edit type
  const [requesterUserLegalInfo, setRequesterUserLegalInfo] =
    useState<any>(null); // edit type

  useEffect(() => {
    if (isSuccess) {
      try {
        if (
          data?.data.result.licenseRequestDetails &&
          data?.data.result.licenseRequestDetails.rejectExpertStatus ===
            RejectExpertStatusEnum.Reject
        ) {
          setRejectedExpertize && setRejectedExpertize(true);
        }

        if (
          data?.data.result.licenseRequestDetails &&
          data?.data.result.licenseRequestDetails.rejectExpertStatus ===
            RejectExpertStatusEnum.Reject
        ) {
          setRejectedExpertize && setRejectedExpertize(true);
        }

        if (
          data?.data.result.licenseRequestDetails && setCountyId
        ) {
          setCountyId(data?.data.result.licenseRequestDetails.countyId);
        }
        if (data?.data.result.userType === UserType.Real) {
          setRequesterUserRealInfo(data?.data.result.requesterUserRealInfo);
        } else
          setRequesterUserLegalInfo(data?.data.result.requesterUserLegalInfo);

        if (setFixedOrMobieTypeByExpert) {
          setFixedOrMobieTypeByExpert(
            data
              ? data.data.result.primaryInformation.fixedOrMobieTypeByExpert
              : 1
          );
        }
        if (setJobs) {
          const jobs = data?.data.result.primaryInformation.jobs;
          let jobList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];
          jobs.forEach((job: any) => {
            jobList[0].options.push({ value: job.id, label: job.title });
          });
          setJobs(jobList);
        }

      } catch (error) { console.log('-erorr--', error);
      }
    }
  }, [isSuccess, data]);

  console.log("-- ", requesterUserRealInfo, requesterUserLegalInfo);
  

  return (
    <Card>
      <CardBody>
        <FormDivider textHeader="اطلاعات متقاضی">
          <CardBody>
            {isLoading ? (
              <FallBackSpinner setHeight={300} />
            ) : (
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
                              <UserMachineInfo id={req_id} />
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              ادوات و خدمات :
                              <UserServicesInfo id={req_id} />
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
            )}
          </CardBody>
        </FormDivider>
      </CardBody>
    </Card>
  );
};

export { ApplicantInfo };
