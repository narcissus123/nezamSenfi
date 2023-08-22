import React from "react";
import font from "../../../assets/fonts/iran-sans/IRANSansWeb.ttf";

import { Font } from "@react-pdf/renderer";
Font.register({
  family: "iransans",
  format: "truetype",
  // src: `${process.env.PUBLIC_URL}/static/fonts/IRANSansWeb.ttf`
  src: font,
});

interface IPropTypes {
  letterData: any;
}

const InquiryLetter: React.FC<IPropTypes> = ({ letterData }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "80%",
        height: "700px",
        margin: "0 auto",
      }}
    >
      <iframe
        src={letterData}
        title="پی دی اف نامه"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export { InquiryLetter };
