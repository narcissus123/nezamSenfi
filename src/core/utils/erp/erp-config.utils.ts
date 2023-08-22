import { JobRequestErp } from "./job-request-erp.utils";
import { GuildsActivationErp } from "./guild-activation-erp.utils";
import { LicenseIssuedErp } from "./license-issued-erp.utils";
import { LicenseCancellationErp } from "./license-cancellation-erp.utils";
import { IdentityChangeErp } from "./identity-change-erp.utils";

export const ErpConfig: any = {
  ...JobRequestErp,
  ...GuildsActivationErp,
  ...LicenseIssuedErp,
  ...LicenseCancellationErp,
  ...IdentityChangeErp,
};
