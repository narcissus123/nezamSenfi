import React, { useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import Styled from "./ResumeHistoryDetails.module.scss";
import {
  useServeFileByAdmins,
  useServeShowFileByAdmin,
} from "../../../../../../../../../core/services/api";
import { DownloadRow } from "../../../../../../../../common/DownloadRow/DownloadRow";
// import { DownloadRow } from "../../../../../JobRequestFlow/HistoryJobRequest/HistoryDetailsModal/ResumeHistoryDetails/DownloadRow/DownloadRow";

interface IPropTypes {
  data: any;
}

const ResumeHistoryDetails: React.FC<IPropTypes> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<any>(false);

  return (
    <>
      <ListGroupItem tag="a" active>
        تاریخچه رزومه
      </ListGroupItem>

      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          نام سازمان: {data.organizationTitle}
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          وضعیت بیمه: {data.inSuranceStatus ? "دارای بیمه" : "فاقد بیمه"}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          استان محل خدمت: ساری
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          مدت سابقه بیمه ای: {data.inSuranceDuration}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          شهرستان محل خدمت: ساری
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          نوع اشتغال: نوع اشتغال
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          تاریخ شروع فعالیت: {data.startDate}
        </ListGroupItem>

        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          نوع ارائه خدمت: {data.positionId}
        </ListGroupItem>
      </ListGroup>

      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          تاریخ پایان فعالیت: {data.endDate}
        </ListGroupItem>
        <ListGroupItem className={Styled["item-flex"]}>
          <div className="d-flex">
            <p>اسناد ارسالی &nbsp;</p>
            {isLoading && (
              <Spinner
                className={Styled["padding-top-spinner"]}
                color="success"
                size="sm"
              />
            )}
          </div>

          {data.resumeFiles ? (
            <>
              {data.resumeFiles.map((row: any, key: any) => {
                return (
                  <>
                    <DownloadRow
                      mutate={useServeFileByAdmins}
                      type="admin"
                      row={row}
                      // setIsShow={(val: boolean) => setIsOpen(val)}
                      useServeShowFile={useServeShowFileByAdmin}
                    />
                    <hr />
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export { ResumeHistoryDetails };
