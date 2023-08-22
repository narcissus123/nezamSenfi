import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Land } from "../../../../components/Requests/License/shared/Land/Land";

const LandScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل کارشناس"
        parentLink="/ManageLicense/MyCartable"
        breadCrumbActive="ایجاد قطعه"
      />
      <Land />
    </>
  );
};
export { LandScreen };

// import React, { FC, useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";
// import { Card, CardBody } from "reactstrap";

// const MapTest: FC = () => {
//   const state = {
//     center: {
//       lat: 25.774,
//       lng: -80.19,
//     },
//     zoom: 1,
//   };

//   const [polygon, setPolygon] = useState<any>(null);

//   const handleApiLoaded = (map: any, maps: any) => {
//     const triangleCoords = [
//       { lat: 25.774, lng: -80.19 },
//       { lat: 18.466, lng: -66.118 },
//       { lat: 32.321, lng: -64.757 },
//       { lat: 25.774, lng: -80.19 },
//     ];

//     const bermudaTriangle = new maps.Polygon({
//       paths: triangleCoords,
//       strokeColor: "#FF0000",
//       strokeOpacity: 0.8,
//       strokeWeight: 2,
//       fillColor: "#FF0000",
//       fillOpacity: 0.35,
//       editable: true,
//       draggable: true,
//     });
//     bermudaTriangle.setMap(map);
//     setPolygon(bermudaTriangle.getPath().getArray());
//     // Add a listener for the click event.
//     bermudaTriangle.addListener("click", showArray);
//   };

//   useEffect(() => {
//     if (polygon) {
//       console.log(polygon);
//     }
//   }, [polygon]);

//   const showArray = (e: any, b: any) => {
//     console.log(e.latLng.lat());
//     try {
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Card>
//       <CardBody>
//         <div style={{ height: "100vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: "" }}
//             defaultCenter={state.center}
//             defaultZoom={state.zoom}
//             yesIWantToUseGoogleMapApiInternals
//             onChange={(e) => console.log(e)}
//             onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//           ></GoogleMapReact>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

// export { MapTest };
