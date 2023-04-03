import React, { useState, FormEvent, ChangeEvent } from "react";
import { FaSearch, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { FormGroup, Menu, MenuItem, Nav, SearchButton, SearchForm, SearchInput, TitleContainer } from "./Styles";
import { Title } from "../Sidebar/Styles";
import NavPopup from "../NavPopup";
import Sidebar from "../Sidebar";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "center" }}>
        <Title>LoMap</Title>
      </div>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          placeholder="Buscar lugares..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
      </SearchForm>
        <IconButton onClick={handleSidebarToggle}>
          <FaMapMarkerAlt />
        </IconButton>
      <IconButton onClick={handlePopupOpen}>
        <FaBars />
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
