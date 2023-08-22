import React from "react";
import { Button } from "reactstrap";
import errorImg from "../../../../../assets/img/svg/error.svg";

import "../../../../../assets/scss/pages/page-misc.scss";
import { FC } from "react";

const ErrorPage: FC = () => {
  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">مشکلی پیش آمده است</h2>
          <p className="mb-2">لطفا چند لحظه دیگر مراجعه کنید</p>
          <Button
            color="primary"
            className="btn-sm-block mb-2"
            onClick={() => (window.location.href = "/")}
          >
            بازگشت به خانه
          </Button>
          <img className="img-fluid" src={errorImg} alt="Not authorized page" />
        </div>
      </div>
    </div>
  );
};
export { ErrorPage };
