import React, { Component } from "react";
import classnames from "classnames";
import Hammer from "react-hammerjs";
import PerfectScrollbar from "react-perfect-scrollbar";

import { ContextLayout } from "../../../../../../core/utils/context/Layout";
import { authContext } from './../../../../../../core/utils/context/AuthenticationContext';
import { SideBar } from "../../SideBar/SideBar"
declare global {
  interface Window {
    DocumentTouch: any;
  }
}

interface Iprops {
  toggleSidebarMenu: any;
  toggle: any;
  sidebarState: any;
  sidebarHover: any;
  sidebarVisibility: any;
  visibilityState: any;
  activePath: any;
  collapsedMenuPaths: any;
  currentLang: any;
  activeTheme: any; //*
  collapsed: any;
  permission: any;
  deviceWidth: any;
  color?: any;
}

interface IState {
  width: any;
  activeIndex: any;
  hoveredMenuItem: any;
  activeItem: any;
  menuShadow: boolean;
  ScrollbarTag: any;
}

class Sidebar extends Component<Iprops, IState> {
  static getDerivedStateFromProps(props: Iprops, state: IState) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
  state = {
    width: window.innerWidth,
    activeIndex: null,
    hoveredMenuItem: null,
    activeItem: this.props.activePath,
    menuShadow: false,
    ScrollbarTag: PerfectScrollbar,
    role:""
  };

  mounted = false;

  updateWidth = () => {
    if (this.mounted) {
      this.setState((prevState) => ({
        width: window.innerWidth,
      }));
      this.checkDevice();
    }
  };

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      if (true) {
        //This condition will always return 'true'
        window.addEventListener("resize", this.updateWidth, false);
      }
      this.checkDevice();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  checkDevice = () => {
    var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
    var mq = function (query: any) {
      return window.matchMedia(query).matches;
    };

    if ("ontouchstart" in window || window.DocumentTouch) {
      this.setState({
        ScrollbarTag: "div",
      });
    } else {
      this.setState({
        ScrollbarTag: PerfectScrollbar,
      });
    }
    var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
      ""
    );
    return mq(query);
  };

  changeActiveIndex = (id: any) => {
    if (id !== this.state.activeIndex) {
      this.setState({
        activeIndex: id,
      });
    } else {
      this.setState({
        activeIndex: null,
      });
    }
  };

  handleSidebarMouseEnter = (id: any) => {
    if (id !== this.state.hoveredMenuItem) {
      this.setState({
        hoveredMenuItem: id,
      });
    } else {
      this.setState({
        hoveredMenuItem: null,
      });
    }
  };

  handleActiveItem = (url: any) => {
    this.setState({
      activeItem: url,
    });
  };

  render() {
    let {
      visibilityState,
      toggleSidebarMenu,
      sidebarHover,
      toggle,
      color,
      sidebarVisibility,
      activeTheme,
      collapsed,
      activePath,
      sidebarState,
      currentLang,
      permission,
      collapsedMenuPaths,
    } = this.props;

    let {
      menuShadow,
      activeIndex,
      hoveredMenuItem,
      activeItem,
      ScrollbarTag,
    } = this.state;
    let scrollShadow = (container: any, dir: any) => {
      if (container && dir === "up" && container.scrollTop >= 100) {
        this.setState({ menuShadow: true });
      } else if (container && dir === "down" && container.scrollTop < 100) {
        this.setState({ menuShadow: false });
      } else {
        return;
      }
    };
    return (
      <ContextLayout.Consumer>
      {context => (
        <authContext.Consumer>
          {user => (
            <React.Fragment>
              <Hammer
                onSwipe={(e) => {
                  sidebarVisibility();
                }}
                direction={context.state.direction === "rtl" ? "DIRECTION_LEFT" : "DIRECTION_RIGHT"}
              >
                <div className="menu-swipe-area d-xl-none d-block vh-100"></div>
              </Hammer>

              <div
                className={classnames(
                  `main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`,
                  {
                    collapsed: collapsed,
                    "hide-sidebar":
                      this.state.width < 1200 && visibilityState === false,
                  }
                )}
                onMouseEnter={() => sidebarHover(false)}
                onMouseLeave={() => sidebarHover(true)}
              >
                
                <SideBar 
                    width={this.state.width }
                    toggleSidebarMenu={toggleSidebarMenu}
                    toggle={toggle}
                    collapsed={collapsed}
                    visibilityState={sidebarState}
                    sidebarVisibility={sidebarVisibility}
                />
          
                {/* <SidebarHeader  
                  toggleSidebarMenu={toggleSidebarMenu}
                  toggle={toggle}
                  sidebarBgColor={color}
                  sidebarVisibility={sidebarVisibility}
                  activeTheme={activeTheme}
                  collapsed={collapsed}
                  menuShadow={menuShadow}
                  activePath={activePath}
                  sidebarState={sidebarState}
                />
                <ScrollbarTag
                  className={classnames("main-menu-content", {
                    "overflow-hidden": true,
                    "overflow-scroll": true,
                  })}
                  {...(true && {
                    options: { wheelPropagation: false },
                    onScrollDown: (container) =>
                      scrollShadow(container, "down"),
                    onScrollUp: (container) => scrollShadow(container, "up"),
                    onYReachStart: () =>
                      menuShadow === true &&
                      this.setState({ menuShadow: false }),
                  })}
                >
                  <Hammer
                    onSwipe={() => {
                      sidebarVisibility();
                    }}
                    direction={
                      context.state.direction === "rtl" ? "DIRECTION_RIGHT" : "DIRECTION_LEFT"
                    }
                  >
     
                        
                            <ul className="navigation navigation-main">
                              <SideMenuContent
                                setActiveIndex={this.changeActiveIndex}
                                activeIndex={activeIndex}
                                hoverIndex={hoveredMenuItem}
                                handleSidebarMouseEnter={this.handleSidebarMouseEnter}
                                activeItemState={activeItem}
                                handleActiveItem={this.handleActiveItem}
                                activePath={activePath}
                                lang={currentLang}
                                permission={permission}
                                currentUser={user?.role} //*
                                collapsedMenuPaths={collapsedMenuPaths}
                                toggleMenu={sidebarVisibility}
                                deviceWidth={this.props.deviceWidth}
                              />
                            </ul>

                    
                    
                  </Hammer>
                </ScrollbarTag>  */}
              </div>
            </React.Fragment>
          )
          }
        </authContext.Consumer>
      )}
    </ContextLayout.Consumer>
    );
  }
}

export { Sidebar };
