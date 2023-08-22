import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { FC, useState } from "react";


interface IPropTypes {
  item: any;
}

const MarkerInfoView: FC<IPropTypes> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <Marker
      position={{ lat: +item.centerPointY, lng: +item.centerPointX }}
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
            <p>{item.buildingTypeTitle}</p>
            <p>{item.otherDetails}</p>
            <p>
              <span> {`طول: ${item.width} متر `} </span>
              <span> {`عرض: ${item.length} متر`} </span>
            </p>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export { MarkerInfoView };
