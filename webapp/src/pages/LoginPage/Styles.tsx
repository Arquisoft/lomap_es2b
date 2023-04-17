import styled from "styled-components"
import { styled as MUIStyled } from '@mui/material/styles'
import { IconButton as MUIIconButton } from '@mui/material'

export const Container = styled.div`
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  .column {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 50%;

    .title {
      font-size: 5em;
      text-align: center;
      color: white;
      margin: 0.2em 0;
      font-family: 'Oswald', sans-serif;
    }

    .subtitle {
      font-size: 3em;
      text-align: center;
      color: white;
      font-family: 'Oswald', sans-serif;
      margin: 0.2em 0;
    }

    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .column:nth-child(3) > .title {
    display: none;

    @media only screen and (max-width: 600px) {
      display: block;
    }
  }

  .column:first-child {
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }

  .divider {
    background-color: #d3d3d3;

    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
`

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #eee;
  border-radius: 0.5em;
  padding: 0.5em;
  padding-bottom: 1em;
  -webkit-box-shadow: 8px 8px 10px 0px rgba(34,2,0,0.27);
  -moz-box-shadow: 8px 8px 10px 0px rgba(34,2,0,0.27);
  box-shadow: 8px 8px 10px 0px rgba(34,2,0,0.27);

  > * {
    width: 90%;
  }

  > div {
    margin-bottom: 0.5em;
  }

  h2 {
    text-align: center;
    margin: 0;
    font-size: 1.7em;
    margin-bottom: 0.5em;
  }

  .error {
    margin: 0;
    padding: 0.5em;
  }
`

export const LanguageMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

export const IconButton = MUIStyled(MUIIconButton)`
  padding: 0.3em;
  background-color: #ebebeb;
  margin: 0.2em;

  &:hover {
    background-color: #aeaeae;
    color: #505050;
  }
`