import { MapProvider } from 'react-map-gl'

import Map from '../components/Map'
import FocusOnUserButton from '../components/FocusOnUserButton';

const MapPage = () : JSX.Element => {

  return (
    <MapProvider>
      <Map />
      <FocusOnUserButton />
    </MapProvider>
  )
}

export default MapPage
