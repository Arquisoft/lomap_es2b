import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  padding: 1rem;
  margin: 1em;
  width:70%;
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  border-radius: 0.5em;
`;

export const Logo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const NavLink = styled.a`
  font-size: 1.5rem;
  color: #333;
  margin-right: 1.5rem;
  text-decoration: none;
`;