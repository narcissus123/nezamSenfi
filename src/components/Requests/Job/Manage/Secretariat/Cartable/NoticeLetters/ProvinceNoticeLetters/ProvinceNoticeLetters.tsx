import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetProvinceGuildRoomPositionRequestInquiries,
  usePostSetNumberAndDateBySecrteriatInProvinceGuildRoom,
  useSendPositionRequestLettersToApplicantInProvinceGuildRoom
} from "../../../../../../../../core/services/api/inquery.api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { NoticeLetters } from "../NoticeLetters";



const ProvinceNoticeLetters: FC = () => {
  const { id }: any = useParams();
  const getProvinceGuildRoomPositionRequestInquiries = useGetProvinceGuildRoomPositionRequestInquiries(
    id
  );
  const finalSendInquiry = useSendPositionRequestLettersToApplicantInProvinceGuildRoom();
  const setNumberAndDate = usePostSetNumberAndDateBySecrteriatInProvinceGuildRoom();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان نامه ها"
        breadCrumbParent="کارتابل"
        parentLink="/ManageCartable/ProvinceJobRequestCartable"
        breadCrumbActive="اعلان نامه ها"
      />
      <NoticeLetters
        getRequestInquiries={getProvinceGuildRoomPositionRequestInquiries}
        useMutate={setNumberAndDate}
        useFinalMutate={finalSendInquiry}
        sendUrl={'/ManageCartable/ProvinceJobRequestCartable'}
      />
    </>
  );
};

export { ProvinceNoticeLetters };
