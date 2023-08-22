import React from "react";

interface IPropTypes {
  cell: {
    row: {
      values: { sections: any[] };
      original: { licenseRequestId: number };
    };
  };
}

const SectionsDetails: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { sections },
      original: { licenseRequestId },
    },
  },
}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {sections.map((section, index) => (
        <div>
          <p className="mt-1 mb-1">
            مختصات ارائه شده با قطعه {section.sectionId} به شماره درخواست{" "}
            {licenseRequestId} تداخل دارد
          </p>
          {sections.length - 1 !== index && <hr style={{ marginBottom: 0 }} />}
        </div>
      ))}
    </div>
  );
};

export { SectionsDetails };
