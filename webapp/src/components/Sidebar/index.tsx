import React, { useContext, useState } from "react";
import {FaBars, FaTimes} from "react-icons/fa"
import { useMap } from "react-map-gl";
import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import styled from 'styled-components'


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
    <SidebarSection isOpen={isOpen} className={isOpen ? "open" : "closed"}>
      <TopSection>
        {!isOpen && (
          <Bars >
            <FaBars onClick={toggleSidebar}/>
          </Bars>
        )}
        { isOpen ? <Title>Puntos de interés</Title> : null }
      </TopSection>
      <div>
          <SearchBar isOpen={isOpen} type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      </div> 
      { isOpen && (
        <CloseSection>
          <FaTimes onClick={toggleSidebar}/>
        </CloseSection>
      )}
      {filteredMarkers.map((marker) => (
        <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
      ))}
    </SidebarSection>
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

const SidebarSection = styled.div<{ isOpen: boolean }>`
  &.open {
    background-color: #f8f8f8;
    height: calc(100vh - 3em);
    width: 25%;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    margin: 1.0em;
    border-radius: 0.5em;
    transition: transform 0.3s ease-in-out;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
    -moz-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
    box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  }
  &.closed {
    background-color: #f8f8f8;
    right: -10px;
    height: calc(100vh - 3em);
    width: 10%;
    top: 0;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    margin: 1.0em;
    border-radius: 0.5em;
    transition: transform 0.3s ease-in-out;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  margin: 0;
  text-align: center;
`;

const Bars = styled.div`
  font-size: 25px;
  margin-top: 10px;
`;

const SearchBar = styled.input<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? "block" : "none"};
  position: relative; 
  width: 300px; 
  height: 20px;
  margin: 0 auto; 
  border-radius: 0.3em;
  outline: none;
  border: none;
  width: 90%;
  background: #eaeaea;
  font-size: 1em;
  padding: 0.3em;
`;

const CloseSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  font-size: 25px;
  cursor: pointer;
`;

const MarkerSection = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
  top: 0;
  left: 0;
  margin: 0.5em;
  border-radius: 0.5em;
`;

const MarkerHover = styled.div`
background-color: #f8f8f8;
  background-size: auto;
  border-radius: 0.3em;
`;

export default Sidebar