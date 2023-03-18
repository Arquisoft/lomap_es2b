import { useContext, useEffect, useState } from 'react'
import Map, { LngLat, Marker, useMap,Popup} from 'react-map-gl'
import { CircularProgress,TextField } from '@mui/material'

import { mapboxApiKey } from '../../config/constants'

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import { IMarker } from '../../types/IMarker';
import { MarkerContext } from '../../context/MarkersContext';

interface Props{
    onClick:(lngLat:LngLat,visible:boolean)=>void;
}



const MapComponent = ({onClick,}:Props) => {

  const [isLoading , setIsLoading] = useState(true)

  

  const { map } = useMap()

  const { state: markers } = useContext(MarkerContext)

  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map?.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
        setIsLoading(false)
      }, (error) => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }


  const [infoVisible,setInfoVisible] = useState<IMarker|null>(null);



 
  
  
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
          onDblClick={(MapLayerMouseEvent)=>{onClick(MapLayerMouseEvent.lngLat,true)
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

             </Popup>
        )}
        </Map>
      }
    </>
  )
}

export default MapComponent