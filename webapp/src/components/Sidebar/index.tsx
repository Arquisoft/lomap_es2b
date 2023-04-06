import { useContext, useState } from "react";
import { useMap } from "react-map-gl";
import { MarkerContext} from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { MarkerHover, MarkerList, MarkerSection, SearchBar, Title, TopSection } from "./Styles"
import DeleteButton from "../DeleteButton";
import SidePopup from '../SidePopup';
import { Button, Rating, TextField, Typography } from "@mui/material";
import { useSession } from "@inrupt/solid-ui-react";
import { Types } from "../../types/ContextActionTypes";



const Sidebar = () => {

  const { map  } = useMap()

  const { state: markers, dispatch } = useContext(MarkerContext)
  const {session} = useSession();

  const [isOpen, setIsOpen] = useState(true) // Nuevo estado para controlar la apertura/cierre de la barra lateral
  const [searchValue, setSearchValue] = useState("")
  const[markerToShow,setMarkerToShow] = useState<IMarker|null>(null)
  const [comment,setComment] = useState<string>("");


  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 })
    setMarkerToShow(marker)
  }

  const toggleSidebar = () => { // Nueva función para cambiar el estado de la barra lateral
    setIsOpen(!isOpen)
  }

  const filteredMarkers = markers.filter((marker) => {
    return marker.name.toLowerCase().includes(searchValue.toLowerCase())
  })

  function addComment(id:number, comment:string){
    var listComments = markers.find(marker => marker.id === id)?.comments;
    if(!session.info.webId) return
    listComments?.push({ comment, author: session.info.webId })
    if(!markerToShow) return
    dispatch({type: Types.UPDATE, payload:{id: markerToShow.id, marker:{comments:listComments}}});
    setComment("");
    console.log(markers.find(m => m.id === markerToShow.id));
  }

  function setScore(newScore:number | null){
    if(!newScore || !markerToShow) return
    
    dispatch({ type: Types.UPDATE, payload:{ id: markerToShow.id, marker: { score: newScore } } });
    setMarkerToShow(markers.find(m => m.id === markerToShow.id) || markerToShow)
  }

  const showMarkerInfo = ()=>{
    if(!markerToShow){
      return;
    }
    return(
      <>
      <p>{markerToShow.name}</p>
            <TextField  label="Descripcion" defaultValue={markerToShow.description}
            InputProps={{
              readOnly: true,
            }}
            />
            <label>Comentar</label>
            <TextField value={comment} onChange={(e)=>setComment(e.target.value)} label={"Comenta aqui"} variant='standard' />
            <Button onClick={()=>addComment(markerToShow.id,comment)} color='success' variant='contained'>Anadir</Button>       
            <Typography component="legend">Puntuacion</Typography>
            <Rating
              name="simple-controlled"
              value={markerToShow.score}
              onChange={(event,newValue)=>{
                setScore(newValue);
              }}
            />
             <Button onClick={()=>setMarkerToShow(null)} color='success' variant='contained'>Volver</Button>  
      </>
    )
  }

  const showMarkerList = ()=>{
    return(
      <>
       <Title>Puntos de interés</Title>
      <TopSection>
      <SearchBar type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      </TopSection>
     <MarkerList>
      <div className="container">
        <div className="list">
          {
          filteredMarkers.map((marker) => (
            <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
          ))
          }
        </div>
      </div>
    </MarkerList>
      </>
      
    )
   
  }
  

  return (
    <>
      <SidePopup isOpen={isOpen} closePopup={toggleSidebar}>
       
        {markerToShow ? showMarkerInfo() : showMarkerList()}        
      </SidePopup>
    </>
  )
}

interface MarkerProps {
  marker: IMarker
  onClick: (marker: IMarker) => void
}

const Marker = ({ marker, onClick }: MarkerProps) => {
  

  return (
    <MarkerHover>
      <MarkerSection onClick={() => {
        onClick(marker)
        }} >
        <h3>{marker.name}</h3>
        <p>{marker.description}</p>
        <DeleteButton name={marker.name}/>
      </MarkerSection>
    </MarkerHover>
  );
};

export default Sidebar
