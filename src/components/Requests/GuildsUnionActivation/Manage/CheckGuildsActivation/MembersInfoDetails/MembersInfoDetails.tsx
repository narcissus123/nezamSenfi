import React, { useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import {
  useServeGuildRoomFileByAdmins,
  useServeUnionFileByAdmins,
  useShowServeGuildRoomFileByAdmins,
  useShowServeUnionFileByAdmins,
} from "../../../../../../core/services/api";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import { DownloadRow } from "../../../../../common/DownloadRow/DownloadRow";
import { MemberListDetails } from "./List/MemberListDetails";

import Styled from "./MembersInfoDetails.module.scss";

interface IPropTypes {
  data: any;
  noChangeAllServiceState: any;
  type: string;
  isOpen: boolean;
}

const MembersInfoDetails: React.FC<IPropTypes> = ({
  data,
  noChangeAllServiceState,
  type,
  isOpen,
}) => {
  const [isLoading, setIsLoading] = useState<any>(false);

  return (
    <>
      <MemberListDetails
        noChangeAllServiceState={noChangeAllServiceState}
        data={data}
      />
      <ListGroupItem tag="a" active>
        فایل کاربران
      </ListGroupItem>

      {isOpen && (
        <ListGroup className="list-group-horizontal-sm">
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

            {data.usersFiles ? (
              <>
                {data.usersFiles.map((row: any, key: any) => {
                  return (
                    <>
                      <DownloadRow
                        mutate={
                          isSameString(type, "union")
                            ? useServeUnionFileByAdmins
                            : useServeGuildRoomFileByAdmins
                        }
                        type={
                          isSameString(type, "union")
                            ? "UnionAdmin"
                            : "GuildAdmin"
                        }
                        row={{
                          fileName: row,
                          guildRoomRequestId: data.id,
                          isUnion: isSameString(type, "union"),
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
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </ListGroupItem>
        </ListGroup>
      )}
    </>
  );
};

export { MembersInfoDetails };
