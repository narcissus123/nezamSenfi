import React from "react";
import { useGetPositionRequestInquiryLetterByIdForUserApplicant, useGetPostionRequestSignatureByUserAppliacant } from "../../../../../core/services/api";
import { LetterPage } from "../../Manage/UpManager/Cartable/ManagerConfirmInquiry/LetterPage";

const LetterPageForApplicant = () => {
  return (
    <>
      <LetterPage
        getLetterMutation={useGetPositionRequestInquiryLetterByIdForUserApplicant}
        getSignatureMutation={useGetPostionRequestSignatureByUserAppliacant}
      />
    </>
  );
};

export { LetterPageForApplicant };
