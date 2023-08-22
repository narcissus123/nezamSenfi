import React, { FC } from "react";
import { PrintRequestList } from "./PrintRequestList/PrintRequestList";


interface IPropTypes {
  sections: any
  id: any
  isSecretariat?: boolean
}

const PrintLicense: FC<IPropTypes> = ({ sections, id, isSecretariat }) => {
  return <PrintRequestList isSecretariat={isSecretariat} sections={sections} id={id} />;
};

export { PrintLicense };
