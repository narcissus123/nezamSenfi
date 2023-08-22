import React, { useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import {
  useServeGuildRoomFileByAdmins,
  useShowServeGuildRoomFileByAdmins,
  useShowServeUnionFileByAdmins,
} from "../../../../../../core/services/api";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import { DownloadRow } from "../../../../../common/DownloadRow/DownloadRow";

import Styled from "./RegisteryDocsDetails.module.scss";

interface IPropTypes {
  data: any;
  type: string;
}

const RegisteryDocsDetails: React.FC<IPropTypes> = ({ data, type }) => {
  const [isLoading, setIsLoading] = useState<any>(false);

  return (
    <>
      <ListGroupItem tag="a" active>
        اسناد ثبتی
      </ListGroupItem>

      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          نام صنف: {data.name}
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          کد اقتصادی : {data.economicCode}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          شماره آگهی ثبتی تاسیس یا تغییر : {data.registrationNumber}
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          شناسه ملی : {data.nationalId}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          شماره روزنامه رسمی : {data.officialNewspaperNumber}
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

          {data.ducumentFiles ? (
            <>
              {data.ducumentFiles.map((row: any, key: any) => {
                return (
                  <>
                    <DownloadRow
                      mutate={useServeGuildRoomFileByAdmins}
                      type={
                        isSameString(type, "union")
                          ? "UnionAdmin"
                          : "GuildAdmin"
                      }
                      row={{ fileName: row, guildRoomRequestId: data.id }}
                      // setIsShow={(val: boolean) => setIsOpen(val)}
                      useServeShowFile={
                        isSameString(type, "union")
                          ? useShowServeUnionFileByAdmins
                          : useShowServeGuildRoomFileByAdmins
                      }
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

      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem className={Styled["item-flex"]}>
          <div className="d-flex">
            <p>لوگو &nbsp;</p>
            {isLoading && (
              <Spinner
                className={Styled["padding-top-spinner"]}
                color="success"
                size="sm"
              />
            )}
          </div>

          {data.logoImageFilePath ? (
            <>
              <>
                <DownloadRow
                  mutate={useServeGuildRoomFileByAdmins}
                  type={
                    isSameString(type, "union") ? "UnionAdmin" : "GuildAdmin"
                  }
                  row={{
                    fileName: data.logoImageFilePath,
                    guildRoomRequestId: data.id,
                  }}
                  // setIsShow={(val: boolean) => setIsOpen(val)}
                  useServeShowFile={
                    isSameString(type, "union")
                      ? useShowServeUnionFileByAdmins
                      : useShowServeGuildRoomFileByAdmins
                  }
                />
                <hr />
              </>
            </>
          ) : (
            <></>
          )}
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export { RegisteryDocsDetails };
