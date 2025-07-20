import React, { useState,useEffect } from 'react'
import { MapContainer, TileLayer, Marker,useMapEvents } from 'react-leaflet';

function ClickableMap({onClick=()=>{}}) {
    const map = useMapEvents({
      click: (e) => {
        onClick(e)
      },
    })
    return null
  }

const LocationSelector = ({defaultLocation={lat:-18.777192,lng:46.854328},onInit=()=>{},onSelect=()=>{}}) => {
    const [location,setLocation]=useState(defaultLocation)

    useEffect(()=>{
        onInit(defaultLocation)
    },[])

    return (
        <div className='location-selector'>
            <MapContainer
                center={[location.lat, location.lng]}
                zoom={7}
                scrollWheelZoom={false}
                className='map'

            >
                <ClickableMap onClick={(e)=>{
                    onSelect(e.latlng)
                    setLocation(e.latlng)
                    console.log(e.latlng)
                }}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.lat, location.lng]}></Marker>
            </MapContainer>
        </div>
    )
}

export default LocationSelector
