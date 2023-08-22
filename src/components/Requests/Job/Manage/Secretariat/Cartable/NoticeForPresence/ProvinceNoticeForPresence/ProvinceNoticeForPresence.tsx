import React, { FC } from "react";
import { usePostSendProvinceGuildRoomPositionRequestInvitationToApplicant } from "../../../../../../../../core/services/api";
import { NoticeForPresence } from "../NoticeForPresence";

const ProvinceNoticeForPresence: FC = () => {
  const sendInvitation = usePostSendProvinceGuildRoomPositionRequestInvitationToApplicant();

  return (
    <NoticeForPresence
      sendInvitation={sendInvitation}
      redirectTo="/ManageCartable/ProvinceJobRequestCartable"
    />
  );
};

export { ProvinceNoticeForPresence };
