import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  padding: 1rem;
  margin: 1em;
  width: calc(65% - 1em);
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  border-radius: 0.5em;

  @media only screen and (max-width: 600px) {
    top: 0;
    width: calc(100% - 1rem);
    margin: 0;
    height: calc(10% - 2rem - 1%);
    border-radius: 0;
  }
`;

export const Logo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #333;

  @media only screen and (max-width: 600px) {
    margin: 0 0.5em;
  }
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

export const SearchBar = styled.input`
  position: relative; 
  height: 1em;
  margin: 0 auto; 
  border-radius: 0.3em;
  outline: none;
  border: none;
  width: 70%;
  background: #eaeaea;
  font-size: 1em;
  padding: 0.3em;
  @media only screen and (max-width: 600px) {
    margin: 0 1em;
  }
`;

export const TextMenuItem = styled.div`
  padding: 1em;
`