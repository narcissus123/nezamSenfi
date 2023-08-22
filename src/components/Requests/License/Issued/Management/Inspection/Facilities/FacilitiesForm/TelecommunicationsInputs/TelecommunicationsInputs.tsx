import React from "react";
import { FormDivider, Toggle } from "../../../../../../../../common/Form";
import TreeColumn from "../../../../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";

interface IPropsTypes {
  disabled: boolean;
}

const TelecommunicationsInputs: React.FC<IPropsTypes> = ({ disabled }) => {
  return (
    <>
      <FormDivider textHeader="مخابرات و حفاظت">
        <TreeColumn className="py-1">
          <Toggle
            id="isHaveTelephon"
            name="isHaveTelephon"
            lableText="تلفن"
            significant
            direction="ltr"
            disabled={disabled}
            className="my-0"
          />
          <Toggle
            id="isHaveInternet"
            name="isHaveInternet"
            lableText="اینترنت"
            significant
            disabled={disabled}
            direction="ltr"
            className="my-0"
          />
          <Toggle
            id="isHaveCCTV"
            name="isHaveCCTV"
            lableText="دوربین"
            significant
            disabled={disabled}
            direction="ltr"
            className="my-0"
          />
        </TreeColumn>
      </FormDivider>
    </>
  );
};

export { TelecommunicationsInputs };
