import React, { FC, Fragment, ReactNode, useEffect } from "react";

interface IPropTypes {
  useMutate: any;
  children: ReactNode;
  setFieldError: (field: string, message: string | undefined) => void;
}

const FieldWrapper: FC<IPropTypes> = ({
  useMutate,
  children,
  setFieldError,
}) => {
  useEffect(() => {
    try {
      const errors = useMutate.error.response.data.errorFileds;
      for (let key in errors) {
        
        setFieldError(key, errors[key][0]);
      }
    } catch (error) {}
  }, [useMutate.error]);

  return <Fragment>{children}</Fragment>;
};

export { FieldWrapper };
