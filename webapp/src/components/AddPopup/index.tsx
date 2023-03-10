import { TextField, Button } from '@mui/material'
import { LngLat } from 'mapbox-gl';
import './AddPopup.css'

interface Props{
    visible:boolean;
    lngLat:LngLat|undefined;
}

function AddPopup( props: Props){

    if(props.visible){
        return(
            <div className="addPopup-container">
                <form>
                    <p>Introduce los datos del nuevo marcador</p>
                    <p><label htmlFor="Nombre">Nombre:</label></p>
                    <TextField id='Nombre' label='Nombre' variant='standard'/>
                    <p><label htmlFor="Descripcion">Descripcion:</label></p>
                    <TextField id='Descripcion' label='Descripcion' variant='standard'/>
                    <p><Button type='submit' color='success' variant='contained'>Anadir</Button></p>
                    <p><label>Coordenadas:</label></p>
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