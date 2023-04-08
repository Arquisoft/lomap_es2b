import styled from 'styled-components';

export const FilterWrapper = styled.div`
  width: 100%;
  overflow: auto;
  margin-left: 3em;
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => isActive ? 'green' : 'white'};
  color: ${({ isActive }) => isActive ? 'white' : 'black'};
  font-size: 1.0rem;
  padding: 0.8em;
  margin: 0.5em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  svg {
    margin-right: 0.5em;
  }
`;

export const LocationList = styled.ul`
   list-style: none;
   margin: 0;
   padding: 0;
`;

export const LocationItem = styled.li`
   margin: 10px 0;
   padding: 20px;
   background-color: lightgray;
   border-radius: 10px;
   font-size: 1rem;
 `;