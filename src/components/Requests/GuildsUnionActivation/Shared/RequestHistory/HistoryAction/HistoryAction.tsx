import React, { FC, useState } from "react";
import { Edit, File, User } from "react-feather";
import { Button } from "reactstrap";
import { HistoryFiles } from "./HistoryFiles/HistoryFiles";
import { HistoryInfo } from "./HistoryInfo/HistoryInfo";
import { HistoryUsers } from "./HistoryUsers/HistoryUsers";
// import { HistoryDetailsModal } from "../HistoryDetailsModal/HistoryDetailsModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any };
      original: {
        countyGuildRoomRequestUsers: any;
        provinceGuildRoomRequestUsers: any;
        getUnionUsersHistory: any;
        guildRoomListRequestFiles: any;
        guildRoomRequestListFiles: any;
      };
    };
  };
}

const HistoryAction: FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: {
        countyGuildRoomRequestUsers,
        provinceGuildRoomRequestUsers,
        getUnionUsersHistory,
        guildRoomListRequestFiles,
        guildRoomRequestListFiles,
      },
      original,
    },
  },
}) => {
  const [showUsersModal, setShowUsersModal] = useState<any>(false);
  const [showHistoryFiles, setShowHistoryFiles] = useState<any>(false);
  const [showInforMation, setShowInforMation] = useState<any>(false);

  return (
    <div className="d-flex justify-content-center align-content-center flex-wrap">
      <HistoryUsers
        isOpen={showUsersModal}
        toggleModal={() => setShowUsersModal(false)}
        tableData={
          countyGuildRoomRequestUsers
            ? countyGuildRoomRequestUsers
            : provinceGuildRoomRequestUsers
            ? provinceGuildRoomRequestUsers
            : getUnionUsersHistory
        }
      />

      <HistoryFiles
        isOpen={showHistoryFiles}
        toggleModal={() => setShowHistoryFiles(false)}
        data={
          guildRoomListRequestFiles
            ? guildRoomListRequestFiles
            : guildRoomRequestListFiles
        }
        isUnion={getUnionUsersHistory ? true : false}
      />

      <HistoryInfo
        data={original}
        isOpen={showInforMation}
        toggleModal={() => setShowInforMation(false)}
      />

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => setShowInforMation(true)}
      >
        جزییات &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => setShowHistoryFiles(true)}
      >
        فایل ها &nbsp;
        <File
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={() => setShowUsersModal(true)}
      >
        کاربران &nbsp;
        <User
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { HistoryAction };
