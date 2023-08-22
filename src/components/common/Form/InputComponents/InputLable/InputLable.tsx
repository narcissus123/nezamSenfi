import * as React from "react";
import { Label } from "reactstrap";
import { DetailsPopover } from "../../DetaillsPopover/DetailsPopover";

import Styled from "./InputLable.module.scss";

export interface InpuLableProps {
  significant: boolean;
  lableText?: string;
  className?: string;
  hasInfo?: boolean;
  infoTitle?: string;
  info?: string;
  infoUniqueId?: string
  popoverPlacement?:"top" | "bottom" | "left" | "right" 
}

const InpuLable: React.FC<InpuLableProps> = ({
  significant,
  lableText,
  className,
  hasInfo,
  infoTitle,
  info,
  infoUniqueId,
  popoverPlacement = "top"
}) => {
  return (
    <>
      <Label
        for="InputHelp"
        className={`${Styled["input-margin"]} ${className}`}
      >
        {lableText}
      </Label>
      {significant && (
        <small className="text-muted">
          <i className="danger"> * </i>
        </small>
      )}

      {hasInfo && infoTitle && info && infoUniqueId && (
        <DetailsPopover
          id={infoUniqueId}
          placement={popoverPlacement}
          title={infoTitle}
          text={info}
        />
      )}
    </>
  );
};

export { InpuLable };
