import { List } from "@mui/material";
import React, { useContext, useState } from "react";
import { useMap } from "react-map-gl";
import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { MarkerHover, MarkerSection, SearchBar, Title, TopSection } from "./Styles"
import styled, { keyframes } from 'styled-components'
import SidePopup from '../SidePopup';

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
      <SidePopup isOpen={isOpen} closePopup={toggleSidebar}>
        <Title>Puntos de interés</Title>
        <TopSection>
          <SearchBar isOpen={isOpen} type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </TopSection>
        <List
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: 500,
            bgcolor: '#fff',
            position: 'relative',
            overflow: 'auto',
            maxHeight: isOpen ? 800 : 800
          }}
        >
          {
            filteredMarkers.map((marker) => (
              <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
            ))
          }
        </List>
      </SidePopup>
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
