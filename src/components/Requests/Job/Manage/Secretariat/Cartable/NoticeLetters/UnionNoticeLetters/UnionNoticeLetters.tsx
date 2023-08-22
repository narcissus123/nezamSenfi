import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetCountyUnionPositionRequestInquiries,
  usePostSetNumberAndDateBySecrteriatInCountyUnion,
  useSendPositionRequestLettersToApplicantInCountyUnion
} from "../../../../../../../../core/services/api/inquery.api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { NoticeLetters } from "../NoticeLetters";



const UnionNoticeLetters: FC = () => {
  const { id }: any = useParams();
  const getUnionPositionRequestInquiries = useGetCountyUnionPositionRequestInquiries(
    id
  );
  const finalSendInquiry = useSendPositionRequestLettersToApplicantInCountyUnion();
  const setNumberAndDate = usePostSetNumberAndDateBySecrteriatInCountyUnion();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان نامه ها"
        breadCrumbParent="کارتابل"
        parentLink="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="اعلان نامه ها"
      />
      <NoticeLetters
        getRequestInquiries={getUnionPositionRequestInquiries}
        useMutate={setNumberAndDate}
        useFinalMutate={finalSendInquiry}
        sendUrl={'/ManageCartable/UnionJobRequestCartable'}
      />
    </>
  );
};

export { UnionNoticeLetters };
