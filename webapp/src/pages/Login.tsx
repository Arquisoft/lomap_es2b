import React, { useState, useEffect } from 'react'

import { Autocomplete, TextField, Divider, Box } from '@mui/material';

import { login } from "@inrupt/solid-client-authn-browser";

import Logo from '../logo.svg'
import './login.css'
import { Button } from '@mui/material';


const Login = ({  }) : JSX.Element => {

  const [identity, setIdentity] = useState<ProviderOption | null>({ label: '', url: '' });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    
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
    <div className='container'>
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
        <form onSubmit={handleSubmit}>
          <h2>Elige un proveedor</h2>
          <Autocomplete
          disablePortal
          options={proveedores}
          getOptionLabel = {option => option.label}
          sx={{ width: 300 }}
          value={identity}
          onChange={(event, value : ProviderOption | null) => setIdentity(value)}
          renderInput={(params) => <TextField {...params} label="Proveedor"/>}
          />
          <Button type="submit" variant="contained">Registrarse</Button>
        </form> 
      </div>
    </div>
  )
}

interface ProviderOption {
  label: string,
  url: string
}

const proveedores : ProviderOption[] = [
  {label: 'SOLID', url: 'https://solidcommunity.net/'},
  {label: 'INRUPT', url: 'https://inrupt.net/'}
]

export default Login