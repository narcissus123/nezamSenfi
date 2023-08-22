import React from "react";
import { FormDivider, Toggle } from "../../../../../../../../common/Form";
import { TwoColumn } from "../../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropsTypes {
  disabled: boolean;
}

const EquipmentStatusInputs: React.FC<IPropsTypes> = ({ disabled }) => {
  return (
    <>
      <FormDivider textHeader="وضعیت تجهیزات " classNames="py-1">
        <TwoColumn>
          <div>
            <Toggle
              id="isHaveAdministrativeSystem"
              name="isHaveAdministrativeSystem"
              lableText="سیستم اداری"
              significant
              className="my-1"
              disabled={disabled}
            />
            <Toggle
              id="isHaveFertilizerDryingSystem"
              name="isHaveFertilizerDryingSystem"
              lableText="سیستم کود خشک کنی"
              significant
              disabled={disabled}
              className="my-1"
            />

            <Toggle
              id="isHaveClassificationEquipment"
              name="isHaveClassificationEquipment"
              lableText="تجهیزات سورت و دسته بندی"
              significant
              className="my-1"
              disabled={disabled}
            />
          </div>
          <div>
            <Toggle
              id="isHaveWeighingEquipment"
              name="isHaveWeighingEquipment"
              lableText="تجهیزات توزین"
              significant
              className="my-1"
              disabled={disabled}
            />

            <Toggle
              id="isHaveFeedProductionSystem"
              name="isHaveFeedProductionSystem"
              lableText="سیستم تولید دان/خوراک"
              significant
              disabled={disabled}
              className="my-1"
            />
            <Toggle
              id="isHaveAtumaticWaterAndPower"
              name="isHaveAtumaticWaterAndPower"
              lableText="سیستم آب و تغذیه اتوماتیک"
              significant
              disabled={disabled}
              className="my-1"
            />
          </div>
        </TwoColumn>
        <Toggle
          id="isHaveQualityControlSystem"
          name="isHaveQualityControlSystem"
          lableText="سیستم کنترل کیفیت/تجهیزات آزمایشگاهی و درمانگاهی"
          significant
          disabled={disabled}
          className="my-1"
        />
        <Toggle
          id="isHaveTransferEquipment"
          name="isHaveTransferEquipment"
          lableText="تجهیزات نقل و انتقالات و جابجایی"
          significant
          disabled={disabled}
          className="my-1"
        />
      </FormDivider>
    </>
  );
};

export { EquipmentStatusInputs };
