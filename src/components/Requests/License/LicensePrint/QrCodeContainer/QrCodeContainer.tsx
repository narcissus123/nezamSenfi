import React, { FC, useEffect, useState,} from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { useGetLicenseByQrCode } from "../../../../../core/services/api";
import { FormDivider } from "../../../../common/Form";
import { ProfilePictureServer } from "../../../../common/ProfilePictureServer/ProfilePictureServer";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from './QrCodeContainer.module.scss';

interface IPropTypes {}

const QrCodeContainer: FC<IPropTypes> = ({}) => {
  const [details, setDetails] = useState<any>(null);

  const getMutation = useGetLicenseByQrCode();

  const { qrcode } = useParams<any>();

  useEffect(() => {
    getMutation.mutate(
      { qrCode: qrcode },
      {
        onSuccess: (val: any) => {
          setDetails(val.data.result);
        },
      }
    );
  }, []);

  return (
    <Card style={{ height: "100vh" }}>
      <CardHeader>
        <CardTitle>مشخصات پروانه</CardTitle>
      </CardHeader>

      {details ? (
        <CardBody>
          <FormDivider textHeader="مشخصات متقاضی">
            <CardBody>
              <Row>
                <Col md="3">
                  <ProfilePictureServer
                    profilePic={
                      details ? details.requesterProfilePicFullName : null
                    }
                  />
                </Col>
                <Col md="9" className="d-flex align-content-center flex-wrap">
                  <ListGroup tag="div" style={{ flex: 1 }}>
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        <Link
                          target="_blank"
                          to={`/UserList/RealUsersList/
                                }`}
                        >
                          نام متقاضی : {details ? details.requesterName : ""}{" "}
                          {details ? details.requesterLastName : ""}
                        </Link>
                      </ListGroupItem>

                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        محل تولد :{" "}
                        {details ? details.requesterIssuingPlace : ""}{" "}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        نام پدر :{details ? details.requesterFatherName : ""}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        تاریخ تولد : {details ? details.requesterBirthDate : ""}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        شهر محل سکونت :{" "}
                        {details ? details.cityOrVillageTitle : ""}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        کد ملی : {details ? details.requesterNationalCode : ""}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        شماره شناسنامه :{" "}
                        {details ? details.requesterIdNumber : ""}
                      </ListGroupItem>
                    </ListGroup>
                  </ListGroup>
                </Col>
              </Row>
            </CardBody>
          </FormDivider>

          <FormDivider textHeader="مشخصات پروانه">
            <CardBody>
              <Row>
                <Col md="12">
                  <ListGroup tag="div" style={{ flex: 1 }}>
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        تاریخ شروع پروانه : {details ? details.startDate : ""}
                      </ListGroupItem>

                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        تاریخ پایان پروانه : {details ? details.endDate : ""}{" "}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        وضعیت پروانه :
                        {details ? details.finalLicenseStatusEnumTitle : ""}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        شغل اصلی : {details ? details.mainJobTitle : ""}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        شهر محل سکونت :{" "}
                        {details ? details.cityOrVillageTitle : ""}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        اتحادیه : {details ? details.countyUnionTitle : ""}
                      </ListGroupItem>
                    </ListGroup>
                  </ListGroup>
                </Col>
              </Row>
            </CardBody>
          </FormDivider>
        </CardBody>
      ) : (
        <FallBackSpinner />
      )}
    </Card>
  );
};

export { QrCodeContainer };
