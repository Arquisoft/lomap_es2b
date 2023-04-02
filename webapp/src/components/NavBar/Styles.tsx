import styled from "styled-components";

export const Nav = styled.nav`
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  top: 0;
  left: 0;
  margin: 1%;
  height: 4%;
  width: 20%;
  border-radius: 0.5em;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
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
`;

export const MenuItem = styled.li`
  font-size: 1rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin:1em;
    
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

