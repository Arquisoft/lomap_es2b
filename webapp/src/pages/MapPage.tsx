import { LngLat, MapProvider} from 'react-map-gl'

import Map from '../components/Map'
import FocusOnUserButton from '../components/FocusOnUserButton';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavBar';
import { useContext, useEffect, useState } from 'react';
import AddMarkerPopup from '../components/AddMarkerPopup';
import {IMarker} from '../types/IMarker'
import {saveMarkerToPod } from '../helpers/SolidHelper';
import { useSession } from '@inrupt/solid-ui-react';
import { MarkerContext, Types } from '../context/MarkersContext';
import FriendsPopup from '../components/FriendsPopup';

export enum Popups {
  NONE,
  ADD_MARKER,
  FRIENDS,
}

const MapPage = () : JSX.Element => {


  const[popupVisible,setPopupVisible] = useState<Popups>(Popups.NONE)
  const [lngLat, setLngLat] = useState<LngLat>();
  const {session} = useSession();

  const { state: markers, dispatch } = useContext(MarkerContext)

  function showAddMarkerPopup(lngLat: LngLat): void{
    setPopupVisible(Popups.ADD_MARKER)
    setLngLat(lngLat)
  }

  function openPopup(popup : Popups) {
    setPopupVisible(popup)
  }

  function closePopup() {
    setPopupVisible(Popups.NONE)
  }

  function addMark(name:string, lngLat:LngLat|undefined,description:string){
    if(lngLat===undefined){
      return
    }
    var newMarker:IMarker = { 
      id: markers.length+1, 
      name: name, 
      address: "Value 1", 
      lat: lngLat.lat, 
      lng: lngLat.lng, 
      date: new Date(), 
      images: [], 
      description: 
      description, 
      category: [], 
      comments: [], 
      score: 10 
    }
    dispatch({ type: Types.ADD, payload: { marker: newMarker } })
    closePopup()
  }

  useEffect(() => {
    saveMarkerToPod(markers, session.info.webId)
  }, [markers, session.info.webId])

  return (
    <MapProvider>
      <Navbar openPopup={openPopup} />
      <Sidebar />
      <Map onClick={showAddMarkerPopup} />
      <FocusOnUserButton />
      <AddMarkerPopup closePopup={closePopup} visible={popupVisible === Popups.ADD_MARKER} lngLat={lngLat} addMark={addMark}/>
      <FriendsPopup closePopup={closePopup} isOpen={popupVisible === Popups.FRIENDS} />
    </MapProvider> 
  )
}

export default MapPage
