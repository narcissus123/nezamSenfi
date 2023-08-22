import React, { ButtonHTMLAttributes, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Col, Row, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { showToast } from "../../../../../core/utils";
import Styles from "./SubmitButton.module.scss";

interface IPropTypes {
  isLoading: boolean;
  nextTo?: string;
  backTo?: string;
  noSubmit?: boolean;
  schema?: any;
  values?: any;
  isChanged?: boolean;
  initialValue?: any;
  isDisabled?: boolean;
  color?: string;
  btnText?: string;
  backToTxt?: string;
  nextToTxt?: string;
  clearable?: boolean;
  onClear?: () => void;
  clearableTxt?: string;
  submitOutLine?: boolean;
  onClick?: any;
  clearableDisable?: boolean;
  isClearableLoading?: boolean;
  type?: "submit" | "reset" | "button";
}

const SubmitButton: React.FC<IPropTypes> = ({
  isLoading,
  nextTo,
  backTo,
  noSubmit,
  schema,
  values,
  initialValue,
  isDisabled,
  color,
  btnText,
  backToTxt,
  nextToTxt,
  clearable,
  onClear,
  clearableTxt,
  submitOutLine,
  onClick,
  clearableDisable,
  isClearableLoading,
  type,
}) => {
  const history = useHistory();
  const [block, setBlock] = useState(false);

  const checkError = async (value: any) => {
    //history.block(true);
    if (schema) {
      const result = schema
        .validate(value)
        .then((val: any) => {
          setBlock(true);
        })
        .catch((val: any) => {
          showToast(["لطفا اطلاعات را درست وارد کنید"], "error");
          console.log("---valll error- --", val);
        });
    }
  };

  const togglePage = (url: string) => {
    if (Object.is(values, initialValue) || block) {
      history.push(url);
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mr-1",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "‌اخطار",
          text: "تغییرات اعمال شده ذخیره نگردد؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "بله",
          cancelButtonText: "خیر",
          showLoaderOnConfirm: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            history.push(url);
          }
        });
    }
  };

  return (
    <Row className={`${Styles.holder} ${clearable && Styles["form-style"]}`}>
      {!noSubmit && !clearable && (
        <Col
          sm="6"
          className={`justify-content-start d-flex ${Styles["mobile-mode"]}`}
        >
          <Button
            color={color ? color : "primary"}
            className={`d-flex align-items-center justify-content-center ${
              Styles.submit
            } ${isDisabled ? Styles.pointer : null}`}
            onClick={() => {
              if (onClick) onClick();
              checkError(values);
            }}
            type={type ? type : isLoading ? "button" : "submit"}
            outline={submitOutLine}
            disabled={isDisabled}
          >
            {isLoading && (
              <Spinner color={submitOutLine ? "primary" : "white"} size="sm" />
            )}
            <span className="ml-50">{btnText ? btnText : "ذخیره اطلاعات"}</span>
          </Button>
        </Col>
      )}
      {!noSubmit && clearable && (
        <div
          className={`justify-content-start d-flex ${Styles["mobile-mode"]}`}
        >
          <Button
            color={color ? color : "primary"}
            className={`d-flex align-items-center justify-content-center ${
              Styles.submit
            } ${isDisabled ? Styles.pointer : null}`}
            onClick={() => {
              if (onClick) onClick();
              checkError(values);
            }}
            type={type ? type : isLoading ? "button" : "submit"}
            outline={submitOutLine}
            disabled={isDisabled}
          >
            {isLoading && <Spinner color="white" size="sm" />}
            <span className="ml-50">{btnText ? btnText : "ذخیره اطلاعات"}</span>
          </Button>

          {clearable && (
            <Button
              onClick={onClear}
              className={`d-flex align-items-center justify-content-center ${
                Styles["remove-btn"]
              } ${clearableDisable ? Styles.pointer : null}`}
              color="primary"
              outline
              type={"button"}
              disabled={clearableDisable ? true : false}
            >
              {isClearableLoading && <Spinner color="primary" size="sm" />}
              <span className="ml-50">
                {clearableTxt ? clearableTxt : "پاک کردن"}
              </span>
            </Button>
          )}
        </div>
      )}
      {(nextTo || backTo) && (
        <Col
          sm="6"
          className={`${
            !nextTo && noSubmit
              ? "justify-content-start"
              : "justify-content-end"
          } d-flex ${Styles["mobile-mode"]}`}
        >
          {backTo && (
            <Link
              to="#"
              onClick={() => togglePage(backTo)}
              color="primary"
              className={`btn btn-outline-primary ${
                nextTo ? Styles["back-page"] : ""
              }`}
            >
              {backToTxt ? backToTxt : "قبلی"}
            </Link>
          )}
          {nextTo && (
            <Link
              onClick={() => togglePage(nextTo)}
              to="#"
              color="primary"
              className="btn btn-outline-primary"
            >
              {nextToTxt ? nextToTxt : "بعدی"}
            </Link>
          )}
        </Col>
      )}
    </Row>
  );
};

export { SubmitButton };
