import React from "react";
import {  useGetMainLocationGuildRoomPositionRequestInquiryLetter, useGetMainLocationGuildRoomPostionRequestSignatureByManager } from "../../../../../../../../../core/services/api";
import { LetterPage } from "../../../ManagerConfirmInquiry/LetterPage/LetterPage";


const MainLocationLetterPage = () => {
  return (
    <>
      <LetterPage
        getLetterMutation={
          useGetMainLocationGuildRoomPositionRequestInquiryLetter
        }
        getSignatureMutation={
          useGetMainLocationGuildRoomPostionRequestSignatureByManager
        }
      />
    </>
  );
};

export { MainLocationLetterPage };
