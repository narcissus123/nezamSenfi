import React, { FC, Fragment } from "react";
import { useLocation } from "react-router";
import { IsSameUrl } from "../../../../core/utils";

interface IPropTypes {
  url: Array<string>;
}

const CanRenderByPath: FC<IPropTypes> = ({ url, children }) => {
  url = typeof url === "string" ? [url] : url;
  const location = useLocation();
  const result = url.some((item: string) => IsSameUrl(location.pathname, item));
  if (result) return <Fragment>{children}</Fragment>;
  else return null;
};

export { CanRenderByPath };
