import classnames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { FileText, Info, Paperclip, Tool, User } from "react-feather";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import BreadCrumbs from "../../common/@vuexy/breadCrumbs/BreadCrumb";

interface IPropTypes {
  children: {
    identitiy: ReactNode;
    contactInfo: ReactNode;
    jobInfo: ReactNode;
    machineInfo: ReactNode;
    servicesInfo: ReactNode;
    docInfo?: ReactNode;
    cancellationDocumentsTable?: ReactNode
  };
}

const PersonalInfoByIdContainer: React.FC<IPropTypes> = ({
  children: {
    identitiy,
    contactInfo,
    jobInfo,
    machineInfo,
    servicesInfo,
    docInfo,
    cancellationDocumentsTable
  },
}) => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("1");

  const toggle = (tab: string) => {
    setActiveTab(tab);
  };

  const updateWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (window !== undefined) {
      updateWidth();
      window.addEventListener("resize", updateWidth);
    }
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات کاربر"
        breadCrumbParent="کاربران"
        breadCrumbActive="اطلاعات کاربر"
      />

      <div
        className={`${
          windowWidth && windowWidth >= 769
            ? "nav-vertical"
            : "account-setting-wrapper"
        }`}
      >
        <React.Fragment>
          <div
            className={`${
              windowWidth
                ? windowWidth >= 769
                  ? "nav-vertical"
                  : "account-setting-wrapper"
                : "account-setting-wrapper"
            }`}
          >
            <Nav className="account-settings-tab nav-left mr-0 mr-sm-3" tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  <User size={16} />
                  <span className="d-md-inline-block d-none align-middle ml-1">
                    اطلاعات هویتی
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  <FileText size={16} />
                  <span className="d-md-inline-block d-none align-middle ml-1">
                    اطلاعات تماس
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "3",
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  <Info size={16} />
                  <span className="d-md-inline-block d-none align-middle ml-1">
                    اطلاعات شغلی
                  </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "6",
                  })}
                  onClick={() => {
                    toggle("6");
                  }}
                >
                  <Paperclip size={16} />
                  <span className="d-md-inline-block d-none align-middle ml-1">
                    اسناد کاربر
                  </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "7",
                  })}
                  onClick={() => {
                    toggle("7");
                  }}
                >
                  <Paperclip size={16} />
                  <span className="d-md-inline-block d-none align-middle ml-1">
                    اسناد ابطال
                  </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "4",
                  })}
                  onClick={() => {
                    toggle("4");
                  }}
                >
                  <Info size={16} />
                  <span className="d-md-inline-block d-none align-middle ml-1">
                    اطلاعات ماشین
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "5",
                  })}
                  onClick={() => {
                    toggle("5");
                  }}
                >
                  <Tool size={16} />
                  <span className="d-md-inline-block d-none align-middle ml-1">
                    اطلاعات ادوات و خدمات
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    {activeTab === "1" ? identitiy : <></>}
                  </TabPane>
                  <TabPane tabId="2">
                    {activeTab === "2" ? contactInfo : <></>}
                  </TabPane>
                  <TabPane tabId="3">
                    {activeTab === "3" ? jobInfo : <></>}
                  </TabPane>
                  <TabPane tabId="4">
                    {activeTab === "4" ? machineInfo : <></>}
                  </TabPane>
                  <TabPane tabId="5">
                    {activeTab === "5" ? servicesInfo : <></>}
                  </TabPane>
                  <TabPane tabId="6">
                    {activeTab === "6" ? docInfo : <></>}
                  </TabPane>
                  <TabPane tabId="7">
                    {activeTab === "7" ? cancellationDocumentsTable : <></>}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export { PersonalInfoByIdContainer };
