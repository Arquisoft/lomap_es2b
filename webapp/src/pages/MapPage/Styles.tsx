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

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin: 0;
    width: 100%;
  }
`