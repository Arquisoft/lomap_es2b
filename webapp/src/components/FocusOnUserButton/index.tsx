import { Fab } from '@mui/material'
import { useMap } from 'react-map-gl'
import { BiCurrentLocation } from 'react-icons/bi'

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
    <Fab className='locate-button' onClick={getLocation} style={{position: 'absolute', margin: '1.5em', zIndex: 99}}><BiCurrentLocation size='2em' /></Fab>
  )
}

export default FocusOnUserButton