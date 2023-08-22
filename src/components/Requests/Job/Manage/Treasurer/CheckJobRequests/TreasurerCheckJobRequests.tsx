import React, { useState } from "react";
import { User } from "react-feather";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { JobRequestStatus } from "../../../../../../core/enums/job-request-status";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Timeline from "../../../../../common/timeline";
import { CardWrapper } from "../../../../../common/Wrapper/CardWrapper/CardWrapper";
import Styles from "./TreasurerCheckJobRequests.module.scss";

export interface IPropsType {
  initialValues?: any;
  isLoading?: boolean;
  selectMutation?: any;
  isTreasurerCartable?: boolean;
  type?: string;
  isDetails?: boolean;
}

const TreasurerCheckJobRequests: React.FC<IPropsType> = ({
  initialValues,
  isLoading,
  selectMutation,
  children,
  isTreasurerCartable = false,
  isDetails,
  type,
}) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState<any>(false);

  const onSubmit = () => {};


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
                          {`تاریخ پرداخت : ${initialValues.payDate}`}
                        </ListGroupItem>
                      </ListGroup>

                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`مبلغ پرداخت شده : ${initialValues.amount} ریال`}
                        </ListGroupItem>
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`مبلغ باقی مانده : ${initialValues.debt} ریال`}
                        </ListGroupItem>
                      </ListGroup>

                      <ListGroup className="list-group-horizontal-sm">
                        <ListGroupItem className={Styles["item-flex"]} tag="a">
                          {`وضعیت رتبه: ${initialValues.ratingStatus}`}
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
              ]}
            />
          </>
        )}
      </>
    </CardWrapper>
  );
};

export { TreasurerCheckJobRequests };
