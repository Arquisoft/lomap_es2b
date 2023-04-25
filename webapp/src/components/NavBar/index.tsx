import { useContext, useEffect, useState, FormEvent, useRef } from 'react';
import { getStringNoLocale, getNamedNodeAll } from "@inrupt/solid-client";
import { useSession } from '@inrupt/solid-ui-react';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { FaSearch, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import {FcAbout, FcDataConfiguration} from "react-icons/fc"; 
import {MdOutlineAltRoute} from "react-icons/md"; 

import { IMenuOption } from '../../types/IMenuOption';
import { Popups, SidebarView } from '../../pages/MapPage';
import { UserContext } from '../../context/UserContext';
import NavPopup from "../NavPopup";
import { mapboxApiKey } from "../../config/constants";
import { useMap } from "react-map-gl";
import { Nav, SearchForm, SearchInput, SearchButton, TitleContainer, FormGroup, Button, Title, GitHubIcon, Table, GitHubLink, GitHubText, TextMenuItem } from './Styles';

import DefaulPic from '../../assets/defaultPic.png'
import { useTranslation } from 'react-i18next';

type Props = {
  isSidebarOpen: boolean
  sidebarView: SidebarView
  toggleSidebar: (open: boolean | undefined, view: SidebarView) => void
  openPopup: (popup : Popups) => void
}

const Navbar = ({ openPopup, isSidebarOpen, sidebarView, toggleSidebar } : Props) => {
  const { map  } = useMap()
  const { logout } = useSession()
  const { t } = useTranslation()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [ username, setUsername ] = useState<string>('')
  const [ profilePic, setProfilePic ] = useState<string>(DefaulPic)

  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isConfigPopupOpen, setIsConfigPopupOpen] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);

  const wasSidebarOpen = useRef(isSidebarOpen)
  const wasMenuOpen = useRef(false)

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
      label: t('navbar.user.friends'),
      onClick: () => {
        handleCloseUserMenu()
        openPopup(Popups.FRIENDS)
      }
    },
    {
      label: t('navbar.user.about'),
      onClick: () => {
        handleCloseUserMenu()
        openAboutPopup()
      }
    },
    {
      label: t('navbar.user.logout'),
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
    if (!query) return
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxApiKey}`);
    const data = await response.json();
    const [lng, lat] = data.features[0].center;
    map?.flyTo({ center: { lat: lat, lng: lng }, zoom: 14})
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const openMenuPopup = () => {
    wasSidebarOpen.current = isSidebarOpen
    toggleSidebar(false, sidebarView)
    setIsMenuPopupOpen(true)
  }

  const closeMenuPopup = () => {
    setIsMenuPopupOpen(false)
    toggleSidebar(wasSidebarOpen.current, sidebarView)
  }

  const openConfigPopup = () => {
    !isMenuPopupOpen && (wasSidebarOpen.current = isSidebarOpen)
    wasMenuOpen.current = isMenuPopupOpen
    toggleSidebar(false, sidebarView)
    setIsMenuPopupOpen(false)
    setIsConfigPopupOpen(true)
  }

  const closeConfigPopup = () => {
    setIsConfigPopupOpen(false)
    setIsMenuPopupOpen(wasMenuOpen.current)
    toggleSidebar(!wasMenuOpen.current && wasSidebarOpen.current, sidebarView)
  }

  const openAboutPopup = () => {
    !isMenuPopupOpen && (wasSidebarOpen.current = isSidebarOpen)
    wasMenuOpen.current = isMenuPopupOpen
    toggleSidebar(false, sidebarView)
    setIsMenuPopupOpen(false)
    setIsAboutPopupOpen(true)
  }

  const closeAboutPopup = () => {
    setIsAboutPopupOpen(false)
    setIsMenuPopupOpen(wasMenuOpen.current)
    toggleSidebar(!wasMenuOpen.current && wasSidebarOpen.current, sidebarView)
  }

  return (
    <>
      <Nav>
        <Tooltip title={t('navbar.tooltips.menu')}>
          <IconButton onClick={openMenuPopup}>
            <FaBars/>
          </IconButton>
        </Tooltip>

        <Title>LoMap</Title>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder={t('navbar.search.placeholder').toString()}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Tooltip title={t('navbar.tooltips.search')}>
          <SearchButton type="submit" onClick={handleSearch}>
            <FaSearch />
          </SearchButton>
          </Tooltip>
        </SearchForm>
        <Tooltip title={t('navbar.tooltips.markers')}>
          <IconButton onClick={() => toggleSidebar(undefined, SidebarView.MARKERS)}>
            <FaMapMarkerAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('navbar.tooltips.routes')}>
          <IconButton onClick={() => toggleSidebar(undefined, SidebarView.ROUTES)}>
            <MdOutlineAltRoute />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={t('navbar.tooltips.user')}>
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
              <Typography textAlign="center">{ username ? t('navbar.user.greeting', { name: username }) : t('navbar.user.greetingNoName') }</Typography>
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
      <NavMenuPopup isOpen={isMenuPopupOpen} close={closeMenuPopup} clickConfig={openConfigPopup} clickAbout={openAboutPopup} />
      <NavConfigPopup isOpen={isConfigPopupOpen} close={closeConfigPopup} />
      <NavAboutPopup isOpen={isAboutPopupOpen} close={closeAboutPopup} />
    </>
  );
};

type NavProps = {
  isOpen: boolean
  close: () => void
  clickConfig: () => void
  clickAbout: () => void
}

const NavMenuPopup = ({ isOpen, close, clickConfig, clickAbout } : NavProps) => {
  const { t } = useTranslation()
  return (
    <NavPopup isOpen={isOpen} closePopup={close}>
      <TitleContainer>
        <h2>{ t('options.title') }</h2>
      </TitleContainer>
      <FormGroup>
        <Button onClick={clickConfig}>
          <FcDataConfiguration />{ t('options.config') }
        </Button>
      </FormGroup>
      <FormGroup>
        <Button onClick={clickAbout}>
          <FcAbout /> { t('options.about') } 
        </Button>
      </FormGroup>
    </NavPopup>
  )
}

type PopupProps = {
  isOpen: boolean
  close: () => void 
}

const NavAboutPopup = ({ isOpen, close }: PopupProps) => {
  const { t } = useTranslation()
  return (
    <NavPopup isOpen={isOpen} closePopup={close}>
      <h1>{ t('aboutPopup.title') }</h1>
      <p>{ t('aboutPopup.subtitle') }</p>
      <Table>
        <thead>
          <tr>
            <th>{ t('aboutPopup.table_header.name') }</th>
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
      <GitHubLink href="https://github.com/Arquisoft/lomap_es2b" target="_blank" rel="noopener noreferrer">
        <GitHubIcon src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
        <GitHubText>Lomap_es2b</GitHubText>
      </GitHubLink>          
    </NavPopup>
  )
}

const NavConfigPopup = ({ isOpen, close }: PopupProps) => {
  const { t } = useTranslation()

  return (
    <NavPopup isOpen={isOpen} closePopup={close}>
      <h3>{ t('configPopup.title') }</h3>
    </NavPopup>
    )
  }

export default Navbar;

