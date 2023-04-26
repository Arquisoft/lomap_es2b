import { useContext, useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import Map, { LngLat, Marker, useMap,Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import { mapboxApiKey } from '../../config/constants'

import { MarkerContext } from '../../context/MarkersContext';
import { IMarker } from '../../types/IMarker';
import './Map.css'
import { Category } from '../../types/Category';

interface Props{
    onClick:(lngLat:LngLat,visible:boolean)=>void;
    filterType: Category;
}

const MapComponent = ({ onClick, filterType }:Props) => {
  
  const { map } = useMap()
  
  const [isLoading , setIsLoading] = useState(true)
  const [infoVisible,setInfoVisible] = useState<IMarker|null>(null); 
  const[imageToShow,setImageToShow] = useState<Blob|null>(null)

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

  useEffect(() => {
    getMarkImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoVisible]);

  async function getMarkImage(){
    try{
      if(!infoVisible) return
      let response = await fetch('http://localhost:5000/api/image/get/'+infoVisible.images[0]);
      if(response!=null) {
        let blob = await response.blob()
       setImageToShow(blob);
       console.log(blob)
      } else {
        setImageToShow(null)
      }
      
    }catch(err){
      console.log("Ha ocurrido un error: "+err)
      setImageToShow(null);
    }
   
  }
  
  useEffect(locateUser,[map])

 

  return (
    <>
      {
        isLoading ?
        <CircularProgress className='loader' color='secondary' />
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
            markers
            .filter((marker) => filterType === Category.All || filterType === marker.category)
            .map((marker) => (
              <Marker
                key={marker.id}
                style={{ cursor: "pointer" }}
                color={marker.property.owns ? '' : (marker.property.author !== "https://lomapes2b.inrupt.net/" ? 'red' : 'green')}
                longitude={marker.lng}
                latitude={marker.lat}
                onClick={(e) => {
                  console.log(marker);
                  e.originalEvent.stopPropagation();
                  setInfoVisible(marker);
                }}
              />
            ))
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
            {imageToShow!==null ? <img className='popupImage' src={imageToShow===null ? "" : URL.createObjectURL(imageToShow)} alt="Imagen del sitio" /> : null} 
            <p>{infoVisible.name}</p>
            <p>{infoVisible.address}</p>
           
           
          </Popup>
        )}
        
        </Map>
      }
    </>
  )
}

export default MapComponent
