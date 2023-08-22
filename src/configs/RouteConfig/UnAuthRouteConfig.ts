import { FullPageLayout } from "../../App/AuthenticatedApp/Layout/FullpageLayout";
import SuccessRegister from "../../components/Authentication/RegisterContainer/SuccessRegister/SuccessRegister";
import { AllStatusType } from "../../core/models";
import { LegalUserRegister } from "../../screens/Authentication/Register/LegalUserRegister/LegalUserRegister";
import { RealUserRegister } from "../../screens/Authentication/Register/RealUserRegister/RealUserRegister";
import { Register } from "../../screens/Authentication/Register/Register";
import { VerificationCode } from "../../screens/Authentication/Register/VerificationCode/VerificationCode";

interface IStatus {
  statusKey?: string;
  status?: AllStatusType[];
  redirectPath?: string;
  redirectName?: string;
  exact?: boolean;
  path: string;
  layout: React.ReactNode;
  component: React.ReactNode;
}

export const registerRoutes: Array<IStatus> = [
  {
    exact: true,
    path: "/Register",
    layout: FullPageLayout,
    component: Register,
  },
  {
    exact: true,
    path: "/Register/RegisterUserReal",
    layout: FullPageLayout,
    component: RealUserRegister,
    statusKey: "registerFlow",
    status: ["realUserRegister"],
    redirectPath: "/Register",
    redirectName: "صفحه ورود",
  },
  {
    exact: true,
    path: "/Register/RegisterUserLegal",
    layout: FullPageLayout,
    component: LegalUserRegister,
    statusKey: "registerFlow",
    status: ["legalUserRegister"],
    redirectPath: "/Register",
    redirectName: "صفحه ورود",
  },
  {
    exact: true,
    path: "/Register/VerificationCode",
    layout: FullPageLayout,
    component: VerificationCode,
    statusKey: "registerFlow",
    status: ["verificationCode"],
    redirectPath: "/Register",
    redirectName: "صفحه ورود",
  },
  {
    exact: true,
    path: "/Register/SuccessRegister",
    layout: FullPageLayout,
    component: SuccessRegister,
  },
];
