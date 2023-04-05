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
  font-size: 1rem;
  padding: 0.8em;
  margin: 0.5em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;




export const LocationList = styled.ul`
 
`;

export const LocationItem = styled.li`
  
`;

// export const FilterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   z-index: 1;
//   position: absolute;
//   margin-top: 0.5%;
//   font-size: 1rem;
//   padding: 1em;
//   width: 50%;
//   height: calc(100vh - 5em - 9%);
// `;

// export const FilterButton = styled.button<{ isActive: boolean }>`
//   background-color: ${({ isActive }) => isActive ? 'green' : 'white'};
//   color: ${({ isActive }) => isActive ? 'white' : 'black'};
//   font-size: 1.0rem;
//   padding: 15px;
//   margin: 10px;
//   border: none;
//   border-radius: 0.5em;
//   cursor: pointer;
//   box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
// `;

// export const LocationList = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding: 0;
// `;

// export const LocationItem = styled.li`
//   margin: 10px 0;
//   padding: 20px;
//   background-color: lightgray;
//   border-radius: 10px;
//   font-size: 1rem;
// `;

// export const FilterWrapper = styled.div`
//   position: relative;
//   align-items: center;
//   z-index: 999;
//   left: 35%;
// `;