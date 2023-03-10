import React, { useContext, useState } from "react";
import {FaBars} from "react-icons/fa"
import { useMap } from "react-map-gl";
import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import './Sidebar.css'

const Sidebar = () => {

  const { map  } = useMap()

  const { state: markers } = useContext(MarkerContext)

  const [isOpen, setIsOpen] = useState(false) // Nuevo estado para controlar la apertura/cierre de la barra lateral
  const [searchValue, setSearchValue] = useState("")

  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 })
  }

  const toggleSidebar = () => { // Nueva función para cambiar el estado de la barra lateral
    setIsOpen(!isOpen)
  }

  const sideBarOpen = () =>{
    setIsOpen(!isOpen)
  }

  const filteredMarkers = markers.filter((marker) => {
    return marker.name.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section" >
        { isOpen ? <h1 className="title">Puntos de interés</h1> : null }
        <div className = "bars">
            <FaBars onClick={toggleSidebar}/>
        </div>
      </div> 
      <div>
          <input style={{display: isOpen ? "block" : "none"}} type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className = "search-bar"/>
      </div>   
      {filteredMarkers.map((marker) => (
      <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
      ))}
    </div>
  )
}

interface MarkerProps {
  marker: IMarker
  onClick: (marker: IMarker) => void
}

const Marker = ({ marker, onClick }: MarkerProps) => {

  return (
    <div className="marker" onClick={() => onClick(marker)} >
      <h3>{marker.name}</h3>
      <p>{marker.description}</p>
    </div>
  );
};

export default Sidebar