import styled from "styled-components"
import {AiFillCloseCircle} from "react-icons/ai"

export const PopupContainer = styled.div`
  position: fixed;
  z-index: 600;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
`

export const PopupContent = styled.div`
  z-index: 601;
  position: relative;
  width: 20%;
  min-height: fit-content;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  overflow: auto;
  padding: 1em;
  min-width: 210px;

  @media only screen and (max-width: 600px) {
    width: calc(100vw - 1em);
    border-radius: 0;
  }
`
export const CloseButton = styled(AiFillCloseCircle)`
    float:right;
    cursor: pointer;
`