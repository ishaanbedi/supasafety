import React, { useState, useEffect, createContext } from "react";
export const MapContext = createContext({ lat: "", long: "" });

export const MapProvider = ({ children }) => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  let position = {};
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(() => position.coords.latitude);
      setLong(() => position.coords.longitude);
    });
    position = { lat: lat, long: long };
  }, []);
  return (
    <MapContext.Provider value={{ lat, long }}>{children}</MapContext.Provider>
  );
};
