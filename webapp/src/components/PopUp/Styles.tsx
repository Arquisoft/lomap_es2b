import styled from "styled-components"
import { FaTimes } from "react-icons/fa"

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
    max-height: 95vh;
    max-width: 95vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 1em;
    border-radius: 3%;
    -webkit-box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    @media only screen and (max-width: 550px) {
        height: 90vh;
        width: 90vw;
    }
`
export const CloseButton = styled(FaTimes)`
    float:right;
    font-size: 1.2em;
    cursor: pointer;
`