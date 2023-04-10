import styled from "styled-components"
import {AiFillCloseCircle} from "react-icons/ai"

export const PopupContainer = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start; 
  align-items: center;
`

export const PopupContent = styled.div`
  position: relative;
  width: 21%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  overflow: auto;
  padding: 1em;
  @media only screen and (max-width: 600px) {
    width: calc(100vw - 2em)
  }
`
export const CloseButton = styled(AiFillCloseCircle)`
    float:right;
    cursor: pointer;
`