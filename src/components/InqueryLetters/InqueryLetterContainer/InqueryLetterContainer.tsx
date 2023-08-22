import * as React from "react";
import { ILetterData } from "../../../core/models/letter-data.model";
import { InquiryLetter } from "../../common/InquiryLetter/InquiryLetter";

import { CardWrapper } from "../../common/Wrapper/CardWrapper/CardWrapper";



export interface IProps {}


const InqueryLetterContainer: React.FC<IProps> = ({}) => {

  const letterData : ILetterData  = {
    date: '1400/03/01',
    number:'3514522',
    letterTitle:'عنوان نامه اینجاس',
    letterContent : 'تن تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س  تست منامه اینجاس س س ',
    append : 'پیوست' ,
    organizationTitle:'سازمان',
    topTitle: 'نظام صنفی کشاورزی استان مازندران'
  }

  return (
    <>
      <CardWrapper text="نامه">
        <InquiryLetter letterData={letterData} />
      </CardWrapper>
    </>
  );
};

export { InqueryLetterContainer };
