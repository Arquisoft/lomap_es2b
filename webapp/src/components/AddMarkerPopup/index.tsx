import { TextField, Button, Select, MenuItem } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useState } from 'react';

import Popup from '../PopUp';
import { FormGroup } from "./Styles";
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

  function handleChangeName(name:string){
    setName(name)
  }

  function handleChangeDescription(description:string){
    setDescription(description)
  }

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();

    addMark(name, lngLat, description, category)
  }

  return(
  <Popup isOpen={visible} closePopup={closePopup}>
    <form onSubmit={(e)=>handleSubmit(e)}>  
      <h2>Introduce los datos del nuevo marcador</h2>
      <FormGroup>
        <label htmlFor="Nombre">Nombre:</label>
        <TextField className='field' id='Nombre' label='Nombre' variant='standard' onChange={(e)=>handleChangeName(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="Descripcion">Descripcion:</label>
        <TextField className='field' id='Descripcion' label='Descripcion' variant='standard' multiline maxRows={4} onChange={(e)=>handleChangeDescription(e.target.value)}/>         
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