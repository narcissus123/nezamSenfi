import React, { useState, useEffect } from "react";
import { Menu } from "antd";

import "antd/lib/menu/style/css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavigationConfig } from "./../../../../../configs/NavConfig";
import { Grid, X } from "react-feather";
import Styled from "./SideBar.module.scss";
import { NavLink } from "react-router-dom";
import { navigationDetail } from "./../../../../../configs/NavConfig";
import { useUserAuth } from "../../../../../core/utils/context/AuthenticationContext";

export interface IPropsType {
  toggleSidebarMenu: any;
  toggle: any;
  collapsed: any;
  visibilityState: any;
  width: any;
  sidebarVisibility: any;
}

const { SubMenu } = Menu;

const SideBar: React.FC<IPropsType> = ({
  toggle,
  collapsed,
  width,
  sidebarVisibility,
}) => {
  const location = useLocation();
  const [state] = useState<any>(NavigationConfig);
  const { role } = useUserAuth();
  const [openKeysState, setOpenKeysState] = useState<any>();

  useEffect(() => {
    const openKeys: string[] = getOpens();
    setOpenKeysState(openKeys);
  }, [location]);

  const activeItem = () => {
    // Specifies which item must be active
    let activePath: string = location.pathname;

    navigationDetail.map((item: any) => {
      if (
        item.for.some((p: any) =>
          activePath.toLowerCase().includes(p.toLowerCase())
        )
      ) {
        activePath = item.active;
      }
    });
    return [activePath];
  };

  const getOpens = () => {
    // Specifies which items must be open
    let activePath: any = activeItem();

    let result: any = [];
    NavigationConfig.map((item: any) => {
      let helpResult: any = [];
      if (item.children) {
        helpResult = [...helpResult, item.id];
        item.children.map((item2: any) => {
          helpResult = [item.id];
          if (item2.children) {
            helpResult = [...helpResult, item2.id];
            item2.children.map((item3: any) => {
              if (activePath[0] === item3.path) {
                result = [...helpResult];
              }
            });
          } else {
            if (activePath[0] === item2.path) {
              result = [...helpResult];
            }
          }
        });
      }
    });
    return result;
  };

  const active: string[] = activeItem();

  const collapsedMain = width < 1200 ? false : collapsed; // sidebar can not be callaped in resposive mode

  const handleCollaps = () => {
    toggle();
  };

  const hasAccess = (value: any) => {
    // checks if user can accss to a item
    if (value.permissions) {
      try {
        return value.permissions.some((p: any) => role.includes(p));
      } catch (error) {
        return false;
      }
    } else {
      return true;
    }
  };

  // css variables
  const visibilityLogo = collapsedMain ? "d-none" : "d-flex";
  const visibilityCollapsed = width < 1200 ? "d-none" : "";
  const justifyHeader = collapsedMain
    ? "justify-content-center"
    : "justify-content-between";

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <Menu
          selectedKeys={active}
          openKeys={openKeysState}
          onOpenChange={(value) => {
            setOpenKeysState(value);
          }}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsedMain}
          className={`${Styled["menu"]}`}
        >
          <div className={`${Styled["menu-header"]} ${justifyHeader}`}>
            <NavLink to="/" className={`navbar-brand ${visibilityLogo}`}>
              <div className={`brand-logo ${Styled["manu-logo"]}`} />
              <h2 className={`${Styled["brand-text"]}`}>سبک</h2>
            </NavLink>
            <Grid
              onClick={() => handleCollaps()}
              className={`${Styled["manu-collaps-icon"]}  ${visibilityCollapsed}`}
            />
            <X
              onClick={() => sidebarVisibility()}
              color="red"
              className={`${Styled["manu-close-icon"]}`}
            />
          </div>

          {state.map((parent: any) => {
            return parent.children
              ? hasAccess(parent) && (
                  <SubMenu
                    key={parent.id}
                    icon={parent.icon}
                    title={parent.title}
                  >
                    {parent.children.map((item: any) => {
                      return item.children
                        ? hasAccess(item) && (
                            <SubMenu
                              key={item.id}
                              icon={item.icon}
                              title={item.title}
                            >
                              {item.children.map((item2: any) => {
                                return (
                                  hasAccess(item2) && (
                                    <Menu.Item
                                      title={item2.title}
                                      style={{ textOverflow: "clip" }}
                                      key={item2.path}
                                      onClick={
                                        collapsedMain
                                          ? () => {}
                                          : () => sidebarVisibility()
                                      }
                                    >
                                      <Link to={item2.path}>{item2.title}</Link>
                                    </Menu.Item>
                                  )
                                );
                              })}
                            </SubMenu>
                          )
                        : hasAccess(item) && (
                            <Menu.Item
                              onClick={
                                collapsedMain
                                  ? () => {}
                                  : () => sidebarVisibility()
                              }
                              title={item.title}
                              key={item.path}
                            >
                              <Link to={item.path}>{item.title}</Link>
                            </Menu.Item>
                          );
                    })}
                  </SubMenu>
                )
              : hasAccess(parent) && (
                  <Menu.Item
                    title={parent.title}
                    key={parent.path}
                    icon={parent.icon}
                    onClick={
                      collapsedMain ? () => {} : () => sidebarVisibility()
                    }
                  >
                    <Link to={parent.path}>{parent.title}</Link>
                  </Menu.Item>
                );
          })}
        </Menu>
      </div>
    </>
  );
};

export { SideBar };
