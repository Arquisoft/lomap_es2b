import React, { useRef, useEffect, useState } from 'react';
import { MapProvider } from 'react-map-gl'

import Map from '../components/Map'
import FocusOnUserButton from '../components/FocusOnUserButton';
import { Coordinates } from '../types/Coordinates'

const MapPage = () : JSX.Element => {

  // const [coords, setCoords] = useState<Coordinates>({  })

  return (
    <MapProvider>
      <Map />
      <FocusOnUserButton />
    </MapProvider>
  )
}

export default MapPage
