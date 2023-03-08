import React, { useState } from "react";
import {FaBars} from "react-icons/fa"
import { IMarker } from "../../types/Marker";
import './Sidebar.css'

const Sidebar = () => {
  const miArreglo: any[] = [];
  const [markers, setMarkers] = useState<IMarker[]>([
    { id: 1, name: "Marker 1", address: "Value 1", lat: 0, lng: 0, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
    { id: 2, name: "Marker 2", address: "Value 2" , lat: 0, lng: 0, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
    { id: 3, name: "Marker 3", address: "Value 3" , lat: 0, lng: 0, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
  ]);

  const [isOpen, setIsOpen] = useState(false); // Nuevo estado para controlar la apertura/cierre de la barra lateral
  const [searchValue, setSearchValue] = useState("");

  const handleMarkerClick = (id: number) => {
    const selectedMarker = markers.find((marker) => marker.id === id);
  };

  const toggleSidebar = () => { // Nueva función para cambiar el estado de la barra lateral
    setIsOpen(!isOpen);
  }

  const sideBarOpen = () =>{
    setIsOpen(!isOpen)
  }

  const filteredMarkers = markers.filter((marker) => {
    return marker.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section" >
        <h1 style={{display: isOpen ? "block" : "none"}} className="title">Marcadores</h1>
        <div style={{marginLeft: isOpen ? "200px" : "35px"}} className = "bars">
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
  );
};

interface MarkerProps {
  marker: IMarker;
  onClick: (id: number) => void;
}

const Marker = ({ marker, onClick }: MarkerProps) => {
  const handleClick = () => {
    onClick(marker.id);
  };

  return (
    <div className="marker" onClick={handleClick} >
      <h3>{marker.name}</h3>
      <p>{marker.address}</p>
    </div>
  );
};

export default Sidebar;