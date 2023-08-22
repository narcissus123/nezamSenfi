import React, { PureComponent } from "react";
import classnames from "classnames";
import { RouteComponentProps } from "react-router-dom";

import { Sidebar } from "./components/menu/vertical-menu/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { themeConfig } from "../../../configs/themeConfig";

interface Istate {
  width: any;
  sidebarState: any;
  layout: any;
  collapsedContent: any;
  sidebarHidden: any;
  currentLang: any;
  appOverlay: boolean;
  customizer: boolean;
  currRoute: any;
}

interface Iprops extends RouteComponentProps {
  permission?: Array<string>;
  collapseSidebar: (valu: any) => any;
}

class VerticalLayout extends PureComponent<Iprops, Istate> {
  state = {
    width: window.innerWidth,
    sidebarState: themeConfig.sidebarCollapsed, //*
    layout: themeConfig.theme, //*
    collapsedContent: themeConfig.sidebarCollapsed, //*
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname,
  };

  collapsedPaths: Array<any> = [];

  mounted = false;
  updateWidth = () => {
    if (this.mounted) {
      this.setState((prevState) => ({
        width: window.innerWidth,
      }));
    }
  };

  handleCustomizer = (bool: boolean) => {
    this.setState({
      customizer: bool,
    });
  };

  componentDidMount() {
    this.mounted = true;
    let {
      location: { pathname }, //*
    } = this.props;

    if (this.mounted) {
      if (true) {
        //This condition will always return 'true'
        window.addEventListener("resize", this.updateWidth, false);
      }
      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      let layout = themeConfig.theme; //*
      let dir = themeConfig.direction; //*
      if (dir === "rtl")
        document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      return layout === "dark"
        ? document.body.classList.add("dark-layout")
        : layout === "semi-dark"
        ? document.body.classList.add("semi-dark-layout")
        : null;
    }
  }

  handleCollapsedMenuPaths = (item: any) => {
    let collapsedPaths = this.collapsedPaths;
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item);
      this.collapsedPaths = collapsedPaths;
    }
  };

  toggleSidebarMenu = (val: any) => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent,
    });
  };

  sidebarMenuHover = (val: any) => {
    this.setState({
      sidebarState: val,
    });
  };

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener("resize", () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden,
            });
          }
        });
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden,
      });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  handleCurrentLanguage = (lang: any) => {
    this.setState({
      currentLang: lang,
    });
  };

  handleAppOverlay = (value: any) => {
    if (value.length > 0) {
      this.setState({
        appOverlay: true,
      });
    } else if (value.length < 0 || value === "") {
      this.setState({
        appOverlay: false,
      });
    }
  };

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false,
    });
  };

  render() {
    let menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark",
    ];
    let sidebarProps = {
      toggleSidebarMenu: () => {},
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.location.pathname,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: themeConfig.menuTheme, //*
      collapsed: this.state.collapsedContent,
      permission: this.props.permission,
      deviceWidth: this.state.width,
    };
    let navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: themeConfig.navbarColor, //*
      navbarType: themeConfig.navbarType, //*
    };

    let footerProps = {
      footerType: themeConfig.footerType, //*
      hideScrollToTop: themeConfig.hideScrollToTop, //*
    };

    return (
      <div
        className={classnames(
          `wrapper vertical-layout theme-primary`, //*
          {
            "menu-collapsed":
              this.state.collapsedContent === true && this.state.width >= 1200,
            "navbar-floating": true, //*
            // "fixed-footer": "floating" === "sticky",//*
            // "navbar-static": "floating" === "static",//*
            // "navbar-sticky": "floating" === "sticky",//*
            // "navbar-floating": "floating" === "floating",//*
            // "navbar-hidden": "floating" === "hidden",//*
            "theme-primary": !menuThemeArr.includes("primary"), //*
          }
        )}
      >
        
        <Sidebar {...sidebarProps} />

        <div
          className={classnames("app-content content", {
            "show-overlay": this.state.appOverlay === true,
          })}
          onClick={this.handleAppOverlayClick}
        >
          <Navbar {...navbarProps} />
          <div className="content-wrapper">{this.props.children}</div>
        </div>

        <Footer {...footerProps} />

        <div
          className="sidenav-overlay"
          onClick={this.handleSidebarVisibility}
        />
      </div>
    );
  }
}

export { VerticalLayout };
