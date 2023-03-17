import * as React from 'react';
import { NavbarContainer, Logo, NavLinks, NavLink, DropdownMenu, DropdownItem, AvatarButton, AvatarIcon } from "./Styles";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AvatarDropdown = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <DropdownMenu>
      <DropdownItem onClick={handleOpenUserMenu}>New Marker</DropdownItem>
      <DropdownItem onClick={handleOpenUserMenu}>Sign Out</DropdownItem>
    </DropdownMenu>
  );
};

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo href="#">LoMap</Logo>
      <NavLinks>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">About</NavLink>
        <AvatarButton>
          <AvatarIcon />
          <AvatarDropdown />
        </AvatarButton>
      </NavLinks>
    </NavbarContainer>
  );
};


export default Navbar;