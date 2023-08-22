import React from "react";
import { Col } from "reactstrap";

import registerImg from "../../../../assets/img/pages/register7.svg";

const RegisterImage: React.FC = () => {
  return (
    <Col
      lg="12"
      
    >
      <div
        className="d-lg-flex d-none flex-column justify-content-end "
        style={{ flex: 1  , }}
      >
        {/* <img className="mr-1" src={registerImg} alt="registerImg" style={{margin:'0px !important' ,objectFit: "cover"}} /> */}
      </div>
      {/* <div className="d-flex justify-content-end w-100">
         <img src="https://www.digikala.com/static/files/3a24ea39.png" alt="" /> 
        <a
          referrerPolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=220683&amp;Code=VZP9gSLrlcQT5y6dWNam"
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=220683&amp;Code=VZP9gSLrlcQT5y6dWNam"
            alt=""
            style={{ cursor: "pointer", width: "80px" }}
            id="VZP9gSLrlcQT5y6dWNam"
          />
        </a>
      </div> */}
    </Col>
  );
};

export { RegisterImage };
