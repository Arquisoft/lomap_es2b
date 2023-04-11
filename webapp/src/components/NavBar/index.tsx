import { useContext, useEffect, useState, FormEvent } from 'react';
import { getStringNoLocale, getNamedNodeAll } from "@inrupt/solid-client";
import { useSession } from '@inrupt/solid-ui-react';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { FaSearch, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import {FcAbout, FcDataConfiguration} from "react-icons/fc"

import { IMenuOption } from '../../types/IMenuOption';
import { Popups } from '../../pages/MapPage';
import { UserContext } from '../../context/UserContext';
import NavPopup from "../NavPopup";
import { mapboxApiKey } from "../../config/constants";
import { useMap } from "react-map-gl";
import { Nav, SearchForm, SearchInput, SearchButton, TitleContainer, FormGroup, Button, Title, GitHubIcon, Table, GitHubLink, GitHubText, TextMenuItem } from './Styles';

import DefaulPic from '../../assets/defaultPic.png'
import AboutPopup from '../AboutPopup';

type Props = {
  toggleSidebar: (open: boolean | undefined) => void
  openPopup: (popup : Popups) => void
}

const Navbar = ({ openPopup, toggleSidebar } : Props) => {
  const { map  } = useMap()
  const { logout } = useSession()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [ username, setUsername ] = useState<string>('')
  const [ profilePic, setProfilePic ] = useState<string>(DefaulPic)

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [query, setQuery] = useState('');

  const { state: user } = useContext(UserContext)


  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  
  useEffect(() => {
    if (user) {
      setUsername(getStringNoLocale(user, FOAF.name) || '')

      if (getNamedNodeAll(user, VCARD.hasPhoto) && getNamedNodeAll(user, VCARD.hasPhoto).length > 0)
        setProfilePic(getNamedNodeAll(user, VCARD.hasPhoto)[0].value || DefaulPic)
      else
        setProfilePic(DefaulPic)
    }
  },[user])


  const options : IMenuOption[] = [
    {
      label: 'Amigos',
      onClick: () => {
        handleCloseUserMenu()
        openPopup(Popups.FRIENDS)
      }
    },
    {
      label: "About",
      onClick: () => {
        handleCloseUserMenu()
      }
    },
    {
      label: "Logout",
      onClick: () => {
        handleCloseUserMenu()
        logout()
      }
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const handleSearch = async () => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxApiKey}`);
    const data = await response.json();
    const [lng, lat] = data.features[0].center;
    map?.flyTo({ center: { lat: lat, lng: lng }, zoom: 14})
  };

  const handleBarsClick = () => {
    toggleSidebar(false);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleConfigClick = () => {
    // Aquí puedes agregar la lógica para navegar a la página de configuraciones
  };

  const handleAboutClick = () => {
    setIsAboutPopupOpen(true);
    console.log("Acerca de");
  };

  return (
    <Nav>
      <Tooltip title="Abrir menu">
        <IconButton onClick={() => {
          handlePopupOpen()
          handleBarsClick()
        }}>
          <FaBars/>
        </IconButton>
      </Tooltip>

      <Title>LoMap</Title>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          placeholder="Buscar lugares..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Tooltip title="Buscar">
        <SearchButton type="submit" onClick={handleSearch}>
          <FaSearch />
        </SearchButton>
        </Tooltip>
      </SearchForm>
        <Tooltip title="Abrir marcadores">
        <IconButton onClick={() => toggleSidebar(undefined)}>
          <FaMapMarkerAlt />
        </IconButton>
        </Tooltip>
      {isPopupOpen && (
        <NavPopup isOpen={isPopupOpen} closePopup={handlePopupClose}>
          <TitleContainer>
            <h2>Menu de opciones</h2>
          </TitleContainer>
            <FormGroup>
              <Button onClick={handleConfigClick}>
              <FcDataConfiguration />
                Configuraciones 
              </Button>
            </FormGroup>
            <FormGroup>
              <Button onClick={handleAboutClick}>
                <FcAbout />
                Acerca de
              </Button>
            </FormGroup>
        </NavPopup>
      )}

      {isAboutPopupOpen && (
        <AboutPopup isOpen={isAboutPopupOpen} closePopup={() => setIsAboutPopupOpen(false)}>
          <h1>Acerca de...</h1>
          <p>Este proyecto esta siendo desarrollado por: </p>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>UO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Álvaro Dávila Sampedro</td>
                <td>UO284548</td>
              </tr>
              <tr>
                <td>Adrián Martínez Rodríguez</td>
                <td>UO284163</td>
              </tr>
              <tr>
                <td>Hugo Roberto Pulido Pensado</td>
                <td>UO282823</td>
              </tr>
              <tr>
                <td>Javier González Velázquez</td>
                <td>UO276803</td>
              </tr>   
            </tbody>
        </Table>
        <GitHubLink href="https://github.com/Arquisoft/lomap_es2b">
          <GitHubIcon src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
          <GitHubText>Lomap_es2b</GitHubText>
        </GitHubLink>          
      </AboutPopup>)} 
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Abrir configuracion">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="" src={profilePic} style={{ backgroundColor: 'white' }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <TextMenuItem>
            <Typography textAlign="center">{ username ? `Hola, ${username}!` : 'Hola!' }</Typography>
          </TextMenuItem>
          <Divider />
          {options.map(({ label, onClick }) => (
            <MenuItem key={ label } onClick={ onClick }>
              <Typography textAlign="center">{ label }</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Nav>
  );
};

export default Navbar;

