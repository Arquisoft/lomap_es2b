import { TextField, Button } from '@mui/material'
import { useState } from 'react';
import Popup from '../PopUp';
import { FormGroup, Error } from "./Styles";
import { Category } from '../../types/Category';
import { useTranslation } from 'react-i18next';

type Props = {
    visible:boolean;
    addRoute:(name:string, description?:string)=>void;
    closePopup:()=>void;
}

function RoutesPopUp({ visible, closePopup, addRoute}: Props){

  const { t } = useTranslation()

  const[name,setName]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[error, setError] = useState<string|null>(null)

  const longMaxName = 20;

  function handleChangeName(name:string){
    setName(name)
  }

  function handleChangeDescription(description:string){
    setDescription(description)
  }

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setError(null);
    if(!validaVacio(name)){
      setError('addRoutes.error.emptyName')
    }else if(!validaLong(name,longMaxName)){
      setError('addRoutes.error.nameTooLong')
    }else{
      addRoute(name, description)
    }
  }

  function cleanForm(){
    setError("")
    setName("")
    setDescription("")
  }

  function validaLong(intput:String,maxLong:number){
    return intput.length<maxLong;
  }

  function validaVacio(intput:String){
    return (intput!==null) && (intput.trim().length!==0);
  }

  return (
    <Popup isOpen={visible} closePopup={()=>{
    cleanForm()
    closePopup()}}>
      <form onSubmit={(e)=>handleSubmit(e)}>  
        <h2>{ t('addRoutes.title') }</h2>
        <FormGroup>
          <label htmlFor="Nombre">{ t('addRoutes.name.label') }:</label>
          <TextField className='field' id='Nombre' variant='standard' onChange={(e)=>handleChangeName(e.target.value)} value={name}/>
          {
            error !== null && <Error>{ t(error, { actual: name.length, limit: longMaxName }) }</Error>
          }
        </FormGroup>
        <FormGroup>
          <label htmlFor="Descripcion">{ t('addRoutes.description.label') }:</label>
          <TextField className='field' id='Descripcion' variant='standard' multiline maxRows={4} onChange={(e)=>handleChangeDescription(e.target.value)} value={description}/>         
        </FormGroup>
        <p>
          <Button style={{float:'right'}} type='submit' color='success' variant='contained'>{ t('addRoutes.create') }</Button>
        </p>
      </form>
    </Popup>
  )
}

export default RoutesPopUp