"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, AttributionControl } from "react-leaflet";

const manwaisIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize:    [25, 41] as [number, number],
  iconAnchor:  [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  shadowSize:  [41, 41] as [number, number],
});

const MANWAIS_POS: [number, number] = [32.2789, 72.8977];

export default function ManwaisMap() {
  return (
    <MapContainer
      center={MANWAIS_POS}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      dragging={true}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      attributionControl={false}
    >
      <TileLayer
        url={`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_CARTO_KEY}`}
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
      />
      <AttributionControl position="bottomright" prefix={false} />
      <Marker position={MANWAIS_POS} icon={manwaisIcon} />
    </MapContainer>
  );
}