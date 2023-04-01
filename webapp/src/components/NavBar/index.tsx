import React, { useState, FormEvent, ChangeEvent } from "react";
import {FaSearch } from "react-icons/fa";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem, MenuToggle, Nav, SearchButton, SearchForm, SearchInput, styles } from "./Styles";
import { Title } from "../Sidebar/Styles";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí podrías realizar la búsqueda utilizando la variable searchValue
    console.log(`Realizando búsqueda de: ${searchValue}`);
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
      <MenuToggle onClick={handleMenuToggle}>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 'auto' }}
          >
          <MenuIcon />
        </IconButton>
      </MenuToggle>
      {isMenuOpen && (
        <Menu style={{right: 0}}>
          <MenuItem>Configuraciones</MenuItem>
          <MenuItem>Ayuda</MenuItem>
        </Menu>
      )}
    </Nav>
  );
};


export default Navbar;