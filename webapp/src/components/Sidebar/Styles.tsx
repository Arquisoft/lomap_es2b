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
  padding-right: 0.3em;
  margin: 1em;
  flex-grow: 1;
  height: calc(100vh - 5em - 9%);
  width: calc(100vw - 4.7em - 71%);
  min-width: 300px;
  position: absolute;
  z-index: 600;
  top: calc(1em + 7%);
  left: 0;
  border-radius: 0.5em;
  animation: ${toggleAnimation} 0.2s ease-in-out;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  box-shadow: 4px 4px 8px 0px rgba(34,2,0,0.27);
  
  .sidebar-filters {
    display: none;
    overflow-y: hidden;
    
    > div {
      height: fit-content;
    }

    @media only screen and (max-width: 600px) {
      display: inline-block;
      vertical-align: middle;
      height: 3em;
    }
  }

  .markInfo{
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    .backButton{
      margin-bottom: 0.3em;
    }
    .addComment{
      margin-top: 1em;
    }
    p{
      word-wrap:break-word;
    }

    img{
      max-width: 100%;
      max-height: 100%;
      margin: auto;
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

  @media only screen and (max-width: 1000px) {
    top: max(16%, 120px);
    height: calc(min(84%, calc(100vh - 120px)) - 4em);
  }

  @media only screen and (max-width: 600px) {
    padding-top: 0.5em;
    top: 10vh;
    width: calc(100% - 1.3em);
    margin: 0;
    height: calc(90% - 1.5em);
    border-radius: 0;
    min-width: 0;
  }
`;

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
`

export const CloseSection = styled.div`
  display: flex;
  font-size: 1.8em;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    font-size: 1.3em;
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