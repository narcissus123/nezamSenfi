import React, { FC, useEffect, useState } from "react";
import { User } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Collapse, ListGroup, ListGroupItem, Row } from "reactstrap";
import { useGetMyAllCancellationReasonByLicenecnseRequestId } from "../../../../../core/services/api/cancelation.api";
import Styles from './LicenseDetails.module.scss';
import Timeline from "../../../../common/timeline";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { File } from 'react-feather'
import { RequesterDetails } from "./RequesterDetails/RequesterDetails";
import { LicenseDetailsApiCall } from "./LicenseDetailsApiCall/LicenseDetailsApiCall";
import { useGetCancellationJobRequireDocument } from "../../../../../core/services/api/job.api";


interface IPropTypes {
  isApplicant?: boolean
  getQuery? : any
  getCancellationDetailsQuery?: any
  isSecretariat?:boolean
}

const LicenseDetails: FC<IPropTypes> = ({ isApplicant, getQuery, getCancellationDetailsQuery,isSecretariat }) => {
  const [requestInfo, setRequestInfo] = useState<any>();
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const { id } = useParams<any>();

  return (
    <>
      {!isSecretariat && getCancellationDetailsQuery && <LicenseDetailsApiCall getCancellationDetailsQuery={getCancellationDetailsQuery} setRequestInfo={setRequestInfo}/>}
      {requestInfo ? (
        <>
          <Row>
            <Col>
              <Timeline
                data={[
                  !isSecretariat && {
                    title: "اطلاعات متقاضی",
                    color: "success",
                    icon: <User size={14} />,
                    customContent: (
                      <>
                        <>
                          <Row>
                            <Col
                              md="12"
                              className="d-flex align-content-center flex-wrap"
                            >
                              <ListGroup tag="div" style={{ flex: 1 }}>
                                <ListGroup className="list-group-horizontal-sm">
                                  <ListGroupItem
                                    className={Styles["item-flex"]}
                                    tag="a"
                                  >
                                    {isApplicant ? (
                                      <>{`نام و نام خانوادگی: ${requestInfo.name} ${requestInfo.lastName}`}</>
                                    ) : (
                                      <Link
                                        target="_blank"
                                        to={`${
                                          requestInfo.userType === 1
                                            ? `/UserList/RealUsersList/${requestInfo.id}`
                                            : `/UserList/LegalUsersList/${requestInfo.id}`
                                        }`}
                                      >
                                        {`نام و نام خانوادگی: ${requestInfo.name} ${requestInfo.lastName} - جزئیات کاربر`}
                                      </Link>
                                    )}
                                  </ListGroupItem>

                                  <ListGroupItem
                                    className={Styles["item-flex"]}
                                    tag="a"
                                  >
                                    {`کد ملی: ${requestInfo.nationalCode}`}
                                  </ListGroupItem>
                                </ListGroup>

                                <ListGroup className="list-group-horizontal-sm">
                                  <ListGroupItem
                                    className={Styles["item-flex"]}
                                    tag="a"
                                  >
                                    <p>دلایل رد:</p>
                                    <ul>
                                      {requestInfo.reasons &&
                                        requestInfo.reasons.map(
                                          (row: any, key: any) => {
                                            return (
                                              <li key={key}>
                                                {row.resonTitle}
                                              </li>
                                            );
                                          }
                                        )}
                                    </ul>
                                  </ListGroupItem>
                                </ListGroup>
                              </ListGroup>
                            </Col>
                          </Row>
                        </>
                      </>
                    ),
                  },
                  !isApplicant && {
                    title: "جزئیات درخواست",
                    color: "success",
                    icon: <File size={14} />,
                    customContent: (
                      <>
                        <Button
                          color="primary"
                          outline
                          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                        >
                          مشاهده جزئیات
                        </Button>

                        <Collapse isOpen={isHistoryOpen}>
                          {isHistoryOpen && (
                            <RequesterDetails getQuery={getQuery} />
                          )}
                        </Collapse>
                        <hr />
                      </>
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <FallBackSpinner setHeight={200} />
        </>
      )}
    </>
  );
};

export { LicenseDetails };
