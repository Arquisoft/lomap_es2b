import { TextField, Button } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useState } from 'react';
import {FormGroup,PopupContainer,CloseButton} from "./AddPopup";

interface Props{
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string)=>void;
    setPopupVisible:(visible:boolean)=>void;
}

function AddPopup( props: Props){

    const[name,setName]=useState<string>("")
    const[description,setDescription]=useState<string>("")

    function handleChangeName(name:string){
        setName(name)
    }

    function handleChangeDescription(description:string){
        setDescription(description)
    }

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        props.addMark(name,props.lngLat,description)
    }

    if(props.visible){
        return(
            
                 <PopupContainer>
                    <CloseButton onClick={()=> props.setPopupVisible(false)} />
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
                        <label>Coordenadas(LngLat):</label>
                        <TextField disabled label={props.lngLat?.lng} variant='standard' />
                        <TextField disabled label={props.lngLat?.lat} variant='standard' />
                    </FormGroup>
                    <p><Button style={{float:'right'}} type='submit' color='success' variant='contained'>Anadir</Button></p>
                </form>
            </PopupContainer>
            

           
        )
    }else{
        return(
            <></>
        )
    }

}



export default AddPopup