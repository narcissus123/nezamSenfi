import React from "react";

interface IPropTypes {
  cell: {
    row: {
      original: {
        name: string;
        lastName: string;
      };
    };
  };
}

const IntersectUserName: React.FC<IPropTypes> = ({
  cell: {
    row: {
      original: { name, lastName },
    },
  },
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <p>
        {name} {lastName}
      </p>
    </div>
  );
};

export { IntersectUserName };
