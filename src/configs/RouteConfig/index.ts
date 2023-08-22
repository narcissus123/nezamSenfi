import { AuthenticatedRoutesConfig } from "./RouteConfig";
import { BasicInformationConfig } from "./BasicInformationConfig";
import { UserRoles } from "../../core/enums";
import { GuildsUnionsConfig } from "./GuildsUnionsConfig";
import { LicensingConfig } from "./LicensingConfig";
import { LicenseCancellationConfig } from './LicenseCancellationConfig'

export interface IAuthenticatedRoute {
  path: string;
  component: React.ReactNode;
  status?: number;
  exact: boolean;
  roles: Array<UserRoles>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...AuthenticatedRoutesConfig,
  ...BasicInformationConfig,
  ...GuildsUnionsConfig,
  ...LicensingConfig,
  ...LicenseCancellationConfig
];
