import { useContext, useState } from 'react';
import { LngLat, MapProvider} from 'react-map-gl'
import { v4 as uuid } from 'uuid'

import Map from '../../components/Map'
import FocusOnUserButton from '../../components/FocusOnUserButton';
import Sidebar from '../../components/Sidebar';
import AddMarkerPopup from '../../components/AddMarkerPopup';
import {IMarker} from '../../types/IMarker'
import { MarkerContext } from '../../context/MarkersContext';
import FriendsPopup from '../../components/FriendsPopup';
import { Types } from '../../types/ContextActionTypes';
import Navbar from '../../components/NavBar';
import Filter from '../../components/Filters';
import { NavContainer} from './Styles'


export enum Popups {
  NONE,
  ADD_MARKER,
  FRIENDS,
}

const MapPage = () : JSX.Element => {

  const [ sidebarOpen, setSidebarOpen ] = useState(true)
  const[popupVisible,setPopupVisible] = useState<Popups>(Popups.NONE)
  const [lngLat, setLngLat] = useState<LngLat>()  

  let { dispatch } = useContext(MarkerContext)

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
      id: uuid(),
      name: name,
      address: "Value 1",
      lat: lngLat.lat,
      lng: lngLat.lng,
      date: new Date(),
      images: [],
      description: description,
      category: [],
      comments: [],
      score: 10,
      property: {
        owns: true,
        public: false
      }
    }
    dispatch({ type: Types.ADD, payload: { marker: newMarker } })
    closePopup()
  }

  const toggleSidebar = (open: boolean | undefined) => {
    if (open !== undefined) 
      setSidebarOpen(open)
    else 
      setSidebarOpen(!sidebarOpen)
  }
  

  return (
    <MapProvider>
      <NavContainer>
        <Navbar openPopup={openPopup} toggleSidebar={toggleSidebar} />
        <Filter toggleSidebar={toggleSidebar}/>
      </NavContainer>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <Map onClick={showAddMarkerPopup} />
      <FocusOnUserButton />
      <AddMarkerPopup closePopup={closePopup} visible={popupVisible === Popups.ADD_MARKER} lngLat={lngLat} addMark={addMark}/>
      <FriendsPopup closePopup={closePopup} isOpen={popupVisible === Popups.FRIENDS} />
    </MapProvider> 
  )
}

export default MapPage
