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
  
  const [isLoading , setIsLoading] = useState(true)
  const [infoVisible,setInfoVisible] = useState<IMarker|null>(null); 

  const { state: markers } = useContext(MarkerContext)




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
                  console.log(marker)
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
            onClose={()=>{
              setInfoVisible(null)
            }}
            closeOnMove={false}
          >
            
            <p>{infoVisible.name}</p>
           
           
          </Popup>
        )}
        
        </Map>
      }
    </>
  )
}

export default MapComponent
