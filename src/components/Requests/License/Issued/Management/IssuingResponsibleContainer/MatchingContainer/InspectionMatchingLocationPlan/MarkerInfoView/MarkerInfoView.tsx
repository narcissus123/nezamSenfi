import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { FC, useState } from "react";


interface IPropTypes {
  item: any
}

const MarkerInfoView: FC<IPropTypes> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Marker
      position={{ lat: +item.centerX, lng: +item.centerY }}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      {isOpen && (
        <InfoWindow
          onCloseClick={() => {
            setIsOpen(false);
          }}
        >
          <div>
            <p>{`نام مزرعه: ${
              item.farmName ? item.farmName : "تعیین نشده است!"
            }`}</p>
            <p>
              {`مختصات مرکز: `}
              <span>{`lat: ${item.centerX}  `}</span>
              <span>{`long: ${item.centerY}`}</span>
            </p>
            <p>{`مساحت: ${item.area ? item.area : ""} متر مربع`}</p>
            <p>{`محیط: ${item.perimeter ? item.perimeter : ""} متر مربع`}</p>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export { MarkerInfoView };
