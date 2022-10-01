import React,{useEffect, useState, useContext} from "react";
import Navbar from "../components/Navbar";
import GoogleMapReact from 'google-map-react';
import { MapContext } from "../context/mapContext";

// const map = () => {
//   return (
//     <div className="bg-gray-100 h-screen">
//       <div className="mapouter">
//         <div className="gmap_canvas">
//           <iframe
//             className="w-full h-screen"
//             id="gmap_canvas"
//             src="https://maps.google.com/maps?q=connaught%20place&t=&z=13&ie=UTF8&iwloc=&output=embed"
//             frameBorder="0"
//             scrolling="no"
//             marginHeight="0"
//             marginWidth="0"
//           ></iframe>
//           <a href="https://www.embedgooglemap.net/blog/divi-discount-code-elegant-themes-coupon/"></a>
//           <br />
//         </div>
//       </div>
//       <Navbar />
//     </div>
//   );
// };

// export default map;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({}) {
  const {lat,long} = useContext(MapContext);
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      {lat ? <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP_KEY }}
        defaultCenter={{ lat: lat, lng: long }}
        defaultZoom={20}
      >
        <AnyReactComponent
          lat={lat}
          lng={long}
          text="You are here"
        />
      </GoogleMapReact>:<h1>Loading...</h1>}
      <Navbar/>
    </div>
  );
}