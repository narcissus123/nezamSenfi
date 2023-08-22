import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: FC = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};

export { ScrollToTop };
