import React, { ReactNode } from "react";
import classnames from "classnames";

import { themeConfig } from "../../../configs/themeConfig";

interface IPropTypes {
  children: ReactNode;
}

const FullPageLayout: React.FC<IPropTypes> = ({ children, ...rest }) => {
  return (
    <div
      className={classnames(
        "full-layout wrapper bg-full-screen-image blank-page dark-layout",
        {
          "layout-dark": themeConfig.theme === "dark",
        }
      )}
    >
      <div className="app-content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="flexbox-container">
              <main className="main w-100">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FullPageLayout };
