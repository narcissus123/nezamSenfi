import React, { FC } from "react";
import { usePostSendMainLocationGuildRoomPositionRequestInvitationToApplicant } from "../../../../../../../../core/services/api";
import { NoticeForPresence } from "../NoticeForPresence";

const MainLocationNoticeForPresence: FC = () => {
  const sendInvitation = usePostSendMainLocationGuildRoomPositionRequestInvitationToApplicant();

  return (
    <NoticeForPresence
      sendInvitation={sendInvitation}
      redirectTo="/ManageCartable/MainLocationJobRequestCartable"
    />
  );
};

export { MainLocationNoticeForPresence };
