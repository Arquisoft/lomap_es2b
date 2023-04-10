import styled from 'styled-components'

export const NavContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: calc(100vw - 2em);
  height: 8vh;
  display: flex;
  align-items: center;
  margin: 1em;
  margin-bottom: 0;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    height: fit-content;
    align-items: flex-start;
    height: 16%;
    min-height: 120px;
  }

  @media only screen and (max-width: 600px) {
    margin: 0;
    width: 100%;
  }
`