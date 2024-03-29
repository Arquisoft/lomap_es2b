import { useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { TbArrowBackUp, TbRoute } from "react-icons/tb";
import { Button, Rating, TextField, ToggleButtonGroup, Typography, ToggleButton, Tooltip, Menu, MenuItem } from "@mui/material";
import { useSession } from "@inrupt/solid-ui-react";
import { useTranslation } from "react-i18next";

import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { MarkerList, MarkerSection, SearchBar, Title, TopSection, MarkerContent, MarkerImage, IconButton, TextMenuItem, SearchMenuItem } from "./Styles"
import DeleteButton from "../DeleteButton";
import { Types } from "../../types/ContextActionTypes";
import { Category } from "../../types/Category";
import Filter from "../Filters";
import CloseButton from "../CloseButton";
import { RoutesContext } from "../../context/RoutesContext";
import { IRoute } from "../../types/IRoute";

type Props = {
  toggleSidebar: (open?: boolean) => void,
  selectedCategory: Category,
  setSelectedCategory: (category: Category) => void
}

enum Owner {
  USER='USER',
  FRIENDS='FRIENDS',
  ALL='ALL'
}
  
const MarkersSidebar = ({ toggleSidebar, selectedCategory, setSelectedCategory  } : Props) => {

  const { state: markers, dispatch } = useContext(MarkerContext)
  const { map } = useMap()
  const { t } = useTranslation()

  const [showing, setShowing] = useState<Owner>(Owner.USER)
  const [ finalList, setFinalList ] = useState<IMarker[]>([])
  const [searchValue, setSearchValue] = useState("")
  const[markerToShow,setMarkerToShow] = useState<IMarker|null>(null)
  


  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 })
    setMarkerToShow(marker)
  }

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

  useEffect(() => {
    setFinalList(markers.filter((marker) => 
      marker.name.toLowerCase().includes(searchValue.toLowerCase())
        && (showing === Owner.USER ? marker.property.owns : (showing === Owner.FRIENDS ? (!marker.property.owns && marker.property.author !== "https://lomapes2b.inrupt.net/") : 
        (!marker.property.owns && marker.property.author === "https://lomapes2b.inrupt.net/")))
        && (selectedCategory === Category.All || marker.category === selectedCategory || (!Object.values(Category).includes(marker.category) && selectedCategory === Category.Others)
    )).sort(sortByNameAndDate))
  }, [markers, showing, searchValue, selectedCategory])

  const showMarkerList = () =>{
    return(
      <>
        <div className="search">
          <SearchBar type="text" placeholder={t('sidebar.list.search').toString()} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <ToggleButtonGroup
            color="primary"
            value={showing}
            exclusive
            onChange={(e, newValue: Owner) => {changeShowing(newValue)}}
            aria-label="Marker Owner"
          >
            <ToggleButton value={Owner.USER} style={{ width: '45%' }}>{ t('sidebar.list.owner.mine') }</ToggleButton>
            <ToggleButton value={Owner.FRIENDS} style={{ width: '45%' }}>{ t('sidebar.list.owner.friends') }</ToggleButton>
            <ToggleButton value={Owner.ALL} style={{ width: '45%' }}>{ t('sidebar.list.owner.public') }</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <MarkerList>
          <div className="container">
            <div className="content">
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
      { !markerToShow && <Filter className="sidebar-filters" activeFilter={selectedCategory} setActiveFilter={setSelectedCategory} toggleSidebar={toggleSidebar} /> }
      <TopSection>
        <Title>{ !markerToShow ? t('sidebar.list.title') : t('sidebar.details.title') }</Title>
        <CloseButton onClick={() => toggleSidebar(false)} />
      </TopSection>
      {markerToShow ? <MarkerInfo marker={markerToShow} close={() => setMarkerToShow(null)} /> : showMarkerList()} 
    </>
  )
}

type InfoProps = {
  marker: IMarker
  close: () => void
}

const MarkerInfo = ({ marker, close }: InfoProps) => {


  const { dispatch: mDispatch } = useContext(MarkerContext)
  const { dispatch: rDispatch } = useContext(RoutesContext)
  const {session} = useSession();
  const { t } = useTranslation()

  

  const [comment,setComment] = useState<string>("");
  const[imageToShow,setImageToShow] = useState<Blob|null>(null)

  function setScore(newScore:number | null){
    if(!newScore) return
    if(!marker.property.owns) return
    
    marker.score = newScore

    mDispatch({ type: Types.UPDATE, payload:{ id: marker.id, marker: { score: newScore } } });
  }

  function addComment(comment:string){
    const listComments = marker.comments;
    if(!session.info.webId) return
    listComments.push({ comment, author: session.info.webId })
    mDispatch({type: Types.UPDATE, payload:{id: marker.id, marker:{comments:listComments}}});
    setComment("");
  }

   async function getMarkImage(){
    try{
      if (!marker.images[0]) {
        setImageToShow(null)
        return
      }
      const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
      const response = await fetch(apiEndPoint+'/image/get/'+marker.images[0]);
      if(response!=null){
        let blob = await response.blob()
       setImageToShow(blob);
      }else{
        setImageToShow(null)
      }
      
    }catch(err){
      setImageToShow(null);
    }
   
  }

  const addMarkerToRoute = (route: IRoute) => {
    rDispatch({ type: Types.UPDATE, payload: { id: route.id, route: { points: [...route.points, marker] } } })
  }
 
  useEffect(() => {
    getMarkImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      <Button className="backButton" onClick={close} color='success' variant='contained'><TbArrowBackUp/>{ t('sidebar.details.back') }</Button>  
      <div className="infoContainer">
        <SelectRouteMenu addMarkerToRoute={addMarkerToRoute} />
        {imageToShow ? <MarkerImage src={imageToShow===null ? "" : URL.createObjectURL(imageToShow)} alt="Imagen del sitio" /> : null}
        <h2>{marker.name}</h2>
        <p>{marker.description}</p>

        <p>{marker.address}</p>

        <Typography component="legend">{ t('sidebar.details.rating') }</Typography>

        <Rating
          data-testid="rating-test"
          name="simple-controlled"
          value={marker.score}
          readOnly={!marker.property.owns}
          onChange={(_,newValue)=>{
            setScore(newValue);
          }}
        />
        
        {
          <>
          <h3>{ t('sidebar.details.comment') }</h3>
            <TextField value={comment} onChange={(e)=>setComment(e.target.value)} label={t('sidebar.details.comment_placeholder')} variant='standard' />
            <Button className="addComment" onClick={()=>addComment(comment)} color='success' variant='contained'>{ t('sidebar.details.add_comment') }</Button>
          </>
        }
      
        <h3>{ t('sidebar.details.comments') }</h3>
        <div>
          {
            marker.comments.map((comment, index) => (
              <p key={`${index}-${comment.author}-${comment.comment}`}> <strong>{comment.author.split(".")[0].split("//")[1]}:</strong> {comment.comment}</p>
            ))
          }
        </div>
      </div>
    </>
  )
}

type MenuProps = {
  addMarkerToRoute: (route: IRoute) => void
}

export const SelectRouteMenu = ({addMarkerToRoute}: MenuProps) => {
  
  const { t } = useTranslation()
  const { state: routes } = useContext(RoutesContext)
  const [searchValue, setSearchValue] = useState("")

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const addToRoute = (route: IRoute) => {
    addMarkerToRoute(route)
    handleCloseUserMenu()
  }

  return (  
    <div>
      <Tooltip title={ t('sidebar.details.add_to_route') }>
        <IconButton onClick={handleOpenUserMenu} size='large'>
          <TbRoute />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '1.5em' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        variant="menu"
      > 
        <SearchMenuItem onKeyDown={e => e.stopPropagation()}>
          <SearchBar placeholder={t("sidebar.details.route_list_search") || ''} value={searchValue} onChange={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setSearchValue(e.target.value)
          }} onKeyDown={e => e.stopPropagation()}/>
        </SearchMenuItem>
        {
          routes.length === 0 ?
          <TextMenuItem>
            <Typography textAlign="center">{ t('sidebar.details.route_list_empty') }</Typography>
          </TextMenuItem>
          :
          routes.filter(r => r.name.toLowerCase().includes(searchValue.toLowerCase())).map(r => (
            <MenuItem key={ r.id } onClick={ () => addToRoute(r) }  >
              <Typography textAlign="center">{ r.name }</Typography>
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

interface MarkerProps {
  marker: IMarker
  onClick: (marker: IMarker) => void
  changeVisibility: (marker: IMarker) => void
}

const Marker = ({ marker, onClick, changeVisibility }: MarkerProps) => {
  const { t } = useTranslation()

  return (
    <MarkerSection >
      <MarkerContent onClick={() => onClick(marker)}>
        <h3>{marker.name}</h3>
        <p>{marker.description}</p>
        <div className="shared">
          {
            marker.property.owns ?
            <button onClick={(e) => {
              e.stopPropagation()
              changeVisibility(marker)
            }}>
              <small>{marker.property.public ? t('sidebar.list.mode.public') : t('sidebar.list.mode.private') }</small>
            </button>
            : (marker.property.author !== "https://lomapes2b.inrupt.net/" ? 
            <a href={marker.property.author} target="_blank" rel="noopener noreferrer"><small>{marker.property.author}</small></a>
            :<></>)
            
          }
        </div>
      </MarkerContent>
      {
        marker.property.owns && <DeleteButton id={marker.id} type="marker" />
      }
    </MarkerSection>
  );
};

export default MarkersSidebar;
