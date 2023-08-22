import React, { useEffect, useState } from "react";
import { TopographyForm } from "./TopographyForm";

interface IPropTypes {
  useMutation: any;
  isExpert: boolean;
}

const Topography: React.FC<IPropTypes> = ({ isExpert, useMutation }) => {
  return (
    <>
      <TopographyForm useMutation={useMutation} isExpert={isExpert} />
    </>
  );
};

export { Topography };
