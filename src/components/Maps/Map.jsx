import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = () => {

  const coords = [36.714600, 4.045710]

  return (
    <div className='h-[65%] w-[90%] justify-center items-center rounded-xl overflow-auto'>
      <MapContainer  className='h-full w-full' center={coords} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>
            Welcome ! <br />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map