import { TextField, Button, Select, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useState } from 'react';

import Popup from '../PopUp';
import { FormGroup, Error } from "./Styles";
import { Category } from '../../types/Category';

import { mapboxApiKey } from '../../config/constants';

import { useTranslation } from 'react-i18next';


type Props = {
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string, category:Category, shared:boolean,direction:string,image?:string)=>void;
    closePopup:()=>void;
}

function AddPopup({ visible, closePopup, addMark, lngLat }: Props){

  const { t } = useTranslation()

  const[name,setName]=useState<string>("")
  const[description,setDescription]=useState<string>("")
  const[shared,setShared]=useState<boolean>(false)
  const[ category, setCategory] = useState<Category>(Category.Others)
  const[error, setError] = useState<string|null>(null)
  const[errorImage,isErrorImage] = useState<boolean>(false)

  const[filepreview, setFilepreview] = useState<File|null>(null)

  const longMaxName = 20;
  const longMaxDesc = 300;

  async function getDirection(){
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat?.lng},${lngLat?.lat}.json?access_token=${mapboxApiKey}`);
    const data = await response.json();
    const direction = data.features[0].text;
    return direction;
  }

  function handleChangeName(name:string){
    if(name.length>longMaxName){
      return;
    }
    setName(name)
  }

  function handleChangeDescription(description:string){
    if(description.length>longMaxDesc){
      return;
    }
    setDescription(description)
  }

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>){
   if(!event.target.files) return;
   isErrorImage(false);
   setFilepreview(event.target.files[0]);
  }

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setError(null);
    getDirection();
    if(!validaVacio(name)) {
      setError(t('addMarker.name.error'))
      return;
    }
    try {
      const filename = await uploadImage()
      addMark(name, lngLat, description, category, shared, await getDirection(), filename)
      cleanForm()
    } catch (err) {

    }
  }

  function cleanForm(){
    isErrorImage(false);
    setError("")
    setName("")
    setDescription("")
    setFilepreview(null)
  }

  async function uploadImage() {
    if(!filepreview)
      return

    let formData = new FormData()
    formData.append('image',filepreview)
    const response = await fetch('http://localhost:5000/api/image/upload',{
      method:"POST",
      body: formData
    })
    const data = await response.json()
    if (!data.data.filename)
      return

    return data.data.filename as string
  }
  
  function validaVacio(input:String){
    return (input!==null) && (input.trim().length!==0);
  }

  return (
    <Popup isOpen={visible} closePopup={()=>{
    cleanForm()
    closePopup()}}>
      <form onSubmit={(e)=>handleSubmit(e)}>  
        <h2>{ t('addMarker.title') }</h2>
        <FormGroup>
          <label htmlFor="Nombre">{ t('addMarker.name.label') }:</label>
          <TextField className='field' helperText={name.length+'/'+longMaxName} id='Nombre' label={ t('addMarker.name.placeholder') } variant='standard' onChange={(e)=>handleChangeName(e.target.value)} value={name}/>
        </FormGroup>
        {error !== null ? <Error>{error}</Error> : null}
        <FormGroup>
          <label htmlFor="Descripcion">{ t('addMarker.description.label') }:</label>
          <TextField className='field'  helperText={description.length+'/'+longMaxDesc} id='Descripcion' label={ t('addMarker.description.placeholder') } variant='standard' multiline maxRows={4} onChange={(e)=>handleChangeDescription(e.target.value)} value={description}/>         
        </FormGroup>
        <FormGroup>
          <label htmlFor="Category">{ t('addMarker.category') }:</label>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value as Category)}
            role='selectCat'
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
          <label htmlFor='image'>{t('addMarker.image.label')}</label>
          <div id="div_file">
            <p id="texto">{t('addMarker.image.button')}</p>
            <input accept="image/png,image/jpeg" type="file" id="image" onChange={handleChangeImage}/>
          </div>
          {filepreview !== null ? <img src={filepreview === null ? "" : URL.createObjectURL(filepreview)} alt='Previsualización'/> : null}
          {errorImage ? <Error>{t('addMarker.image.error')}</Error> : null}
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
          <Button  style={{float:'right'}} type='submit' color='success' variant='contained'>{ t('addMarker.save') }</Button>
        </p>
      </form>
    </Popup>
  )

}



export default AddPopup