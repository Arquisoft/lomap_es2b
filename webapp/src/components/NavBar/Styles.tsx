import styled from "styled-components";

export const Logo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #333;

  @media only screen and (max-width: 600px) {
    margin: 0 0.5em;
  }
`;

export const NavLinks = styled.div``

export const Nav = styled.nav`
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background-color: #fff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  top: 0;
  left: 0;
  margin: 1%;
  height: 4%;
  width: 25%;
  border-radius: 0.5em;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);

  @media only screen and (max-width: 600px) {
    top: 0;
    padding: 0.5rem
    width: calc(100% - 1rem);
    margin: 0;
    height: calc(10% - 2rem - 1%);
    border-radius: 0;
  }
`;

export const MenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #333;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const SearchBar = styled.input`
  position: relative; 
  height: 1em;
  margin: 0 auto; 
  border-radius: 0.3em;
  outline: none;
  border: none;

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
export const Menu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0;
  background-color: #fff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  z-index: 1;

  @media only screen and (max-width: 600px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0%);
    }
  }
`;

export const MenuItem = styled.li`
  font-size: 1rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #000;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px 0 0 5px;
  background-color: #f5f5f5;
  outline: none;

  &:focus {
    background-color: #fff;
  }

  @media (max-width: 600px) {
    border-radius: 5px;
    margin-bottom: 1rem;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin:1em;

    @media (max-width: 600px) {
      margin: 0.5em;
    }
    
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 1rem;
  cursor: pointer;
`;

export const IconButton = styled.button`
  font-size: 1.5rem;
  color: #333;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const NavPopupButton = styled(IconButton)`
  color: #333;

  &:hover {
    background-color: #f3f3f3;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const MapButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
`;

