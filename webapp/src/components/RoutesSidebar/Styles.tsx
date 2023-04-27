import styled from 'styled-components';

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;

  @media only screen and (max-width: 600px) {
    justify-content: end;
  }
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 1.5em;
  font-weight: bold;
  padding: 10px;
  margin: 0;
  text-align: center;
`;

export const SearchBar = styled.input`
  position: relative; 
  width: calc(100% - 0.6em);
  border-radius: 0.3em;
  outline: none;
  border: none;
  background: #eaeaea;
  font-size: 1em;
  padding: 0.3em;
  margin-bottom: 0.5em;
`;

export const RoutesList = styled.div`
  overflow: hidden;
  width: calc(100% - 0.3em);
  padding: 0.5em 0.2em;
  .container {
    overflow-y: auto;
    /* overflow-x: hidden; */
    height: 100%;

    .content {
      position: relative;
      height: auto;
    }

    /* Scrollbar */
    scrollbar-color: #c2c2c2 #f8f8f8;
    ::-webkit-scrollbar {
      width: 0.7em;
    }
    ::-webkit-scrollbar-track {
      background: #f8f8f8;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #c2c2c2;
      border-radius: 1em;
      border: 0.15em solid #f8f8f8;
    }
  }
`
export const RoutesSection = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  top: 0;
  left: 0;
  margin: 0.5em;
  border-radius: 0.5em;
`;

export const RoutesContent = styled.div`
  flex: 1;
  width: calc(90% - 20px);
  .shared {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  p {
    word-wrap: break-word;
    width: 100%;
  }
`;

export const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5ECC7C;
  color: #FFFFFF;
  padding: 0.8em 1em;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  gap: 5%;
  size: "large";
  width: 95%;

  &:hover {
    background-color: #4CA169;
  }
`;

export const MarkerList = styled.div`
  overflow: hidden;
  width: calc(100% - 0.3em);
  padding: 0.5em 0.2em;
  .container {
    overflow-y: auto;
    /* overflow-x: hidden; */
    height: 100%;

    .content {
      position: relative;
      height: auto;
    }

    /* Scrollbar */
    scrollbar-color: #c2c2c2 #f8f8f8;
    ::-webkit-scrollbar {
      width: 0.7em;
    }
    ::-webkit-scrollbar-track {
      background: #f8f8f8;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #c2c2c2;
      border-radius: 1em;
      border: 0.15em solid #f8f8f8;
    }
  }
`; 

export const MarkerSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  top: 0;
  left: 0;
  margin: 0.5em;
  :hover {
    background-color: #f8f8f8;
  }
`;

export const MarkerContent = styled.div`
  flex: 1;
  width: calc(90% - 20px);
  .shared {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  p{
    word-wrap: break-word;
    width: 100%;
  }
`;

export const SearchMenuItem = styled.div`
  padding: 0.3em;
`