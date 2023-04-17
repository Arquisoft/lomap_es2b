import React, { useState} from 'react'

import { Select, InputLabel, FormControl, Divider, Box, MenuItem, FormHelperText, Tooltip, Menu, Typography, Button } from '@mui/material'
import { login } from "@inrupt/solid-client-authn-browser";
import { IoLanguageOutline } from 'react-icons/io5'

import { Container, Form, IconButton, LanguageMenu } from './Styles'
import { useTranslation } from 'react-i18next';

const Login = () : JSX.Element => {

  const { t } = useTranslation()

  const [identity, setIdentity] = useState<string>('')
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    
    if (identity) {
      setError(false)
      setErrorText('')
      login({
        redirectUrl: window.location.href,
        oidcIssuer: identity,
        clientName: "LOMAP",
      });
    } else {
      setError(true)
      setErrorText('login.loginForm.error')
    }

  };
  
  return (
    <>
      <Container>
        {/* Div imagenes(izquierda) */}
        <div className='column'>
          <h1 className='title'>LoMap</h1>
          <h2 className='subtitle'>{ t('login.subtitle') }</h2>
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
            <h2>{ t('login.loginForm.title') }</h2>
            <FormControl>
              <InputLabel id="provider-select-label">{ t('login.loginForm.provider') }</InputLabel>
              <Select
                labelId='provider-select-label'
                label='Proveedor'
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
              >
                {
                  providers.map((provider, index) => (
                    <MenuItem value={provider.url} key={index}>{ provider.label }</MenuItem>
                  ))
                }
              </Select>
              {
                error && <FormHelperText className='error' error={error}>{t(errorText)}</FormHelperText>
              }
            </FormControl>
            <Button type="submit" variant="contained">{ t('login.loginForm.login') }</Button>
          </Form> 
        </div>
      </Container>
      <ChangeLanguageMenu />
    </>
  )
}

const ChangeLanguageMenu = () => {

  const { t ,i18n } = useTranslation()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const changeLanguage = (code:string) => {
    i18n.changeLanguage(code)
  }

  const languages = [
    {
      label: 'Español',
      code: 'ES',
    },
    {
      label: 'English',
      code: 'EN',
    },
  ]

  return (
    <LanguageMenu>
        <Tooltip title={ t('language') }>
          <IconButton onClick={handleOpenUserMenu} size='large'>
            <IoLanguageOutline />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '1.5em' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {languages.map(({ label, code }) => (
            <MenuItem key={ code } onClick={ () => changeLanguage(code) } selected={i18n.language === code}>
              <Typography textAlign="center">{ label }</Typography>
            </MenuItem>
          ))}
        </Menu>
      </LanguageMenu>
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

export default Login