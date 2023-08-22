import React from "react";
import { useGetCountyGuildRoomPositionRequestInquiryLetter, useGetCountyGuildRooomPostionRequestSignatureByManager } from "../../../../../../../../../core/services/api";
import { LetterPage } from "../../../ManagerConfirmInquiry/LetterPage/LetterPage";



const CountyLetterPage = () => {
  

  return (  
    <>
      <LetterPage getLetterMutation={useGetCountyGuildRoomPositionRequestInquiryLetter} getSignatureMutation={useGetCountyGuildRooomPostionRequestSignatureByManager} />
    </>
  
  );
};

export { CountyLetterPage };
