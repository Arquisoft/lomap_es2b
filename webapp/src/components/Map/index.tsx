import { useContext, useEffect, useState } from 'react'
import { Button, CircularProgress,Rating,TextField, Typography } from '@mui/material'
import Map, { LngLat, Marker, useMap,Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSession } from '@inrupt/solid-ui-react';

import { mapboxApiKey } from '../../config/constants'

import { MarkerContext } from '../../context/MarkersContext';
import { IMarker } from '../../types/IMarker';
import './Map.css'
import { Types } from '../../types/ContextActionTypes';
import { saveMarkersToPrivate } from '../../helpers/SolidHelper';

interface Props{
    onClick:(lngLat:LngLat,visible:boolean)=>void;
}

const MapComponent = ({ onClick }:Props) => {
  
  const { map } = useMap()
  const {session} = useSession();
  
  const [isLoading , setIsLoading] = useState(true)
  const [infoVisible,setInfoVisible] = useState<IMarker|null>(null); 
  const [comment,setComment] = useState<string>("");

  const { state: markers, dispatch } = useContext(MarkerContext)

  function addComment(id:string, comment:string){
    var listComments = markers.find(marker => marker.id === id)?.comments;
    if(!session.info.webId) return
    listComments?.push({ comment, author: session.info.webId })
    if(!infoVisible) return
    dispatch({type: Types.UPDATE, payload:{id: infoVisible.id, marker:{comments:listComments}}});
    setComment("");
    console.log(markers.find(m => m.id === infoVisible.id));
  }

  function setScore(newScore:number | null){
    if(!newScore || !infoVisible) return
    
    dispatch({ type: Types.UPDATE, payload:{ id: infoVisible.id, marker: { score: newScore } } });
    setInfoVisible(markers.find(m => m.id === infoVisible.id) || infoVisible)
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

  const [loaded,setLoaded] = useState(false);

  return (
    <>
      {
        isLoading ?
        <CircularProgress className='loader' color='primary' />
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
       
          {
            markers.map((marker)=>
              <Marker style={{cursor:"pointer"}} 
                key={marker.id}
                color={!marker.property.owns ? 'red' : ''}
                longitude={marker.lng}
                latitude={marker.lat}
                onClick={(e)=>{
                  e.originalEvent.stopPropagation()
                  setInfoVisible(marker)
                }}
              />
            )
          }


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
            <TextField value={comment} onChange={(e)=>setComment(e.target.value)} label={"Comenta aqui"} variant='standard' />
            <Button onClick={()=>addComment(infoVisible.id,comment)} color='success' variant='contained'>Anadir</Button>       
            <Typography component="legend">Puntuacion</Typography>
            <Rating
              name="simple-controlled"
              value={infoVisible.score}
              onChange={(event,newValue)=>{
                setScore(newValue);
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
