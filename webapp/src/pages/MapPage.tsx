import { LngLat, MapProvider} from 'react-map-gl'

import Map from '../components/Map'
import FocusOnUserButton from '../components/FocusOnUserButton';
import AddButton from '../components/AddButton';
import { useState } from 'react';
import AddPopup from '../components/AddPopup';
import {Marker} from '../types/Marker'

const MapPage = () : JSX.Element => {

  const[popupVisible,setPopupVisible] = useState(false)
  const [LngLat, setLngLat] = useState<LngLat>();

  const miArreglo: any[] = [];
  const [markers, setMarkers] = useState<Marker[]>([
    { id: 1, name: "Marker 1", address: "Value 1", lat: 0, lng: 0, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
    { id: 2, name: "Marker 2", address: "Value 2" , lat: 0, lng: 0, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
    { id: 3, name: "Marker 3", address: "Value 3" , lat: 0, lng: 0, date: new Date, images: miArreglo, description: "", category: miArreglo, comments: miArreglo, score: 10},
  ]);


  function showPopup(lngLat: LngLat){
    setPopupVisible(!popupVisible)
    setLngLat(lngLat)
    console.log("Show popup")
    console.log(LngLat)
  }

  return (
    <MapProvider>
      <Map onClick={showPopup} markers={markers}/>
      <FocusOnUserButton />
      <AddPopup visible={popupVisible} lngLat={LngLat}/>
    </MapProvider>
  )
}

export default MapPage
