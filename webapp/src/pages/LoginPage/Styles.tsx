import styled from "styled-components"

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
    margin-bottom: 0.6em;
    width: 90%;
  }

  > h2 {
    text-align: center;
    margin: 0;
    font-size: 1.7em;
    margin-bottom: 0.5em;
  }
`