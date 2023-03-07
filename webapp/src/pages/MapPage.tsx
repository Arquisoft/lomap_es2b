import { MapProvider } from 'react-map-gl'

import Map from '../components/Map'
import FocusOnUserButton from '../components/FocusOnUserButton';
import Sidebar from '../components/Sidebar';

const MapPage = () : JSX.Element => {

  return (
    <MapProvider>
      <Sidebar />
      <Map />
      <FocusOnUserButton />
    </MapProvider>
    
  )
}

export default MapPage
