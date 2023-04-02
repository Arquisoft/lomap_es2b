import {  } from "@mui/material";
import { useContext, useState } from "react";
import { FaTimes, FaChevronRight } from "react-icons/fa"
import { useMap } from "react-map-gl";
import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { ClosedSidebar, CloseSection, MarkerHover, MarkerList, MarkerSection, SearchBar, SidebarSection, Title, TopSection } from "./Styles"

const Sidebar = () => {

  const { map  } = useMap()

  const { state: markers } = useContext(MarkerContext)

  const [isOpen, setIsOpen] = useState(true) // Nuevo estado para controlar la apertura/cierre de la barra lateral
  const [searchValue, setSearchValue] = useState("")

  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 })
  }

  const toggleSidebar = () => { // Nueva función para cambiar el estado de la barra lateral
    setIsOpen(!isOpen)
  }

  const filteredMarkers = markers.filter((marker) => {
    return marker.name.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <>
      {
        isOpen ?
        <SidebarSection>
          <TopSection>
            <Title>Puntos de interés</Title>
            <CloseSection>
              <FaTimes onClick={toggleSidebar}/>
            </CloseSection>
          </TopSection>
          <div className="search">
            <SearchBar type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <MarkerList>
            <div className="container">
              <div className="list">
                {
                filteredMarkers.map((marker) => (
                  <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
                ))
                }
              </div>
            </div>
          </MarkerList>
        </SidebarSection>
        :
        <ClosedSidebar>
          <FaChevronRight onClick={toggleSidebar}/>
        </ClosedSidebar>
      }
    </>
  )
}

interface MarkerProps {
  marker: IMarker
  onClick: (marker: IMarker) => void
}

const Marker = ({ marker, onClick }: MarkerProps) => {

  return (
    <MarkerHover>
      <MarkerSection onClick={() => onClick(marker)} >
        <h3>{marker.name}</h3>
        <p>{marker.description}</p>
      </MarkerSection>
    </MarkerHover>
  );
};

export default Sidebar