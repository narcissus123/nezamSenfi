import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { InquiryLetter } from "../../../../../../../common/InquiryLetter/InquiryLetter";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { CardWrapper } from "../../../../../../../common/Wrapper/CardWrapper/CardWrapper";
const queryString = require('query-string');




interface IPropTypes {
  getSignatureMutation:any
  getLetterMutation : any
}

const LetterPage: FC<IPropTypes> = ({ getSignatureMutation, getLetterMutation}) => {

  const[pdfUrl , setPdfUrl] = useState<any>('');

  let { id , letter_id } = useParams<any>();

  const location = useLocation()

  const { data : letterQueryData , isLoading : letterLoading , isFetching : letterFetching , isSuccess : letterSuccess } = getLetterMutation(letter_id)

  useEffect(()=>{
    if(letterQueryData){
      const result = letterQueryData.data;

      let data = new Blob([result], {type: 'application/pdf'});
      let pdfBlob = window.URL.createObjectURL(data);

      setPdfUrl(pdfBlob);
    }
  },[letterQueryData , letterSuccess ])

  return (
    <>
      <CardWrapper text="نامه">
        {letterFetching ? (
          <FallBackSpinner />
        ) : (
          <>
            <InquiryLetter letterData={pdfUrl} />
          </>
        )}
      </CardWrapper>
    </>
  );
};

export { LetterPage };
