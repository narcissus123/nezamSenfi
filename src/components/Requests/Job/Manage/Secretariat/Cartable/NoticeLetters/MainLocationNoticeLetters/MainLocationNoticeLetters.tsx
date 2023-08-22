import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetMainLocationGuildRoomPositionRequestInquiries,
  usePostSetNumberAndDateBySecrteriatInMainLocationGuildRoom,
  useSendPositionRequestLettersToApplicantInMainLocationGuildRoom
} from "../../../../../../../../core/services/api/inquery.api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { NoticeLetters } from "../NoticeLetters";



const MainLocationNoticeLetters: FC = () => {
  const { id }: any = useParams();
  const getMainLocationPositionRequestInquiries = useGetMainLocationGuildRoomPositionRequestInquiries(
    id
  );
  const finalSendInquiry = useSendPositionRequestLettersToApplicantInMainLocationGuildRoom();
  const setNumberAndDate = usePostSetNumberAndDateBySecrteriatInMainLocationGuildRoom();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان نامه ها"
        breadCrumbParent="کارتابل"
        parentLink=""
        breadCrumbActive="اعلان نامه ها"
      />
      <NoticeLetters
        getRequestInquiries={getMainLocationPositionRequestInquiries}
        useMutate={setNumberAndDate}
        useFinalMutate={finalSendInquiry}
        sendUrl={'/ManageCartable/MainLocationJobRequestCartable'}
      />
    </>
  );
};

export { MainLocationNoticeLetters };
