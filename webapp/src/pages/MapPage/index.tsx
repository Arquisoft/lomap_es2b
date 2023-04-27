import { useContext, useState, useRef } from 'react';
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
import { Category } from '../../types/Category';
import solidHelper from '../../helpers/SolidHelper'
import RoutesPopUp from '../../components/RoutesPopUp';

export enum Popups {
  NONE,
  ADD_MARKER,
  FRIENDS,
  ABOUT,
  ADD_ROUTE,
}

export enum SidebarView {
  MARKERS = 'markers',
  ROUTES = 'routes',
}

const MapPage = () : JSX.Element => {

  const [ sidebarOpen, setSidebarOpen ] = useState(true)
  const [ sidebarView, setSidebarView ] = useState<SidebarView>(SidebarView.MARKERS)
  const[popupVisible,setPopupVisible] = useState<Popups>(Popups.NONE)
  const [lngLat, setLngLat] = useState<LngLat>()

  const addRoute = useRef((name:string, description?: string) => {})

  const { dispatch } = useContext(MarkerContext)
  const [ selectedCategory, setSelectedCategory ] = useState<Category>(Category.All);

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

  function addMark(name:string, lngLat:LngLat|undefined,description:string, category:Category, shared:boolean,direction:string,image?:string ){
    if(!lngLat){
      return
    }
    var newMarker:IMarker = {
      id: uuid(),
      name: name,
      address: direction,
      lat: lngLat.lat,
      lng: lngLat.lng,
      date: new Date(),
      images: image ? [image] : [],
      description: description,
      category,
      comments: [],
      score: 0,
      property: shared ? {
        owns: false,
        author : "https://lomapes2b.inrupt.net/"
      } : {
        owns: true,
        public: false
      }
    }
    console.log(newMarker)
    dispatch({ type: Types.ADD, payload: { marker: newMarker } })
    closePopup()
  }

  const toggleSidebar = (open: boolean | undefined, view?: SidebarView) => {
    let changes = false
    if (view) {
      if (view !== sidebarView) {
        changes = true
      }
      setSidebarView(view)
    }

    if (changes) {
      setSidebarOpen(true)
    } else {
      if (open !== undefined) 
        setSidebarOpen(open)
      else 
        setSidebarOpen(!sidebarOpen)
    }
  }

  const handleAddRoute = (addRouteF: (name:string, description?:string) => void) => {
    addRoute.current = addRouteF
  }
  
  return (
    <MapProvider>
      <NavContainer>
        <Navbar openPopup={openPopup} sidebarView={sidebarView} isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Filter toggleSidebar={toggleSidebar} activeFilter={selectedCategory} setActiveFilter={setSelectedCategory} />
      </NavContainer>
      <Sidebar isOpen={sidebarOpen} view={sidebarView} toggleSidebar={toggleSidebar} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setAddRoute={handleAddRoute} openPopup={openPopup} />
      <Map onClick={showAddMarkerPopup} filterType={selectedCategory} />
      <FocusOnUserButton />
      <AddMarkerPopup closePopup={closePopup} visible={popupVisible === Popups.ADD_MARKER} lngLat={lngLat} addMark={addMark} />
      <FriendsPopup closePopup={closePopup} isOpen={popupVisible === Popups.FRIENDS} solidManager={solidHelper} />
      <RoutesPopUp closePopup={closePopup} visible={popupVisible === Popups.ADD_ROUTE}  addRoute={addRoute.current}/>
    </MapProvider> 
  )
}

export default MapPage
