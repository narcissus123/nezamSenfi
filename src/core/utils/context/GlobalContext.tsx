import React, { useState, useContext } from "react";

type globalContextType = {
  // first step
  registerInfo: [number, React.Dispatch<React.SetStateAction<number>>];
  phoneNumber: [string, React.Dispatch<React.SetStateAction<string>>];
  mainLocationId: [number, React.Dispatch<React.SetStateAction<number>>];
  req_id: [string, React.Dispatch<React.SetStateAction<string>>];
  section_id: [string, React.Dispatch<React.SetStateAction<string>>];
  boundaryList: [any, React.Dispatch<React.SetStateAction<any>>];
  topographyList: [any, React.Dispatch<React.SetStateAction<any>>];
  ownerShipList: [any, React.Dispatch<React.SetStateAction<any>>];
};

// type useGlobalStateType = "registerInfo"; //second step

const globalContext = React.createContext<globalContextType | null>(null);

export const useGlobalState = () => {
  const pc = useContext(globalContext);
  if (pc === null) {
    throw new Error("useGlobalState Must be inside of Provider");
  }
  return pc;
};

const GlobalContext: React.FC = ({ children }) => {
  const [registerInfo, setResgisterInfo] = useState(0); // third step
  const [phoneNumber, setPhoneNumber] = useState(""); // third step
  const [mainLocationId, setMainLocationId] = useState<number>(2); // third step
  const [reqId, setReqId] = useState<string>("0"); // third step
  const [secId, setSecId] = useState<string>("0"); // third step
  const [boundaryList, setBoundaryList] = useState<any>([]);
  const [topographyList, setTopographyList] = useState<any>(null);
  const [ownerShipList, setOwnerShipList] = useState<any>(null);
  return (
    <>
      <globalContext.Provider
        value={{
          registerInfo: [registerInfo, setResgisterInfo], // Fourth step
          phoneNumber: [phoneNumber, setPhoneNumber],
          mainLocationId: [mainLocationId, setMainLocationId],
          req_id: [reqId, setReqId],
          section_id: [secId, setSecId],
          boundaryList: [boundaryList, setBoundaryList],
          topographyList: [topographyList, setTopographyList],
          ownerShipList: [ownerShipList, setOwnerShipList],
        }}
      >
        {children}
      </globalContext.Provider>
    </>
  );
};

export { GlobalContext };
