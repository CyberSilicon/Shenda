// import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// import "leaflet-defaulticon-compatibility";
import { useEffect, useRef } from "react";
import L from "leaflet";
  
  // Import leaflet.css file
  import "leaflet/dist/leaflet.css";
  
  function Map() {
    const mapRef = useRef(null);
  
    useEffect(() => {
      const mapNode = mapRef.current;
      const map = L.map(mapNode, {
        center: [36.714600, 4.045710],
        zoom: 13,
      });
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);
  
      return () => {
        map.remove();
      };
    }, []);
  
    return <div ref={mapRef} className="h-64 w-64"></div>;
  }
  
  export default Map;
  