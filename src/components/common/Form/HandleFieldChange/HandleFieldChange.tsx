// import { connect } from "formik";
// import React, { ComponentType, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const HandleFieldChange: ComponentType<any> = connect(
//   ({
//     name,
//     formik: {
//       values: { [name]: value },
//       values,
//     },
//     onChange = (val: any) => {},
//     children,
//     ...props
//   }) => {
//     const history = useHistory();

//     const [check, setCheck] = useState(false);
//     const [finalCheck, setFinalCheck] = useState(true);
//     useEffect(() => {
//       setTimeout(() => {
//         setCheck(true);
//       }, 100);
//       let unBlock: any;
//       if (Object.is(values, props.initialValues))
//       else if (check && finalCheck) {
//         unBlock = history.block(() => {

//           return false;
//         });
//       } //props.setChange(true);
//       return () => {
//         if (!Object.is(values, props.initialValues) && check) {
//           history.block(true);
//         }
//       };
//     }, [onChange, value]);
//     return <>{children}</>;
//   }
// );

// export { HandleFieldChange };
export const test = "s";
