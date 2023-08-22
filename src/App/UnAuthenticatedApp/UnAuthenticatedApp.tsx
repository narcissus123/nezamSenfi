import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./../../history";
import { RegisterContainer } from "../../components/Authentication/RegisterContainer";
import { SigninOidc } from "../../components/Authentication/SigninOidc/SigninOidc";
import { SignOutOidc } from "../../components/Authentication/SignOutOidc/SignOutOidc";
import { showToast } from "../../core/utils";
import { ToastTypes } from "../../core/enums";
import { SuccessPage } from "../../screens/Wallet/SuccessPage/SuccessPage";
import { FailPage } from "../../screens/Wallet/FailPage/FailPage";
import { LoginContainer } from "../../components/Authentication/LoginContainer/LoginContainer";
import { QrCode } from "../../screens/Requests/License/PrintLicense/QrCode/QrCode";



const UnAuthenticatedApp: React.FC = () => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/Register" render={() => <RegisterContainer />} />
          <Route path="/Login" render={() => <LoginContainer />} />
          <Route exact path="/Wallet/Success" render={() => <SuccessPage />} />
          <Route exact path="/Wallet/Fail" render={() => <FailPage />} />
          <Route exact path="/licenseQrCode/:qrcode" render={() => <QrCode />} />
          <Route exact path="/" render={() => <Redirect to="/Login" />} />
          <Route path="/signin-oidc" component={SigninOidc} />
          <Route path="/signout-oidc" component={SignOutOidc} />
          <Route
            render={() => {
              history.push("/");
              showToast(["لطفا ابتدا وارد شوید"], ToastTypes.error);
              return null;
            }}
          />
        </Switch>
      </Router>
    </>
  );
};

export { UnAuthenticatedApp };
