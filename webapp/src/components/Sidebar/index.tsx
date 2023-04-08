import { useContext, useState } from "react";
import { useMap } from "react-map-gl";
import { MarkerContext} from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { MarkerList, MarkerSection, SearchBar, Title, TopSection, SidebarSection, CloseSection, MarkerContent } from "./Styles"
import DeleteButton from "../DeleteButton";
import SidePopup from '../SidePopup';
import { Button, Rating, TextField, Typography } from "@mui/material";
import { useSession } from "@inrupt/solid-ui-react";
import { Types } from "../../types/ContextActionTypes";
import { FaTimes } from "react-icons/fa";

type Props = {
  isOpen: boolean,
  toggleSidebar: (open: boolean) => void
}

const Sidebar = ({ isOpen, toggleSidebar } : Props) => {

  const { map  } = useMap()

  const { state: markers, dispatch } = useContext(MarkerContext)
  const {session} = useSession();


  const [searchValue, setSearchValue] = useState("")
  const[markerToShow,setMarkerToShow] = useState<IMarker|null>(null)
  const [comment,setComment] = useState<string>("");


  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 })
    setMarkerToShow(marker)
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

  function showComments(){
    var comments = markerToShow?.comments;
    return(
      comments?.map((comment)=> 
          <p>{comment.comment}</p>    
    )
    )
    
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
      <div className="markInfo">
      <h2>{markerToShow.name}</h2>
            <TextField  label="Descripcion" defaultValue={markerToShow.description}
            InputProps={{
              readOnly: true,
            }}
            />
             <Typography component="legend">Puntuacion</Typography>
            <Rating
              name="simple-controlled"
              value={markerToShow.score}
              onChange={(event,newValue)=>{
                setScore(newValue);
              }}
            />
            <h3>Comentar</h3>
            <TextField value={comment} onChange={(e)=>setComment(e.target.value)} label={"Comenta aqui"} variant='standard' />
            <Button className="addComment" onClick={()=>addComment(markerToShow.id,comment)} color='success' variant='contained'>Anadir</Button>       
           
            <h3>Comentarios</h3>
            <MarkerList>
               <div className="container">
            <div className="list">
              {
              showComments()
              }
            </div>
          </div>
            </MarkerList>
           
            
             <Button className="backButton" onClick={()=>setMarkerToShow(null)} color='success' variant='contained'>Volver</Button>  
      </div>
      
 
      </>
    )
  }

  const showMarkerList = ()=>{
    return(
      <>
       <TopSection>
            <Title>Puntos de interés</Title>
            <CloseSection>
              <FaTimes onClick={() => toggleSidebar(false)}/>
            </CloseSection>
          </TopSection>
          <div className="search">
            <SearchBar type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
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
    {
      isOpen ?
      <SidebarSection>
        {markerToShow ? showMarkerInfo() : showMarkerList()} 
      </SidebarSection>
      : null
    }
    </>
   
  )
}

interface MarkerProps {
  marker: IMarker
  onClick: (marker: IMarker) => void
}

const Marker = ({ marker, onClick }: MarkerProps) => {
  

  return (
    <MarkerSection onClick={() => onClick(marker)} >
      <MarkerContent>
        <h3>{marker.name}</h3>
        <p>{marker.description}</p>
      </MarkerContent>
      <DeleteButton name={marker.name} />
    </MarkerSection>
  );
};

export default Sidebar
