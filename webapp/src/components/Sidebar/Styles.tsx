import styled, { keyframes } from 'styled-components';

const toggleAnimation = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 25%;
    opacity: 1;
  }
`

export const SidebarSection = styled.div`
  background-color: #f8f8f8;
  height: calc(100vh - 3em);
  width: 20%;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  margin: 1.0em;
  border-radius: 0.5em;
  animation: ${toggleAnimation} 0.2s ease-in-out;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
`;

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  margin: 0;
  text-align: center;
`;

export const SearchBar = styled.input<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? "block" : "none"};
  position: relative; 
  width: 85%; 
  height: 20px;
  margin: 0 auto; 
  border-radius: 0.3em;
  outline: none;
  border: none;
  width: 90%;
  background: #eaeaea;
  font-size: 1em;
  padding: 0.3em;
`;

export const CloseSection = styled.div`
  display: flex;
  font-size: 2em;
  cursor: pointer;
`;

export const ClosedSidebar = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2em;
  background-color: #f8f8f8;
  top: 0;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  margin: 0;
  margin-top: 10%;
  padding: 0.1em;
  border-radius: 0 0.2em 0.2em 0;
  cursor: pointer;
`;

export const MarkerSection = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
  top: 0;
  left: 0;
  margin: 0.5em;
  border-radius: 0.5em;
`;

export const MarkerHover = styled.div`
  background-color: #f8f8f8;
  background-size: auto;
  border-radius: 0.3em;
`; 