import React, { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "./Map.css";

export default function Map({ obs }) {
  return (
    <MapContainer
      center={[31.4117257, 35.0818155]}
      zoom={7}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {obs.map((location, index) => {
        return (
          <div>
            <Marker key={index} position={[location.lat, location.lng]}>
              <Tooltip>{location.locName}</Tooltip>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
