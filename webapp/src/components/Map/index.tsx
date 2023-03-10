import { useEffect, useState } from 'react'
import Map, { LngLat, Marker, useMap } from 'react-map-gl'
import { CircularProgress } from '@mui/material'

import { mapboxApiKey } from '../../config/constants'

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import { IMarker } from '../../types/Marker';

interface Props{
    onClick:(lngLat:LngLat,visible:boolean)=>void;
    markers: IMarker[];
}

const MapComponent = ({onClick, markers}:Props) => {

  const [isLoading , setIsLoading] = useState(true)

  const { map } = useMap()



  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map?.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
        setIsLoading(false)
      }, (error) => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }
  
  useEffect(locateUser,[map])

  return (
    <>
      {
        isLoading ?
        <CircularProgress className='loader' />
        : 

        <Map id='map' initialViewState={{
          latitude: 43.3602900, 
          longitude: 5.8447600, 
          zoom: 12
        }}
          onLoad={locateUser}
          mapboxAccessToken={mapboxApiKey}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onClick={(MapLayerMouseEvent)=>{onClick(MapLayerMouseEvent.lngLat,false)}}
          onDblClick={(MapLayerMouseEvent)=>{onClick(MapLayerMouseEvent.lngLat,true)
            MapLayerMouseEvent.preventDefault()
          }
        }>
          {markers.map((marker,index)=>
          <Marker 
          key={marker.id}
          longitude={marker.lng}
          latitude={marker.lat}
          />
          )}
        </Map>
      }
    </>
  )
}

export default MapComponent