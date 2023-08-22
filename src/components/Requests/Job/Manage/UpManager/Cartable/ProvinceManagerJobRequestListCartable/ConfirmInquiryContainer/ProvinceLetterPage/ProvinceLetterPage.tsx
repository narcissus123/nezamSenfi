import React from "react";
import { useGetProvinceGuildRoomPositionRequestInquiryLetter, useGetProvinceGuildRoomPostionRequestSignatureByManager } from "../../../../../../../../../core/services/api";
import { LetterPage } from "../../../ManagerConfirmInquiry/LetterPage/LetterPage";



const ProvinceLetterPage = () => {
  

  return (
    <>
      <LetterPage
        getLetterMutation={useGetProvinceGuildRoomPositionRequestInquiryLetter}
        getSignatureMutation={
          useGetProvinceGuildRoomPostionRequestSignatureByManager
        }
      />
    </>
  );
};

export { ProvinceLetterPage };
