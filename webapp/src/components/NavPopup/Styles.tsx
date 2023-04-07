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
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`

export const PopupContent = styled.div`
  position: relative;
  width: 15%;
  height: 80%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  overflow: auto;
  padding: 1rem;
  padding: 1rem;
`
export const CloseButton = styled(AiFillCloseCircle)`
    float:right;
    cursor: pointer;
`