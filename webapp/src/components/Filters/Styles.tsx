import styled from 'styled-components';

export const FilterWrapper = styled.div`
  width: 100%;
  overflow: auto;
  margin-left: 3em;

  @media only screen and (max-width: 1000px) {
    margin: 0;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => isActive ? 'green' : 'white'};
  color: ${({ isActive }) => isActive ? 'white' : 'black'};
  font-size: 1em;
  padding: 0.8em;
  margin: 0.5em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  min-width: fit-content;
  svg {
    margin-right: 0.5em;
  }

  @media (max-width: 600px) {
    margin: 0 0.5em;
  }
`;