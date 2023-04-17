import { TextField, Button, Select, MenuItem } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useEffect, useState } from 'react';

import Popup from '../PopUp';
import { FormGroup, Error } from "./Styles";
import { Category } from '../../types/Category';

import { mapboxApiKey } from '../../config/constants';

import { useTranslation } from 'react-i18next';


interface Props{
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string, category:Category,direction:string)=>void;
    closePopup:()=>void;
}

function AddPopup({ visible, closePopup, addMark, lngLat }: Props){

  const { t } = useTranslation()

  const[name,setName]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[ category, setCategory] = useState<Category>(Category.Others)
  const[error, setError] = useState<string|null>(null)

  const longMaxName = 20;
  const longMaxDesc = 50;

  async function getDirection(){
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat?.lng},${lngLat?.lat}.json?access_token=${mapboxApiKey}`);
    const data = await response.json();
    const direction = data.features[0].text;
    return direction;
  }

  function handleChangeName(name:string){
    setName(name)
  }

  function handleChangeDescription(description:string){
    setDescription(description)
  }

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setError(null);
    getDirection();
    if(!validaVacio(name)){
      setError("Introduce un nombre para el marcador")
    }else if(!validaLong(name,longMaxName)){
      setError("Longitud maxima nombre: "+longMaxName)
    }else if(!validaLong(description,longMaxDesc)){
      setError("Longitud maxima descripcion: "+longMaxDesc)
    }else{
      addMark(name, lngLat, description, category, await getDirection())
      setError(null);
    }
    
  }

  function validaLong(intput:String,maxLong:number){
    return intput.length<maxLong;
  }
  


  function validaVacio(intput:String){
    return (intput!=null) && (intput.trim().length!=0);
  }



  return (
    <Popup isOpen={visible} closePopup={()=>{
    setError(null)
    setDescription("")
    setName("")
    closePopup()}}>
      <form onSubmit={(e)=>handleSubmit(e)}>  
        <h2>{ t('addMarker.title') }</h2>
        <FormGroup>
          <label htmlFor="Nombre">{ t('addMarker.name.label') }:</label>
          <TextField className='field' id='Nombre' label={ t('addMarker.name.placeholder') } variant='standard' onChange={(e)=>handleChangeName(e.target.value)} value={name}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="Descripcion">{ t('addMarker.description.label') }:</label>
          <TextField className='field' id='Descripcion' label={ t('addMarker.description.placeholder') } variant='standard' multiline maxRows={4} onChange={(e)=>handleChangeDescription(e.target.value)} value={description}/>         
        </FormGroup>
        <FormGroup>
          <label htmlFor="Category">{ t('addMarker.category') }:</label>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            <MenuItem value={Category.Restaurant}>{ t('markerCategories.restaurant') }</MenuItem>
            <MenuItem value={Category.Hotel}>{ t('markerCategories.hotel') }</MenuItem>
            <MenuItem value={Category.Monuments}>{ t('markerCategories.monument') }</MenuItem>
            <MenuItem value={Category.Shops}>{ t('markerCategories.shop') }</MenuItem>
            <MenuItem value={Category.Bar}>{ t('markerCategories.bar') }</MenuItem>
            <MenuItem value={Category.Landscapes}>{ t('markerCategories.landscape') }</MenuItem>
            <MenuItem value={Category.Others}>{ t('markerCategories.other') }</MenuItem>
          </Select>
        </FormGroup>
         {error !== null ? <Error>{error}</Error> : null}
        <FormGroup>
          <label>{ t('addMarker.coordinates') }:</label>
          <TextField disabled label={lngLat?.lat} variant='standard' />
          <TextField disabled label={lngLat?.lng} variant='standard' />
        </FormGroup>
        <p>
          <Button style={{float:'right'}} type='submit' color='success' variant='contained'>{ t('addMarker.save') }</Button>
        </p>
      </form>
    </Popup>
  )

}



export default AddPopup