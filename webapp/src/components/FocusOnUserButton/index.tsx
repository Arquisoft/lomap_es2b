import React from 'react'
import { Fab } from '@mui/material'
import { useMap } from 'react-map-gl'

import './focusOnUserButton.css'

const FocusOnUserButton = () => {
  
  const { map } = useMap()

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map?.flyTo({ center: { lat: position.coords.latitude, lng: position.coords.longitude }, zoom: 12 })
      })
    }
  }

  return (
    <Fab className='locate-button' onClick={getLocation}>Localizar</Fab>
  )
}

export default FocusOnUserButton