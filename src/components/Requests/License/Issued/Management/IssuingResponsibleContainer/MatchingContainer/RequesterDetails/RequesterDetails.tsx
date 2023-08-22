import React, { FC } from "react";
import { User } from "react-feather";
import { Link } from "react-router-dom";
import { Alert, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import {
  useConfirmUserApplicantMacthing,
  useRejectUserApplicantMatching,
} from "../../../../../../../../core/services/api";
import { ProfilePictureServer } from "../../../../../../../common/ProfilePictureServer/ProfilePictureServer";
import Timeline from "../../../../../../../common/timeline";
import { CheckComponent } from "./CheckComponent/CheckComponent";
import Styles from "./RequesterDetails.module.scss";

interface IPropTypes {
  requesterUserRealInfo: any;
  requesterUserLegalInfo: any;
  requestInfo: any;
  refetch: any;
}
const RequesterDetails: FC<IPropTypes> = ({
  requesterUserRealInfo,
  requesterUserLegalInfo,
  requestInfo: initialValues,
  refetch,
}) => {
  // console.log("---dd--", initialValues);

  return (
    <>
      {initialValues.rejectUserApplicantStatusTitle && (
        <Alert color="info">
          {initialValues.rejectUserApplicantStatusTitle}
        </Alert>
      )}
      <Row>
        <Col>
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
                            <ListGroup tag="div" style={{ flex: 1 }} >
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
                            <ListGroup tag="div" style={{ flex: 1 }} >
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
                title: "جزئیات درخواست",
                color: "success",
                icon: <User size={14} />,
                customContent: (
                  <ListGroup tag="div">
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`شغل: ${initialValues.unionUseTypeJobTitle}`}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`نوع واحد صنفی: ${initialValues.fixedOrMobieTypeTitle}`}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`موقعیت: ${initialValues.cityOrVillageTitle}`}
                      </ListGroupItem>
                      {initialValues.fixedOrMobieType === 1 && (
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`تعداد قطعات: ${initialValues.countOFAreas}`}
                        </ListGroupItem>
                      )}
                    </ListGroup>

                    {initialValues.fixedOrMobieType === 1 && (
                      <ListGroup className="list-group-horizontal-sm">
                        {initialValues.area && (
                          <ListGroupItem
                            className={Styles["item-flex"]}
                            tag="a"
                          >
                            {`مساحت بزرگترین قطعه: ${initialValues.area}`}
                          </ListGroupItem>
                        )}
                        {initialValues.allArea && (
                          <ListGroupItem
                            className={Styles["item-flex"]}
                            tag="a"
                          >
                            {`مجموع مساحت قطعات: ${initialValues.allArea}`}
                          </ListGroupItem>
                        )}
                      </ListGroup>
                    )}

                    {initialValues.fixedOrMobieType === 1 && (
                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`مساحت تاسیسات واحد صنفی: ${initialValues.facilitisArea}`}
                        </ListGroupItem>
                      </ListGroup>
                    )}
                    {initialValues && initialValues.description && (
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        توضیحات :{" "}
                        {initialValues ? initialValues.description : ""}
                      </ListGroupItem>
                    )}
                  </ListGroup>
                ),
              },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CheckComponent
            acceptMutation={useConfirmUserApplicantMacthing}
            refetch={refetch}
            acceptStep={initialValues.rejectUserApplicantStatus === 3}
            rejectStep={
              initialValues.rejectUserApplicantStatus !== 0 &&
              initialValues.rejectUserApplicantStatus !== 2
            }
            rejectMutation={useRejectUserApplicantMatching}
          />
        </Col>
      </Row>
    </>
  );
};

export { RequesterDetails };
