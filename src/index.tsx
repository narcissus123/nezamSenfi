import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

import { Layout } from "./core/utils/context/Layout";
import { PermissionsProvider } from "./core/utils/context/Permissions";
import { FallBackSpinner } from "./components/common/Spinner/FallBackSpinner";
import { Toastr } from "./components/common/Toastr";
import { StatusProvider } from "./core/utils/context/StatusProvider";
import { GlobalContext } from "./core/utils/context/GlobalContext";
import { AuthenticationContext } from "./core/utils/context/AuthenticationContext";
import { RefetchProvider } from "./core/utils/context/EventContext";
import { ErrorBoundary } from "./components/common/Wrapper/ErrorBoundary/ErrorBoundary";
import { ProfileProvider } from "./core/utils/context/ProfileContext";

import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

const LazyApp: React.LazyExoticComponent<React.FC<{}>> = lazy(() =>
  import("./App").then((module) => ({ default: module.App }))
);

// configureDatabase()
ReactDOM.render(
  <Suspense fallback={<FallBackSpinner />}>
    <ErrorBoundary>
      <Layout>
        <Toastr />
        <AuthenticationContext>
          <PermissionsProvider>
            <StatusProvider>
              <GlobalContext>
                <RefetchProvider>
                  <ProfileProvider>
                    <LazyApp />
                  </ProfileProvider>
                </RefetchProvider>
              </GlobalContext>
            </StatusProvider>
          </PermissionsProvider>
        </AuthenticationContext>
      </Layout>
    </ErrorBoundary>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
