import styled from "styled-components"
import {AiFillCloseCircle} from "react-icons/ai"

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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding:1em;
    border-radius: 3%;
    -webkit-box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.75);
`
export const CloseButton = styled(AiFillCloseCircle)`
    float:right;
    cursor: pointer;
`