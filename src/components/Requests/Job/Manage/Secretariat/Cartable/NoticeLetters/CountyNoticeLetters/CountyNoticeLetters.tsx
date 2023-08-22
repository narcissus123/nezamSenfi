import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetCountyGuildRoomPositionRequestInquiries,
  useSendPositionRequestLettersToApplicantInCountyGuildRoom,
  usePostSetNumberAndDateBySecrteriatInCountyGuildRoom,
} from "../../../../../../../../core/services/api/inquery.api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { NoticeLetters } from "../NoticeLetters";



  const CountyNoticeLetters: FC = () => {
  const { id }: any = useParams();
  const getCountyGuildRoomPositionRequestInquiries = useGetCountyGuildRoomPositionRequestInquiries(
    id
  );
  const finalSendInquiry = useSendPositionRequestLettersToApplicantInCountyGuildRoom();
  const setNumberAndDate = usePostSetNumberAndDateBySecrteriatInCountyGuildRoom();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان نامه ها"
        breadCrumbParent="کارتابل"
        parentLink="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="اعلان نامه ها"
      />
      <NoticeLetters
        getRequestInquiries={getCountyGuildRoomPositionRequestInquiries}
        useMutate={setNumberAndDate}
        useFinalMutate={finalSendInquiry}
        sendUrl={'/ManageCartable/CountyJobRequestCartable'}
      />
    </>
  );
};

export { CountyNoticeLetters };
