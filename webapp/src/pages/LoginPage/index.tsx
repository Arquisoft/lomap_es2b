import React, { useState, useEffect } from 'react'

import { Autocomplete, TextField, Divider, Box } from '@mui/material'
import styled from 'styled-components'

import { login } from "@inrupt/solid-client-authn-browser";
import { Button } from '@mui/material';
import './login.css'

const Login = ({  }) : JSX.Element => {

  const [identity, setIdentity] = useState<ProviderOption | null>({ label: '', url: '' })


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    
    console.log(identity)
    if (identity) {
      login({
        redirectUrl: window.location.href,
        oidcIssuer: identity.url,
        clientName: "LOMAP",
      });
    }

  };
  
  return (
    <Container>
      {/* Div imagenes(izquierda) */}
      <div className='column'>
        <h1 className='title'>LoMap</h1>
        <h2 className='subtitle'>¡Guarda tus sitios favoritos y compartelos!</h2>
        {/* <img className='image' src={Logo} alt=""/> */}
      </div>
      <Box
        display = "flex"
        flexDirection= "column"
        justifyContent="center"
        alignContent="center"
        height="80%"
        >
        <Divider className='divider' orientation='vertical' variant='middle'/>
      </Box>
      {/* Div formulario(derecha) */}
      <div className='column'>
        <h1 className='title'>LoMap</h1>
        <Form onSubmit={handleSubmit}>
          <h2>Elige un proveedor</h2>
          <Autocomplete
            disablePortal
            options={providers}
            getOptionLabel = {option => option.label}
            sx={{ width: 300 }}
            value={identity}
            onChange={(event, value : ProviderOption | null) => setIdentity(value)}
            renderInput={(params) => <TextField {...params} label="Proveedor"/>}
          />
          <Button type="submit" variant="contained">Entrar</Button>
        </Form> 
      </div>
    </Container>
  )
}

interface ProviderOption {
  label: string,
  url: string
}

const providers : ProviderOption[] = [
  {label: 'SOLID', url: 'https://solidcommunity.net/'},
  {label: 'INRUPT', url: 'https://inrupt.net/'}
]

const Container = styled.div`
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
  }

  .column:nth-child(3) > .title {
    display: none;
  }

  .divider {
    background-color: #d3d3d3;
  }
`

const Form = styled.form`
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

export default Login