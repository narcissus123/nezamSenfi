import React, { FC } from "react";
import { usePostSendCountyGuildRoomPositionRequestInvitationToApplicant } from "../../../../../../../../core/services/api";
import { NoticeForPresence } from "../NoticeForPresence";

const CountyNoticeForPresence: FC = () => {
  const sendInvitation = usePostSendCountyGuildRoomPositionRequestInvitationToApplicant();

  return (
    <NoticeForPresence
      sendInvitation={sendInvitation}
      redirectTo="/ManageCartable/CountyJobRequestCartable"
    />
  );
};

export { CountyNoticeForPresence };
