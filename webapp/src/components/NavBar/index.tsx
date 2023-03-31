import { useContext, useEffect, useState } from 'react';
import { getStringNoLocale, getNamedNodeAll } from "@inrupt/solid-client";
import { useSession } from '@inrupt/solid-ui-react';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

import { IMenuOption } from '../../types/IMenuOption';
import { Popups } from '../../pages/MapPage';
import { UserContext } from '../../context/UserContext';
import { NavbarContainer, Logo, SearchBar, TextMenuItem } from "./Styles";

type Props = {
  openPopup: (popup : Popups) => void
}

const Navbar = ({ openPopup } : Props) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [ username, setUsername ] = useState<string>('')

  const { logout } = useSession()

  const { state: user } = useContext(UserContext)
  
  useEffect(() => {
    if (user) {
      setUsername(getStringNoLocale(user, FOAF.name) || '')
      
      // Con esto se carga la url de la imagen de perfil del usuario si existe
      getNamedNodeAll(user, VCARD.hasPhoto)
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
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <NavbarContainer>
      <Logo>LoMap</Logo>
      <SearchBar placeholder="Buscar lugar" />
      <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
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
                <Typography textAlign="center">Hola, { username }</Typography>
              </TextMenuItem>
              <Divider />
              {options.map(({ label, onClick }) => (
                <MenuItem key={ label } onClick={ onClick }>
                  <Typography textAlign="center">{ label }</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Box>
    </NavbarContainer>
  );
};


export default Navbar;