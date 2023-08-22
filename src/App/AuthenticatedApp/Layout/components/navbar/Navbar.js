import React, { useContext, useRef } from "react";
import { Navbar } from "reactstrap";
import classnames from "classnames";
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";
import { useUserAuth } from "../../../../../core/utils/context/AuthenticationContext";
import { profileContext } from "../../../../../core/utils/context/ProfileContext";
import { LoadProfile } from "./LoadProfile";
import { Offline, Detector } from "react-detect-offline";

const ThemeNavbar = (props) => {
  const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"];
  const navbarTypes = ["floating", "static", "sticky", "hidden"];

  const { userInfo, role } = useUserAuth();
  const {
    userProfilePicture,
    setUserProfilePicture,
    allowToRefetch,
    setAllowToRefetch,
  } = useContext(profileContext);

  return (
    <React.Fragment>
      {allowToRefetch === 1 && <LoadProfile />}
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light":
              props.navbarColor === "default" ||
              !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) ||
              (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            scrolling: props.horizontal && props.scrolling,
          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              {/* <Offline>شما دسترسی به اینترنت ندارید...</Offline> */}
              <div className="bookmark-wrapper">
                <NavbarBookmarks sidebarVisibility={props.sidebarVisibility} />
              </div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center">
                  <div className="brand-logo mr-50"></div>
                  <h2 className="text-primary brand-text mb-0">سبک</h2>
                </div>
              ) : null}
              <NavbarUser
                userImg={userProfilePicture}
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={
                  userInfo.name + " " + (userInfo.family ? userInfo.family : "")
                }
                //userImg={userImg}
                role={role}
                nationalCode={userInfo.userName}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default ThemeNavbar;
