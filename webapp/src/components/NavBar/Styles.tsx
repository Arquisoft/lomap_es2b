import styled from "styled-components";

export const Logo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #333;

  @media only screen and (max-width: 600px) {
    margin: 0 0.5em;
  }
`;

export const Nav = styled.nav`
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 1em;
  background-color: #fff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  top: 0;
  left: 0;
  height: 4vh;
  min-height: fit-content;
  max-height: 7vh;
  min-width: 35vw;
  border-radius: 0.5em;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);

  @media only screen and (max-width: 600px) {
    padding: 0.5em;
    width: calc(100% - 1em);
    margin: 0;
    height: 10vh;
    min-height: 60px;
    border-radius: 0;
    max-width: none;
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
  min-width: min-content;
  max-width: 30vw;
  @media (max-width: 600px) {
    max-width: none;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px 0 0 5px;
  background-color: #f5f5f5;
  outline: none;
  width: 100%;

  &:focus {
    background-color: #fff;
  }

  @media (max-width: 600px) {
    border-radius: 5px;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #333;
  color: #fff;
  font-size: 1em;
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
    align-items: center;
    justify-content: flex-start;
    margin:1em;

    @media (max-width: 600px) {
      margin: 0.5em;
    }
    
`

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  padding: 0 0.3em;
  cursor: pointer;
  
  @media (max-width: 400px) {
    display: none;
  }
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

export const Button = styled.button`
  border: none;
  background-color: #fff;
  color: #000;
  padding: 14px 28px;
  font-size: 20px;
  display: flex-end;

  svg {
    margin-right: 0.5em;
  }

  &:hover {
    border: 2px solid #000;
  }
`;