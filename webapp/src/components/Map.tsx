import React, { useEffect, useState, useRef } from 'react'
import Map, { useMap } from 'react-map-gl'
import { CircularProgress } from '@mui/material'

import { mapboxApiKey } from '../config/constants'

import { Coordinates } from '../types/Coordinates'

import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {

  const [isLoading , setIsLoading] = useState(true)

  const { map } = useMap()
  const mapRef = useRef()

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
  
  useEffect(locateUser,[])

  return (
    <>
      {
        isLoading ?
        <CircularProgress style={{position:'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
        : 
        <Map id='map' initialViewState={{
          latitude: 43.3602900, 
          longitude: 5.8447600, 
          zoom: 12
        }}
          onLoad={locateUser}
          style={{width: '100vw', height: '100vh'}} 
          mapboxAccessToken={mapboxApiKey}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      }
    </>
  )
}

export default MapComponent