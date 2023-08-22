import React from "react";
import { Unions } from "./Unions";

export interface UnionsContainerProps {}

const UnionsContainer: React.FC<UnionsContainerProps> = () => {
  return (
    <>
      <Unions />
    </>
  );
};

export { UnionsContainer };
