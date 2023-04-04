import React, { useState, FormEvent, ChangeEvent } from "react";
import { FaSearch, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { FormGroup, Nav, SearchButton, SearchForm, SearchInput, TitleContainer } from "./Styles";
import { Title } from "../Sidebar/Styles";
import NavPopup from "../NavPopup";
import Sidebar from "../Sidebar";
import { mapboxApiKey } from "../../config/constants";
import { useMap } from "react-map-gl";

const Navbar = () => {
  const { map  } = useMap()

  const [searchValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxApiKey}`);
    const data = await response.json();
    const [lng, lat] = data.features[0].center;
    map?.flyTo({ center: { lat: lat, lng: lng }, zoom: 14})
    console.log(data)
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Realizando búsqueda de: ${searchValue}`);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleConfigClick = () => {
    // Aquí puedes agregar la lógica para navegar a la página de configuraciones
    console.log("Configuraciones");
  };

  const handleAboutClick = () => {
    // Aquí puedes agregar la lógica para navegar a la página de acerca de
    console.log("Acerca de");
  };
  

  return (
    <Nav>
       <IconButton onClick={handlePopupOpen}>
        <FaBars />
      </IconButton>

      <Title>LoMap</Title>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          placeholder="Buscar lugares..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <SearchButton type="submit" onClick={handleSearch}>
          <FaSearch />
        </SearchButton>
      </SearchForm>
        <IconButton onClick={handleSidebarToggle}>
          <FaMapMarkerAlt />
        </IconButton>
      {isPopupOpen && (
        <NavPopup isOpen={isPopupOpen} closePopup={handlePopupClose}>
          <TitleContainer>
            <h2>Menú de Opciones</h2>
          </TitleContainer>
            <FormGroup>
              <button onClick={handleConfigClick}>Configuraciones</button>
            </FormGroup>
            <FormGroup>
              <button onClick={handleAboutClick}>Acerca de</button>
            </FormGroup>
        </NavPopup>
      )}
      {showSidebar && <Sidebar />}
    </Nav>
  );
};

export default Navbar;
