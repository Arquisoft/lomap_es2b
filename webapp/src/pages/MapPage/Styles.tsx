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
  grid-template-columns: 1fr, 2fr;
  > nav {
    grid-column: 1
  }

  > div {
    grid-column: 2
  }
`