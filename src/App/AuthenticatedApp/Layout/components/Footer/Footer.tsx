import React from "react";
import ScrollToTop from "react-scroll-up";
import { Button } from "reactstrap";
import { ArrowUp } from "react-feather";
import classnames from "classnames";

interface props {
  footerType: string;
  hideScrollToTop: boolean;
}

const Footer: React.FC<props> = (props) => {
  let footerTypeArr = ["sticky", "static", "hidden"];
  return (
    <footer
      className={
        classnames("footer footer-light", {
          "footer-static":
            props.footerType === "static" ||
            !footerTypeArr.includes(props.footerType),
          "d-none": props.footerType === "hidden",
        }) //+ " d-flex justify-content-between align-items-end"
      }
    >
      {/* <a
        referrerPolicy="origin"
        target="_blank"
        href="https://trustseal.enamad.ir/?id=220683&amp;Code=VZP9gSLrlcQT5y6dWNam"
      >
        <img
          referrerPolicy="origin"
          src="https://trustseal.enamad.ir/logo.aspx?id=220683&amp;Code=VZP9gSLrlcQT5y6dWNam"
          alt=""
          style={{ cursor: "pointer", width: "90px" }}
          id="VZP9gSLrlcQT5y6dWNam"
        />
      </a> */}
      <p className="mb-0 clearfix">
        <span className="float-md-left d-block d-md-inline-block mt-25">
          تمامی حقوق این سامانه متعلق به نظام صنفی کشاورزی کشور است ©{" "}
          {new Date().getFullYear()}
        </span>
        {/* <span className="float-md-right d-none d-md-block">
          <span className="align-middle">Hand-crafted & Made with</span>{" "}
          <Heart className="text-danger" size={15} />
        </span> */}
      </p>
      {props.hideScrollToTop === false ? (
        <ScrollToTop showUnder={160}>
          <Button color="primary" className="btn-icon scroll-top">
            <ArrowUp size={15} />
          </Button>
        </ScrollToTop>
      ) : null}

      {/* <p style={{ width: "90px" }}></p> */}
    </footer>
  );
};

export { Footer };
