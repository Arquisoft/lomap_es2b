import React, { useState, FormEvent, ChangeEvent } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { FormGroup, Menu, MenuItem, Nav, SearchButton, SearchForm, SearchInput } from "./Styles";
import { Title } from "../Sidebar/Styles";
import NavPopup from "../NavPopup";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      <Title>LoMap</Title>
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
      <IconButton onClick={handlePopupOpen}>
        <FaBars />
      </IconButton>
      {isPopupOpen && (
        <NavPopup isOpen={isPopupOpen} closePopup={handlePopupClose}>
          <>
            <FormGroup>
              <button onClick={handleConfigClick}>Configuraciones</button>
            </FormGroup>
            <FormGroup>
              <button onClick={handleAboutClick}>Acerca de</button>
            </FormGroup>
          </>
        </NavPopup>
      )}
    </Nav>
  );
};

export default Navbar;
