import { useContext, useEffect, useState } from "react";
  import { useMap } from "react-map-gl";
  import { FaTimes } from "react-icons/fa";

import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { MarkerList, MarkerSection, SearchBar, Title, TopSection, SidebarSection, CloseSection, MarkerContent } from "./Styles";
import DeleteButton from "../DeleteButton";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Types } from "../../types/ContextActionTypes";
import { Category } from "../../types/Category";
import ShareButton from "../ShareButton";

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

  const { map } = useMap()

  const { state: markers, dispatch } = useContext(MarkerContext)

  const [searchValue, setSearchValue] = useState("")
  const [showing, setShowing] = useState<Owner>(Owner.USER)
  const [ finalList, setFinalList ] = useState<IMarker[]>([])

  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 });
  };

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
        && (showing === Owner.USER ? marker.property.owns : !marker.property.owns)
        && (selectedCategory === Category.All || marker.category.includes(selectedCategory)
    )).sort(sortByNameAndDate))
  }, [markers, showing, searchValue])

  return (
    <>
      {isOpen && (
        <SidebarSection>
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
        </SidebarSection>
      )}
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
        <h3>{marker.name}</h3>
        <p>{marker.description}</p>
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
