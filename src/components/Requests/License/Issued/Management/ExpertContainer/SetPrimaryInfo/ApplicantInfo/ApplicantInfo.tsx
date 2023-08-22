import React, { FC, useEffect, useState } from "react";
import { User } from "react-feather";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { EducationFiledType } from "../../../../../../../../core/data/personal-info.data";
import { getAccessToken } from "../../../../../../../../core/services/authentication/authentication.service";
import { fullOption, gradeStatus } from "../../../../../../../../core/utils";
import { ShowImage } from "../../../../../../../common/DownloadRow/ShowImage/ShowImage";
import { FormDivider } from "../../../../../../../common/Form";
import { ProfilePictureServer } from "../../../../../../../common/ProfilePictureServer/ProfilePictureServer";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { UserMachineInfo } from "../../../../../shared/UserMachineInfo/UserMachineInfo";
import { UserServicesInfo } from "../../../../../shared/UserServicesInfo/UserServicesInfo";
import Styles from "./ApplicantInfo.module.scss";

interface IUserType {
  birthDate: string;
  cellphone: string;
  email: string;
  fathersName: string;
  nationalId: string;
  genderTitle: string;
  idNumber: string;
  lastName: string;
  name: string;
  nationalCode: string;
  postalCode: string;
  companyTypeTitle: string;
  economicCode: string;
  registrationNumber: string;
  companyRegistrationDateJalali: string;
  companyRegistrationPlace: string;
  profilePicture: string;
  educationFiledEnum: string;
  educationLevel: string;
}
interface IPropTypes {
  isLoading: boolean;
  requesterUserInfo: IUserType;
  isReal: boolean;
}

const ApplicantInfo: FC<IPropTypes> = ({
  isLoading,
  requesterUserInfo,
  isReal,
}) => {

  const { id } = useParams<{ id: string }>();
  
  return (
    <Card>
      <CardBody>
        <FormDivider textHeader="اطلاعات متقاضی">
          {isLoading ? (
            <FallBackSpinner setHeight={300} />
          ) : (
            <>
              {isReal ? (
                <>
                  <Row>
                    <Col md="3">
                      <ProfilePictureServer
                        profilePic={
                          requesterUserInfo && requesterUserInfo.profilePicture
                            ? requesterUserInfo.profilePicture
                            : null
                        }
                      />
                    </Col>
                    <Col md="9">
                      <CardBody>
                        <ListGroup tag="div">
                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              نام متقاضی :{" "}
                              {requesterUserInfo && requesterUserInfo.name}{" "}
                              {requesterUserInfo && requesterUserInfo.lastName}
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              {`جنسیت : ${
                                requesterUserInfo &&
                                requesterUserInfo.genderTitle
                              }`}
                            </ListGroupItem>
                          </ListGroup>

                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              نام پدر :{" "}
                              {requesterUserInfo &&
                                requesterUserInfo.fathersName}
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              تاریخ تولد :{" "}
                              {requesterUserInfo && requesterUserInfo.birthDate}
                            </ListGroupItem>
                          </ListGroup>

                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              تلفن همراه :{" "}
                              {requesterUserInfo && requesterUserInfo.cellphone}
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              ایمیل :{" "}
                              {requesterUserInfo && requesterUserInfo.email}
                            </ListGroupItem>
                          </ListGroup>

                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              کد ملی :{" "}
                              {requesterUserInfo &&
                                requesterUserInfo.nationalCode}
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              شماره شناسنامه :{" "}
                              {requesterUserInfo && requesterUserInfo.idNumber}
                            </ListGroupItem>
                          </ListGroup>

                          <ListGroup className="list-group-horizontal-sm">
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              {`تحصیلات: ${
                                requesterUserInfo &&
                                fullOption(
                                  requesterUserInfo.educationLevel,
                                  gradeStatus
                                ).label
                              } `}
                            </ListGroupItem>
                            <ListGroupItem
                              className={Styles["item-flex"]}
                              tag="a"
                            >
                              {`رشته: ${
                                requesterUserInfo &&
                                fullOption(
                                  requesterUserInfo.educationFiledEnum,
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
                      </CardBody>
                    </Col>
                  </Row>
                </>
              ) : (
                <CardBody>
                  <ListGroup tag="div">
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        نام شرکت : {requesterUserInfo && requesterUserInfo.name}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`شناسه ملی : ${
                          requesterUserInfo && requesterUserInfo.nationalId
                        }`}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        نوع شرکت :{" "}
                        {requesterUserInfo &&
                          requesterUserInfo.companyTypeTitle}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        کد اقتصادی :{" "}
                        {requesterUserInfo && requesterUserInfo.economicCode}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        تلفن :{" "}
                        {requesterUserInfo && requesterUserInfo.cellphone}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        ایمیل : {requesterUserInfo && requesterUserInfo.email}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        شماره ثبت :{" "}
                        {requesterUserInfo &&
                          requesterUserInfo.registrationNumber}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        تاریخ ثبت شرکت :{" "}
                        {requesterUserInfo &&
                          requesterUserInfo.companyRegistrationDateJalali}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        مکان ثبت شرکت :
                        {requesterUserInfo &&
                          requesterUserInfo.companyRegistrationPlace}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        ماشین آلات :
                        <UserMachineInfo id={id} />
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        ادوات و خدمات :
                        <UserServicesInfo id={id} />
                      </ListGroupItem>
                    </ListGroup>
                  </ListGroup>
                </CardBody>
              )}
            </>
          )}
        </FormDivider>
      </CardBody>
    </Card>
  );
};

export { ApplicantInfo };
