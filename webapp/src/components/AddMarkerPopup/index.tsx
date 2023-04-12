import { TextField, Button, Select, MenuItem } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useEffect, useState } from 'react';

import Popup from '../PopUp';
import { FormGroup, Error } from "./Styles";
import { Category } from '../../types/Category';

interface Props{
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string, category:Category)=>void;
    closePopup:()=>void;
}

function AddPopup({ visible, closePopup, addMark, lngLat }: Props){

  const[name,setName]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[ category, setCategory] = useState<Category>(Category.Others)
  const[error, setError] = useState<string|null>(null)

  const longMaxName = 20;
  const longMaxDesc = 50;

  function handleChangeName(name:string){
    setName(name)
  }

  function handleChangeDescription(description:string){
    setDescription(description)
  }

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setError(null);
    if(!validaVacio(name)){
      setError("Introduce un nombre para el marcador")
    }else if(!validaLong(name,longMaxName)){
      setError("Longitud maxima nombre: "+longMaxName)
    }else if(!validaLong(description,longMaxDesc)){
      setError("Longitud maxima descripcion: "+longMaxDesc)
    }else{
      addMark(name, lngLat, description, category)
      setError(null);
    }
    
  }

  function validaLong(intput:String,maxLong:number){
    return intput.length<maxLong;
  }
  

  function validaVacio(intput:String){
    return (intput!=null) && (intput.trim().length!=0);
  }

  return(
  <Popup isOpen={visible} closePopup={()=>{
    setError(null)
    setDescription("")
    setName("")
    closePopup()}}>
    <form onSubmit={(e)=>handleSubmit(e)}>  
      <h2>Introduce los datos del nuevo marcador</h2>
      <FormGroup>
        <label htmlFor="Nombre">Nombre:</label>
        <TextField className='field' id='Nombre' label='Nombre' variant='standard' onChange={(e)=>handleChangeName(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="Descripcion">Descripcion:</label>
        <TextField className='field' id='Descripcion' label='Descripcion' variant='standard'multiline maxRows={4} onChange={(e)=>handleChangeDescription(e.target.value)}/>         
      </FormGroup>
      <FormGroup>
      <label htmlFor="Category">Categoría:</label>
      <Select
        value={category}
        label="Category"
        onChange={(e) => setCategory(e.target.value as Category)}
      >
    
       <MenuItem value={Category.Restaurant}>Restaurante</MenuItem>
       <MenuItem value={Category.Hotel}>Hotel</MenuItem>
       <MenuItem value={Category.Bar}>Bar</MenuItem>
       <MenuItem value={Category.Landscapes}>Paisaje</MenuItem>
       <MenuItem value={Category.Monuments}>Monumento</MenuItem>
       <MenuItem value={Category.Shops}>Tienda</MenuItem>
       <MenuItem value={Category.Others}>Otro</MenuItem>
   
  </Select>
  
      </FormGroup>
      {error !== null ? <Error>{error}</Error> : null}
      <FormGroup>
        <label>Coordenadas(LngLat):</label>
        <TextField disabled label={lngLat?.lng} variant='standard' />
        <TextField disabled label={lngLat?.lat} variant='standard' />
      </FormGroup>
      <p>
        <Button style={{float:'right'}} type='submit' color='success' variant='contained'>Anadir</Button>
      </p>
    </form>
  </Popup>         
  )

}



export default AddPopup