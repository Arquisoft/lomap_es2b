import styled from "styled-components"

export const PopupContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1049;
    background-color: #0000006c;
`

export const PopupContent = styled.div`
    z-index: 1050;
    position: absolute;
    overflow: auto;
    max-height: 90vh;
    max-width: 95vh;
    min-width: 30vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 1em;
    border-radius: 0.8em;
    -webkit-box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    @media only screen and (max-width: 550px) {
        max-height: calc(90vh - 2em);
        width: calc(90vw - 2em);
    }
`