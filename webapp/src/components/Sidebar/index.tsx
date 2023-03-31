import { List } from "@mui/material";
import { useContext, useState } from "react";
import { FaTimes, FaChevronRight } from "react-icons/fa"
import { useMap } from "react-map-gl";
import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { ClosedSidebar, CloseSection, MarkerHover, MarkerSection, SearchBar, SidebarSection, Title, TopSection } from "./Styles"

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
          <div>
            <SearchBar isOpen={isOpen} type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <List
            sx={{
              width: '100%',
              height: '100%',
              maxWidth: 360,
              bgcolor: '#f8f8f8',
              position: 'relative',
              overflow: 'auto',
              maxHeight: isOpen ? 400 : 450
            }}
          >
            {
            filteredMarkers.map((marker) => (
              <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
            ))
            }
          </List>
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