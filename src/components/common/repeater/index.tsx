// ** Third Party Components

import React from "react";

export const Repeater = (props: any) => {
  // ** Props
  const { count, tag, component, children, ...rest }: any = props;

  // ** Custom Tag
  const Tag: any = tag;

  // ** Default Items
  const items: any = [];

  // ** Loop passed count times and push it in items Array
  for (let i = 0; i < count; i++) {
    items.push(children(i));
  }

  return <Tag {...rest}>{items}</Tag>;
};

// // ** PropTypes
// Repeater.propTypes = {
//   count: PropTypes.any.isRequired,
//   tag: PropTypes.any.isRequired,
// };

// ** Default Props
Repeater.defaultProps = {
  tag: "div",
};

export default Repeater;
