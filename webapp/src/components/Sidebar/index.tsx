import { useContext, useEffect, useState } from "react";
  import { useMap } from "react-map-gl";
  import { FaTimes } from "react-icons/fa";
  import { Button, Rating, TextField, ToggleButtonGroup, Typography, ToggleButton } from "@mui/material";
  import { useSession } from "@inrupt/solid-ui-react";

import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { MarkerList, MarkerSection, SearchBar, Title, TopSection, SidebarSection, CloseSection, MarkerContent } from "./Styles"
import DeleteButton from "../DeleteButton";
import { Types } from "../../types/ContextActionTypes";
import { Category } from "../../types/Category";



type Props = {
  isOpen: boolean,
  toggleSidebar: (open: boolean) => void,
  selectedCategory: Category
}

enum Owner {
  USER='USER',
  FRIENDS='FRIENDS'
}



  
const Sidebar = ({ isOpen, toggleSidebar, selectedCategory  } : Props) => {

  const { state: markers, dispatch } = useContext(MarkerContext)
  const {session} = useSession();


  const [searchValue, setSearchValue] = useState("")
  const[markerToShow,setMarkerToShow] = useState<IMarker|null>(null)
  const [comment,setComment] = useState<string>("");


  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 })
    setMarkerToShow(marker)
  }

  const { map } = useMap()

 


  const [showing, setShowing] = useState<Owner>(Owner.USER)
  const [ finalList, setFinalList ] = useState<IMarker[]>([])

 

  const changeShowing = (newValue: Owner) => {
    if (newValue)
      setShowing(newValue)
  }

  const changeVisibility = (marker: IMarker) => {
    const { property } = marker
    if (property.owns) {
      property.public = !property.public
      dispatch({ type:Types.UPDATE, payload: { id: marker.id, marker: { property } } })
    }
  }

  function sortByNameAndDate(a: IMarker, b: IMarker): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    // if names are equal, sort by date (newest to oldest)
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0
  }

  function addComment(id:string, comment:string){
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

  const showMarkerInfo = () => {
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

  useEffect(() => {
    setFinalList(markers.filter((marker) => 
      marker.name.toLowerCase().includes(searchValue.toLowerCase())
        && (showing === Owner.USER ? marker.property.owns : !marker.property.owns)
        && (selectedCategory === Category.All || marker.category.includes(selectedCategory)
    )).sort(sortByNameAndDate))
  }, [markers, showing, searchValue])

  const showMarkerList = ()=>{
    return(
      <>
        <TopSection>
            <Title>Points of interest</Title>
            <CloseSection>
              <FaTimes onClick={() => toggleSidebar(false)} />
            </CloseSection>
          </TopSection>
          <div className="search">
            <SearchBar type="text" placeholder="Buscar" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <ToggleButtonGroup
              color="primary"
              value={showing}
              exclusive
              onChange={(e, newValue: Owner) => {changeShowing(newValue)}}
              aria-label="Marker Owner"
            >
              <ToggleButton value={Owner.USER} style={{ width: '40%' }}>Mios</ToggleButton>
              <ToggleButton value={Owner.FRIENDS} style={{ width: '40%' }}>Amigos</ToggleButton>
            </ToggleButtonGroup>
          </div>
        <MarkerList>
          <div className="container">
            <div className="list">
              {
              finalList.map((marker) => (
                <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} changeVisibility={changeVisibility} />
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
  changeVisibility: (marker: IMarker) => void
}

const Marker = ({ marker, onClick, changeVisibility }: MarkerProps) => {
  return (
    <MarkerSection onClick={() => onClick(marker)} >
      <MarkerContent>
        <div className="shared">
          {
            marker.property.owns ?
            <button onClick={() => changeVisibility(marker)}>
              <small>{marker.property.public ? 'Publico' : 'Privado' }</small>
            </button>
            : 
            <a href={marker.property.author} target="_blank"><small>{marker.property.author}</small></a>
          }
        </div>
      </MarkerContent>
      {
        marker.property.owns && <DeleteButton id={marker.id} />
      }
    </MarkerSection>
  );
};

export default Sidebar;
