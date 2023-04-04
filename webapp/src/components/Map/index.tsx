import { useContext, useEffect, useState } from 'react'
import { Button, CircularProgress,Rating,TextField, Typography } from '@mui/material'
import Map, { LngLat, Marker, useMap,Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import { mapboxApiKey } from '../../config/constants'

import { MarkerContext, Types } from '../../context/MarkersContext';
import { IMarker } from '../../types/IMarker';
import './Map.css'
import { isNull } from 'util';




interface Props{
    onClick:(lngLat:LngLat,visible:boolean)=>void;
}

const MapComponent = ({ onClick }:Props) => {

  const { map } = useMap()
  
  const [isLoading , setIsLoading] = useState(true)
  const [infoVisible,setInfoVisible] = useState<IMarker|null>(null); 
  const [comment,setComment] = useState<string>("");

  const { state: markers } = useContext(MarkerContext)

  function addComment(id:number, comment:string){
    var newList=[...markers];
    newList.find(marker => marker.id==id)?.comments.push(comment);
    dispatch({type: Types.SET, payload:{markers:newList}});
  }

  function setScore(id:number, newScore:number|null){
    console.log("Llega al setSocre");
    if(isNull(newScore)){
      return;
    }
    var newMarkers: IMarker[] = markers.map(marker=>{
      if(marker.id==id){
        return{...marker,score:newScore};
      }else{
        return marker;
      }
    })
    dispatch({type: Types.SET, payload:{markers:newMarkers}});
    
  }

  const locateUser = () => {
    if ("geolocation" in navigator) {      
        navigator.geolocation.getCurrentPosition((position) => {
        map?.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
        
        setIsLoading(false)
      }, () => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }
  
  useEffect(locateUser,[map])

  return (
    <>
      {
        isLoading ?
        <CircularProgress className='loader' />
        : 
        <Map id='map' initialViewState={{
          latitude: 43.3602900, 
          longitude: 5.8447600, 
          zoom: 12
          
        }}
          onLoad={locateUser}
          mapboxAccessToken={mapboxApiKey}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onClick={(MapLayerMouseEvent)=>{onClick(MapLayerMouseEvent.lngLat,true)
            MapLayerMouseEvent.preventDefault()
          }
          
        }>
       
          {markers.map((marker,index)=>
          <Marker style={{cursor:"pointer"}} 
          key={marker.id}
          longitude={marker.lng}
          latitude={marker.lat}
          onClick={(e)=>{
            e.originalEvent.stopPropagation()
            setInfoVisible(marker)

          }}
          />
          )}


          {infoVisible && (
          <Popup 
          longitude={infoVisible.lng}
          latitude={infoVisible.lat}
          onClose={()=>setInfoVisible(null)}
          closeOnMove={false}
          >
            
            <p>{infoVisible.name}</p>
            <TextField  label="Descripcion" defaultValue={infoVisible.description}
            InputProps={{
              readOnly: true,
            }}
            />
            <label>Comentar</label>
            <TextField onChange={(e)=>setComment(e.target.value)} label={"Comenta aqui"} variant='standard' />
            <Button  onClick={()=>addComment(infoVisible.id,comment)} color='success' variant='contained'>Anadir</Button>       
            <Typography component="legend">Puntuacion</Typography>
            <Rating
              name="simple-controlled"
              value={infoVisible.score}
              onChange={(event,newValue)=>{
              setScore(infoVisible.id,newValue);
              }}
/>           
             </Popup>
             
        )}
        
        </Map>
      }
    </>
  )
}

export default MapComponent

function dispatch(arg0: { type: any; payload: { markers: IMarker[]; }; }) {
  throw new Error('Function not implemented.');
}
