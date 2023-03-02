import { useEffect, useState } from 'react'
import Map, { useMap } from 'react-map-gl'
import { CircularProgress } from '@mui/material'

import { mapboxApiKey } from '../../config/constants'

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'

const MapComponent = () => {

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
        />
      }
    </>
  )
}

export default MapComponent