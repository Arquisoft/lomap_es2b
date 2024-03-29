import styled, { keyframes } from "styled-components";

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

  .infoContainer {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .backButton{
      margin-bottom: 0.3em;
    }
    .addComment{
      margin-top: 1em;
    }
    h2 {
      width: 100%;
    }
    p{
      word-wrap:break-word;
    }

    img{
      max-width: 100%;
      max-height: 100%;
      margin: auto;
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