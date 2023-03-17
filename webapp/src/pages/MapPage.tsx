import { LngLat, MapProvider} from 'react-map-gl'

import Map from '../components/Map'
import FocusOnUserButton from '../components/FocusOnUserButton';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavBar';
import { useContext, useEffect, useState } from 'react';
import AddPopup from '../components/AddPopup';
import {IMarker} from '../types/IMarker'
import { readMarkerFromPod, saveMarkerToPod } from '../helpers/SolidHelper';
import { useSession } from '@inrupt/solid-ui-react';
import { MarkerContext, Types } from '../context/MarkersContext';

const MapPage = () : JSX.Element => {

  const[popupVisible,setPopupVisible] = useState(false)
  const [lngLat, setLngLat] = useState<LngLat>();
  const {session} = useSession();

  const { state: markers, dispatch } = useContext(MarkerContext)

  function showPopup(lngLat: LngLat, visible:boolean): void{
    setPopupVisible(visible)
    setLngLat(lngLat)
  }

  function addMark(name:string, lngLat:LngLat|undefined,description:string){
    if(lngLat===undefined){
      return
    }
    var newMarker:IMarker={ id: markers.length+1, name: name, address: "Value 1", lat: lngLat.lat, lng: lngLat.lng, date: new Date, images: [], description: description, category: [], comments: [], score: 10 }
    dispatch({ type: Types.ADD, payload: { marker: newMarker } })
    setPopupVisible(false)
  }

  useEffect(() => {
    saveMarkerToPod(markers, session.info.webId)
  }, [markers])

  return (
    <MapProvider>
      <Navbar />
      <Sidebar />
      <Map onClick={showPopup}/>
      <FocusOnUserButton />
      <AddPopup visible={popupVisible} lngLat={lngLat} addMark={addMark}/>
    </MapProvider>
    
  )
}

export default MapPage
