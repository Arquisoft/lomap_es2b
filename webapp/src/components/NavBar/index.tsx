import * as React from 'react';
import { NavbarContainer, Logo,SearchBar } from "./Styles";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { CombinedDataProvider, Image,useSession} from '@inrupt/solid-ui-react';
import { VCARD } from '@inrupt/vocab-common-rdf';



const Navbar = () => {
  const settings = ['Profile','Logout'];
  const pages = ['About'];
  const { session } = useSession();
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  


  return (
    <NavbarContainer>
      <Logo>LoMap</Logo>
      <SearchBar placeholder="Buscar lugar" />
      
      <Box sx={{ flexGrow: 0.25, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 1, color: 'black', display: 'block', fontSize: 17, fontWeight: 'bold'}}
              >
                {page}
              </Button>
            ))}
      </Box>
      <Box sx={{ flexGrow: 0 }}>
          {session.info.webId ? (
                  <CombinedDataProvider
                      datasetUrl={session.info.webId}
                      thingUrl={session.info.webId}>
                    <Tooltip title="User settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Image property={VCARD.hasPhoto}  alt="User profile picture" style={{width:45, height:45, borderRadius:30}}/>
                    </IconButton>
                    </Tooltip>
                  </CombinedDataProvider>
              ): null }
                      
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Box>
    </NavbarContainer>
  );
};


export default Navbar;