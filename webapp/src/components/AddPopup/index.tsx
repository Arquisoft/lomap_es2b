import { TextField, Button } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import { useState } from 'react';
import './AddPopup.css'

interface Props{
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string)=>void;
}

function AddPopup( props: Props){

    const[name,setName]=useState<string>("")
    const[description,setDescription]=useState<string>("")

    function handleChangeName(name:string){
        setName(name)
        console.log(name)
    }

    function handleChangeDescription(description:string){
        setDescription(description)
        console.log(description)
    }

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        props.addMark(name,props.lngLat,description)
    }

    if(props.visible){
        return(
            <div className="addPopup-container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <p>Introduce los datos del nuevo marcador</p>
                    <p><label htmlFor="Nombre">Nombre:</label></p>
                    <TextField id='Nombre' label='Nombre' variant='standard' onChange={(e)=>handleChangeName(e.target.value)}/>
                    <p><label htmlFor="Descripcion">Descripcion:</label></p>
                    <TextField id='Descripcion' label='Descripcion' variant='standard' multiline maxRows={4} onChange={(e)=>handleChangeDescription(e.target.value)}/>
                    <p><Button type='submit' color='success' variant='contained'>Anadir</Button></p>
                    <p><label>Coordenadas(LngLat):</label></p>
                    <TextField disabled label={props.lngLat?.lng} variant='outlined' />
                    <TextField disabled label={props.lngLat?.lat} variant='outlined'/>
                </form>
            </div>
        )
    }else{
        return(
            <></>
        )
    }


   
}

export default AddPopup