import React from "react";
import { useGetCountyUnionPositionRequestInquiryLetter, useGetCountyUnionPostionRequestSignatureByManager } from "../../../../../../../../../core/services/api";
import { LetterPage } from "../../../ManagerConfirmInquiry/LetterPage/LetterPage";


const UnionLetterPage = () => {
  

  return (
    <>
      <LetterPage
        getLetterMutation={useGetCountyUnionPositionRequestInquiryLetter}
        getSignatureMutation={useGetCountyUnionPostionRequestSignatureByManager}
      />
    </>
  );
};

export { UnionLetterPage };
