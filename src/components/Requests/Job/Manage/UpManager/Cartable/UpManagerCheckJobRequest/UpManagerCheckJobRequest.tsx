import React, { Fragment, useState } from "react";
import { File, User } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Button, Collapse, ListGroup, ListGroupItem } from "reactstrap";
import { JobRequestStatus } from "../../../../../../../core/enums/job-request-status";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Timeline from "../../../../../../common/timeline";
import { CardWrapper } from "../../../../../../common/Wrapper/CardWrapper/CardWrapper";

import { ResumeJobRequest } from "../../../Secretariat/CheckJobRequests/ResumeJobRequest/ResumeJobRequest";
import { CheckComponent } from "./CheckComponent/CheckComponent";

import Styles from "./UpManagerCheckJobRequest.module.scss";


export interface IPropsType {
  initialValues?: any;
  isLoading?: boolean;
  type?: string;
  isDetails?: boolean;
  resumeMutation?: any;
  confirmMutation:any;
  rejectMutation:any
}

const UpManagerCheckJobRequest: React.FC<IPropsType> = ({
  initialValues,
  isLoading,
  isDetails,
  type,
  resumeMutation,
  confirmMutation,
  rejectMutation


}) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState<any>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<any>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAcceptPaymentOpen, setIsAcceptPaymentOpen] = useState(false);
  const [isRejectPaymentOpen, setIsRejectPaymentOpen] = useState(false);
  const { id }: any = useParams();

  //

  return (
    <CardWrapper text="بررسی درخواست شغل">
      <>
        {isLoading ? (
          <FallBackSpinner setHeight={300} />
        ) : (
          <>
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
                            to={`/UserList/RealUsersList/${initialValues.userId}`}
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
                          نوع ارایه خدمت: متصدی امور اداری و دفتری
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
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`وضعیت رتبه: ${initialValues.ratingStatus}`}
                      </ListGroupItem>
                    </ListGroup>
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
              ]}
            />
          </>
        )}

        {!isDetails &&
          initialValues.status === JobRequestStatus.ConfirmByUpManager && (
            <CheckComponent isManagerCartable={true} type={type} rejectMutation={rejectMutation} confirmMutation={confirmMutation} />
          )}
      </>
    </CardWrapper>
  );
};

export { UpManagerCheckJobRequest };
