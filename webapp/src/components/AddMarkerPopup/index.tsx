import { TextField, Button, Select, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useState } from 'react';

import Popup from '../PopUp';
import { FormGroup } from "./Styles";
import { Category } from '../../types/Category';
import { useTranslation } from 'react-i18next';

interface Props{
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string, category:Category, shared:boolean)=>void;
    closePopup:()=>void;
}

function AddPopup({ visible, closePopup, addMark, lngLat }: Props){

  const { t } = useTranslation()

  const[name,setName]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[shared,setShared]=useState<boolean>(false)
  const[ category, setCategory] = useState<Category>(Category.Others)

  function handleChangeName(name:string){
    setName(name)
  }

  function handleChangeDescription(description:string){
    setDescription(description)
  }

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();

    addMark(name, lngLat, description, category, shared)
    setName('')
    setDescription('')
    setShared(false)
    setCategory(Category.Others)
  }

  return (
    <Popup isOpen={visible} closePopup={closePopup}>
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
        <FormGroup>
          <label>{ t('addMarker.coordinates') }:</label>
          <TextField disabled label={lngLat?.lat} variant='standard' />
          <TextField disabled label={lngLat?.lng} variant='standard' />
        </FormGroup>
        <ToggleButtonGroup
            color="primary"
            value={shared}
            exclusive
            onChange={(e, newValue:boolean) => setShared(newValue)}
            aria-label="Marker Owner"
          >
            <ToggleButton value={false} style={{ width: '45%' }}>{ t('sidebar.list.owner.mine') }</ToggleButton>
            <ToggleButton value={true} style={{ width: '45%' }}>{ t('sidebar.list.owner.public') }</ToggleButton>
          </ToggleButtonGroup>
        <p>
          <Button style={{float:'right'}} type='submit' color='success' variant='contained'>{ t('addMarker.save') }</Button>
        </p>
      </form>
    </Popup>
  )

}



export default AddPopup