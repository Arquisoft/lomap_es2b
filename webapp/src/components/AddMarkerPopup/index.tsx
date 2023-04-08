import { TextField, Button, Select, MenuItem } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useState } from 'react';

import Popup from '../PopUp';
import { FormGroup } from "./Styles";

interface Props{
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string, category:string)=>void;
    closePopup:()=>void;
}

function AddPopup({ visible, closePopup, addMark, lngLat }: Props){

  const[name,setName]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[ category, setCategory] = useState<string>("")

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

   enum Category {
    Restaurant = 'restaurant',
    Hotel = 'hotel',
    Monuments = 'monuments',
    Shops = 'shops',
    Bar = 'bar',
    Landscapes = 'landscapes', 
    Others = 'others',
    All = 'all'
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
        onChange={(e) => setCategory(e.target.value)}
  >
    
       <MenuItem value={Category.Restaurant}>{Category.Restaurant}</MenuItem>
       <MenuItem value={Category.Hotel}>{Category.Hotel}</MenuItem>
       <MenuItem value={Category.Bar}>{Category.Bar}</MenuItem>
       <MenuItem value={Category.Landscapes}>{Category.Landscapes}</MenuItem>
       <MenuItem value={Category.Monuments}>{Category.Monuments}</MenuItem>
       <MenuItem value={Category.Shops}>{Category.Shops}</MenuItem>
       <MenuItem value={Category.Others}>{Category.Others}</MenuItem>
   
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