import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { SigninOidc } from "../../components/Authentication/SigninOidc/SigninOidc";
import { SignOutOidc } from "../../components/Authentication/SignOutOidc/SignOutOidc";
import { ProtectedRoute } from "../../components/common/RouteComponents/ProtectedRoute";
import { FailPage } from "../../components/WalletContainer/FailPage/FailPage";
import { SuccessPage } from "../../components/WalletContainer/SuccessPage/SuccessPage";
import { IAuthenticatedRoute } from "../../configs/RouteConfig";
import AuthenticatedRoutesConfig from "../../configs/RouteConfig/index";
import { ToastTypes } from "../../core/enums";
import { showToast } from "../../core/utils";
import { history } from "../../history";
import { AccessDenied } from "../../screens/Errors/AccessDenied";

import { Install } from "../../screens/Requests/License/PrintLicense/Install";
import { Land } from "../../screens/Requests/License/PrintLicense/Land/Land";
import { Routing } from "../../screens/Requests/License/PrintLicense/Routing/Routing";
import { SectionPlan } from "../../screens/Requests/License/PrintLicense/SectionPlan/SectionPlan";
import { FacilityPlan } from "../../screens/Requests/License/PrintLicense/FacilityPlan/FacilityPlan";
import { Point } from "../../screens/Requests/License/PrintLicense/Point/Point";

import { Routing as SecretariatRouting } from "../../screens/Requests/License/PrintLicense/Secretariat/Routing/Routing";
import { SectionPlan as SecretariatSectionPlan } from "../../screens/Requests/License/PrintLicense/Secretariat/SectionPlan/SectionPlan";
import { FacilityPlan as SecretariatFacilityPlan } from "../../screens/Requests/License/PrintLicense/Secretariat/FacilityPlan/FacilityPlan";
import { Point as SecretariatPoint } from "../../screens/Requests/License/PrintLicense/Secretariat/Point/Point";
import { QrCode } from "../../screens/Requests/License/PrintLicense/QrCode/QrCode";
import { Certificate } from "../../screens/Requests/License/PrintLicense/Certificate/Certificate";

const AuthenticatedApp: React.FC = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          {AuthenticatedRoutesConfig.map((item: IAuthenticatedRoute, key) => {
            return (
              <ProtectedRoute
                path={item.path}
                component={item.component}
                exact={item.exact}
                roles={item.roles}
                status={item.status ? item.status : undefined}
                key={key}
              />
            );
          })}

          <Route path="/signin-oidc" component={SigninOidc} />
          <Route path="/signout-oidc" component={SignOutOidc} />
          <Route exact path="/access-denied" component={AccessDenied} />
          <Route exact path="/Wallet/Success" component={SuccessPage} />
          <Route exact path="/Wallet/Fail" component={FailPage} />
          <Route
            exact
            path="/licenseQrCode/:qrcode"
            render={() => <QrCode />}
          />

          <Route
            exact
            path="/license/utm/land/SectionPoints/:id/:section_id"
            component={Point}
          />
          <Route
            exact
            path="/license/utm/install/print/:id"
            component={Install}
          />
          <Route exact path="/license/utm/land/print/:id" component={Land} />
          <Route
            exact
            path="/license/utm/land/Routing/:id"
            component={Routing}
          />

          <Route
            exact
            path="/license/utm/land/SectionPlan/:id/:section_id"
            component={SectionPlan}
          />

          <Route
            exact
            path="/license/utm/land/Certificate/:id/"
            component={Certificate}
          />

          <Route
            exact
            path="/license/utm/land/FacilityPlan/:id/:section_id"
            component={FacilityPlan}
          />
          <Route
            exact
            path="/license/utm/land/secretariat/SectionPoints/:id/:section_id"
            component={SecretariatPoint}
          />
          <Route
            exact
            path="/license/utm/land/secretariat/Routing/:id"
            component={SecretariatRouting}
          />
          <Route
            exact
            path="/license/utm/land/secretariat/SectionPlan/:id/:section_id"
            component={SecretariatSectionPlan}
          />
          <Route
            exact
            path="/license/utm/land/secretariat/FacilityPlan/:id/:section_id"
            component={SecretariatFacilityPlan}
          />
          <Route
            path="/Register"
            render={() => {
              history.push("/");
              return null;
            }}
          />
          <Route
            render={() => {
              history.push("/");
              showToast(["صفحه مورد نظر یافت نشد"], ToastTypes.error);
              return null;
            }}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export { AuthenticatedApp };
