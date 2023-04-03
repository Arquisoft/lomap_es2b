import styled, { keyframes } from 'styled-components';

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
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