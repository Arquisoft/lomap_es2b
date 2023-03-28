import styled from 'styled-components'

import {AiFillCloseCircle} from "react-icons/ai"

const PopupContainer = styled.div`
    z-index: 1050;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding:1em;
    border-radius: 3%;
    -webkit-box-shadow: 10px 10px 15px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 15px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 15px 0px rgba(0,0,0,0.75);
`
const CloseButton = styled(AiFillCloseCircle)`
    float:right;
    cursor: pointer;
`



const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin:1em;
    
`

export {FormGroup,PopupContainer,CloseButton}