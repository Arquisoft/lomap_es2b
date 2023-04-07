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
  categories: Category[]
}

const Sidebar = ({ isOpen, toggleSidebar, categories }: Props) => {
  const { map } = useMap();

  const { state: markers } = useContext(MarkerContext);

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState<Category | "">("");

  const handleMarkerClick = (marker: IMarker) => {
    map?.flyTo({ center: { lat: marker.lat, lng: marker.lng }, zoom: 16 });
  };

  const filteredMarkers = markers.filter((marker) => {
    return marker.name.toLowerCase().includes(searchValue.toLowerCase()) && (!filter || marker.category.includes(filter));
  });

  return (
    <>
      {isOpen && (
        <SidebarSection>
          <TopSection>
            <Title>Puntos de interés</Title>
            <CloseSection>
              <FaTimes onClick={() => toggleSidebar(false)} />
            </CloseSection>
          </TopSection>
          <div className="search">
            <SearchBar
              type="text"
              placeholder="Buscar"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <select onChange={(e) => setFilter(e.target.value as Category)}>
              <option value="">Filtrar por categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
