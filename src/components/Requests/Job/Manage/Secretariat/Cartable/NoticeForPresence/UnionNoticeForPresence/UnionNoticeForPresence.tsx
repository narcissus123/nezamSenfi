import React, { FC } from "react";
import { usePostSendCountyUnionPositionRequestInvitationToApplicant } from "../../../../../../../../core/services/api";
import { NoticeForPresence } from "../NoticeForPresence";

const UnionNoticeForPresence: FC = () => {
  const sendInvitation = usePostSendCountyUnionPositionRequestInvitationToApplicant();

  return (
    <NoticeForPresence
      sendInvitation={sendInvitation}
      redirectTo="/ManageCartable/UnionJobRequestCartable"
    />
  );
};

export { UnionNoticeForPresence };
