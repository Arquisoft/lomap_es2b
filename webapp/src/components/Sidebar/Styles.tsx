import styled, { keyframes } from 'styled-components';

const toggleAnimation = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  padding: 1em;
  margin: 1.0em;
  flex-grow: 1;
  height: calc(100vh - 5em - 9%);
  width: calc(100vw - 5em - 71%);
  position: absolute;
  z-index: 100;
  top: calc(1em + 7%);
  left: 0;
  border-radius: 0.5em;
  animation: ${toggleAnimation} 0.2s ease-in-out;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  
  

  .markInfo{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: auto;
    .backButton{
      bottom: 0;
    }
    .addComment{
      margin-top: 1em;
    }
    p{
      word-wrap:break-word;
    }
  }
  
  .search {
    display: flex;
    justify-content: center;
    flex-direction: column;

    div {
      justify-content: center;
    }
  }

  @media only screen and (max-width: 600px) {
    top: 10%;
    width: 100%;
    margin: 0;
    height: calc(90%);
    border-radius: 0;
  }
`;

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em 0.5em;
  width: 95%;
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

export const MarkerList = styled.div`
  overflow: hidden;
  width: calc(100% - 1em); 
  height: calc(100vh - 13em); 
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

export const CloseSection = styled.div`
  display: flex;
  font-size: 1.8em;
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
  margin-top: 2%;
  padding: 0.1em;
  border-radius: 0 0.2em 0.2em 0;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    top: 10%;
  }
`;

export const MarkerSection = styled.div`
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
`