import { LngLat, MapProvider} from 'react-map-gl'

import Map from '../components/Map'
import FocusOnUserButton from '../components/FocusOnUserButton';
import { useState } from 'react';
import AddPopup from '../components/AddPopup';
import {IMarker} from '../types/Marker'

const MapPage = () : JSX.Element => {

  const[popupVisible,setPopupVisible] = useState(false)
  const [lngLat, setLngLat] = useState<LngLat>();

  const miArreglo: any[] = [];
  const [markers, setMarkers] = useState<IMarker[]>([
    { id: 1, name: "Marker 1", address: "Value 1", lat: 43.4184, lng: -5.8954, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
    { id: 2, name: "Marker 2", address: "Value 2" , lat: 43.4029, lng: -5.6695, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
    { id: 3, name: "Marker 3", address: "Value 3" , lat: 43.1494, lng: -6.0733, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
  ]);


  function showPopup(lngLat: LngLat, visible:boolean): void{
    setPopupVisible(visible)
    setLngLat(lngLat)
  }

  function addMark(name:string, lngLat:LngLat|undefined,description:string){
    if(lngLat===undefined){
      return
    }
    var newMarker:IMarker={id: markers.length+1, name: name, address: "Value 1", lat: lngLat.lat, lng: lngLat.lng, date: new Date, images: miArreglo, description: description, category: miArreglo, comments: miArreglo, score: 10}
    setMarkers([...markers,newMarker])
    setPopupVisible(false)
  }

  return (
    <MapProvider>
      <Map onClick={showPopup} markers={markers}/>
      <FocusOnUserButton />
      <AddPopup visible={popupVisible} lngLat={lngLat} addMark={addMark}/>
    </MapProvider>
  )
}

export default MapPage
