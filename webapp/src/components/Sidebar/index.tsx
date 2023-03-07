import React, { useState } from "react";
import {AiOutlineLeft} from "react-icons/ai"
import './Sidebar.css'

interface Marker {
  id: number;
  name: string;
  value: string;
}

const Sidebar = () => {
  const [markers, setMarkers] = useState<Marker[]>([
    { id: 1, name: "Marker 1", value: "Value 1" },
    { id: 2, name: "Marker 2", value: "Value 2" },
    { id: 3, name: "Marker 3", value: "Value 3" },
  ]);

  const [isOpen, setIsOpen] = useState(false); // Nuevo estado para controlar la apertura/cierre de la barra lateral

  const handleMarkerClick = (id: number) => {
    const selectedMarker = markers.find((marker) => marker.id === id);
  };

  const toggleSidebar = () => { // Nueva función para cambiar el estado de la barra lateral
    setIsOpen(!isOpen);
  }

  const sideBarOpen = () =>{
    setIsOpen(!isOpen)
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2 style={{display: isOpen ? "block" : "none"}} className="title">Marcadores</h2>
    <button className= {`toggle-button ${isOpen ? "" : "rotate"}`} onClick={toggleSidebar}>
      <AiOutlineLeft />
    </button>
      {markers.map((marker) => (
        <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
      ))}
      
    </div>
  );
};

interface MarkerProps {
  marker: Marker;
  onClick: (id: number) => void;
}

const Marker = ({ marker, onClick }: MarkerProps) => {
  const handleClick = () => {
    onClick(marker.id);
  };

  return (
    <div className="marker" onClick={handleClick}>
      <h3>{marker.name}</h3>
      <p>{marker.value}</p>
    </div>
  );
};

export default Sidebar;