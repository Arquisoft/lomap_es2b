import { useContext, useState } from "react";
import { useMap } from "react-map-gl";
import { FaTimes } from "react-icons/fa";

import { MarkerContext } from "../../context/MarkersContext";
import { IMarker } from "../../types/IMarker";
import { MarkerList, MarkerSection, SearchBar, Title, TopSection, SidebarSection, CloseSection, MarkerContent } from "./Styles";
import DeleteButton from "../DeleteButton";
import { Category } from "../../types/Category";

type Props = {
  isOpen: boolean,
  toggleSidebar: (open: boolean) => void,
  selectedCategory: Category
}

const Sidebar = ({ isOpen, toggleSidebar, selectedCategory }: Props) => {
  const { map } = useMap();

  const { state: markers } = useContext(MarkerContext);

  const [searchValue, setSearchValue] = useState("");

  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 });
  };

  const filteredMarkers = markers.filter((marker) => {
    return marker.name.toLowerCase().includes(searchValue.toLowerCase()) && (selectedCategory === Category.All || marker.category.includes(selectedCategory));
  });

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
            <SearchBar
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <MarkerList>
            <div className="container">
              <div className="list">
                {filteredMarkers.map((marker) => (
                  <Marker key={marker.id} marker={marker} onClick={handleMarkerClick} />
                ))}
              </div>
            </div>
          </MarkerList>
        </SidebarSection>
      )}
    </>
  );
};

interface MarkerProps {
  marker: IMarker;
  onClick: (marker: IMarker) => void;
}

const Marker = ({ marker, onClick }: MarkerProps) => {
  return (
    <MarkerSection onClick={() => onClick(marker)}>
      <MarkerContent>
        <h3>{marker.name}</h3>
        <p>{marker.description}</p>
      </MarkerContent>
      <DeleteButton name={marker.name} />
    </MarkerSection>
  );
};

export default Sidebar;
