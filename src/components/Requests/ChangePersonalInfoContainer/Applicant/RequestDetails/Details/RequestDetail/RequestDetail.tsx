import * as React from "react";
import { FC } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Styles from './RequestDetail.module.scss'



interface IPropTypes {
  requestInfo: any
}
const RequestDetail: FC<IPropTypes> = ({requestInfo}) => {


  return (
    <>
      {requestInfo && (
        <ListGroup tag="div" style={{ flex: 1 }}>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`نام و نام خانوادگی: ${requestInfo.name} ${requestInfo.lastName} `}
            </ListGroupItem>

            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`نام پدر: ${requestInfo.fathersName}`}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`جنسیت: ${requestInfo.gender === 1 ? "زن" : "مرد"} `}
            </ListGroupItem>

            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`کد ملی: ${requestInfo.idNumber}`}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`شماره شناسنامه: ${requestInfo.idNumber}`}
            </ListGroupItem>

            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`وضعیت نظام وظیفه: ${requestInfo.dutySystemState}`}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`محل صدور: ${requestInfo.idIssuePlace}`}
            </ListGroupItem>

            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`تاریخ تولد: ${requestInfo.birthDate}`}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`تحصیلات: ${requestInfo.accademyTitle}`}
            </ListGroupItem>

            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`وضعیت تاهل: ${requestInfo.maritalStatus}`}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`رشته: ${requestInfo.educationFiledEnumTitle}`}
            </ListGroupItem>

            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`ارتباط رشته تحصیلی با کشاورزی: ${
                requestInfo.relationToAgriculture ? "بله" : "خیر"
              }`}
            </ListGroupItem>
          </ListGroup>
        </ListGroup>
      )}
    </>
  );
};

export { RequestDetail };
