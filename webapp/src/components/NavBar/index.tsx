import { useContext, useEffect, useState, FormEvent } from 'react';
import { getStringNoLocale, getNamedNodeAll } from "@inrupt/solid-client";
import { useSession } from '@inrupt/solid-ui-react';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { FaSearch, FaBars, FaMapMarkerAlt } from "react-icons/fa";

import { IMenuOption } from '../../types/IMenuOption';
import { Popups } from '../../pages/MapPage';
import { UserContext } from '../../context/UserContext';
import { Title } from "../Sidebar/Styles";
import NavPopup from "../NavPopup";
import { mapboxApiKey } from "../../config/constants";
import { useMap } from "react-map-gl";
import { Nav, SearchForm, SearchInput, SearchButton, TitleContainer, FormGroup } from './Styles';
import { TextMenuItem } from './Styles';

import DefaulPic from '../../assets/defaultPic.png'

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

  const [searchValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [query, setQuery] = useState('');

  const { state: user } = useContext(UserContext)
  
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
    // Aquí puedes agregar la lógica para navegar a la página de acerca de
  };
  

  return (
    <Nav>
      <Tooltip title="Open menu">
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
        <Tooltip title="Search">
        <SearchButton type="submit" onClick={handleSearch}>
          <FaSearch />
        </SearchButton>
        </Tooltip>
      </SearchForm>
        <Tooltip title="Open markers">
        <IconButton onClick={() => toggleSidebar(undefined)}>
          <FaMapMarkerAlt />
        </IconButton>
        </Tooltip>
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
      {  <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
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
      </Box> } 
    </Nav>
  );
};

export default Navbar;
