import { useState, useEffect, useContext } from "react";
import {
  SearchBar,
  Title,
  TopSection,
  RoutesList as RoutesListDiv,
  CreateButton,
  MarkerList,
  MarkerSection,
  MarkerContent,
  RoutesContent,
  RoutesSection,
} from "./Styles";
import CloseButton from "../CloseButton";
import { useTranslation } from "react-i18next";
import { IRoute } from "../../types/IRoute";
import DeleteButton from "../DeleteButton";
import { Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { AiFillPlusCircle } from "react-icons/ai";
import { TbArrowBackUp, TbRoute } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { Popups } from "../../pages/MapPage";
import { RoutesContext } from "../../context/RoutesContext";
import { IMarker } from "../../types/IMarker";
import { Types } from "../../types/ContextActionTypes";
import { MarkerContext } from "../../context/MarkersContext";

type Props = {
  toggleSidebar: (open?: boolean) => void;
  setAddRoute: (
    addRouteF: (name: string, description?: string) => void
  ) => void;
  openPopup: (popup: Popups) => void;
};

const RoutesSidebar = ({ toggleSidebar, setAddRoute, openPopup }: Props) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(RoutesContext);

  const [selectedRoute, setSelectedRoute] = useState<IRoute | null>(null);

  const handleRoutesClick = (route: IRoute) => {
    setSelectedRoute(route);
  };

  const handleCreateRouteClick = () => {
    openPopup(Popups.ADD_ROUTE);
    console.log("Crear nueva ruta");
  };

  const closePopup = () => {
    openPopup(Popups.NONE);
  };

  function addRoute(name: string, description?: string) {
    var newRoute: IRoute = {
      id: uuid(),
      name: name,
      description: description,
      points: [],
      created_at: new Date(),
    };
    dispatch({ type: Types.ADD, payload: { route: newRoute } });
    setSelectedRoute(newRoute);
    closePopup();
  }

  useEffect(() => {
    setAddRoute(addRoute);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopSection>
        <Title>{t("sidebar.routes.title")}</Title>
        <CloseButton onClick={() => toggleSidebar(false)} />
      </TopSection>
      {selectedRoute ? (
        <RouteInfo route={selectedRoute} close={() => setSelectedRoute(null)} />
      ) : (
        <RoutesList
          handleCreateRouteClick={handleCreateRouteClick}
          handleRoutesClick={handleRoutesClick}
        />
      )}
    </>
  );
};

type RoutesListProps = {
  handleRoutesClick: (route: IRoute) => void;
  handleCreateRouteClick: () => void;
};

const RoutesList = ({
  handleCreateRouteClick,
  handleRoutesClick,
}: RoutesListProps) => {
  const { t } = useTranslation();
  const { state: routes } = useContext(RoutesContext);

  const [searchValue, setSearchValue] = useState("");
  const [finalList, setFinalList] = useState<IRoute[]>([]);

  useEffect(() => {
    setFinalList(
      routes.filter((route) =>
        route.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [routes, searchValue]);

  return (
    <>
      <div className="search">
        <SearchBar
          type="text"
          placeholder={t("sidebar.list.search").toString()}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <RoutesListDiv>
        <div className="container">
          <div className="list">
            {finalList.map((route) => (
              <Route key={route.id} route={route} onClick={handleRoutesClick} />
            ))}
          </div>
        </div>
      </RoutesListDiv>
      <CreateButton onClick={handleCreateRouteClick}>
        <AiFillPlusCircle />
        {t("sidebar.routes.newRoute")}
      </CreateButton>
    </>
  );
};

interface RouteProps {
  route: IRoute;
  onClick: (route: IRoute) => void;
}

const Route = ({ route, onClick }: RouteProps) => {
  return (
    <RoutesSection>
      <RoutesContent onClick={() => onClick(route)}>
        <h3>{route.name}</h3>
        <p>{route.description}</p>
      </RoutesContent>
      {<DeleteButton id={route.id} />}
    </RoutesSection>
  );
};

type InfoProps = {
  route: IRoute;
  close: () => void;
};

const RouteInfo = ({ route, close }: InfoProps) => {
  const { t } = useTranslation();
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const [finalList, setFinalList] = useState<IMarker[]>([]);
  const { state: markers, dispatch } = useContext(MarkerContext);
  const [searchValue, setSearchValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // Función para manejar el evento de seleccionar un marcador
  const handleMarkerSelect = (marker: IMarker) => {
    setSelectedMarker(marker);
  };

  // Función para mover el marcador seleccionado al principio de la lista
  const moveMarkerToTop = () => {
    if (selectedMarker) {
      const index = route.points.indexOf(selectedMarker);
      if (index > -1) {
        route.points.splice(index, 1);
        route.points.unshift(selectedMarker);
        setSelectedMarker(null);
      }
    }
  };

  useEffect(() => {
    const filteredMarkers = markers.filter(
      (marker) =>
        marker.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        marker.property.owns
    );
    setFinalList(filteredMarkers);
  }, [markers, searchValue]);
  
  const handleAddMarkerClick = () => {
    setShowMenu(true);
    console.log("Añadir marcador");
  };

  return (
    <>
      <Button
        className="backButton"
        onClick={close}
        color="success"
        variant="contained"
      >
        <TbArrowBackUp />
        {t("sidebar.details.back")}
      </Button>
      <div className="markInfo">
      <h2> {t("sidebar.details.routes")} </h2>
        <RoutesSection>
          <RoutesContent>
            <h3>{route.name}</h3>
            <p>{route.description}</p>
          </RoutesContent>
        </RoutesSection>
        <div>
          <button onClick={moveMarkerToTop}>Move to Top</button>
        </div>
        <MarkerList>
          <div className="container">
            <div className="list">
              {route.points.map((marker, index) => (
                <RoutesSection>
                  <RoutesContent>
                    <h3>{route.name}</h3>
                    <p>{route.description}</p>
                  </RoutesContent>
                </RoutesSection>
              ))}
            </div>
          </div>
        </MarkerList>
        <h2> {t("sidebar.details.markers")} </h2>
        <MarkerList>
          <div className="container">
            <div className="list">
              {finalList.map((marker) => (
                <Marker
                  key={marker.id}
                  marker={marker}
                  onClick={handleMarkerSelect}
                />
              ))}
            </div>
          </div>
        </MarkerList>
        <SelectRouteMenu addMarkerToRoute={(route) => {}} />
      </div>
    </>
  );
};

interface MarkerProps {
  marker: IMarker;
  onClick: (marker: IMarker) => void;
}

const Marker = ({ marker, onClick }: MarkerProps) => {
  return (
    <MarkerSection>
      <MarkerContent onClick={() => onClick(marker)}>
        <h3>{marker.name}</h3>
        <p>{marker.description}</p>
      </MarkerContent>
    </MarkerSection>
  );
};

type MenuProps = {
  addMarkerToRoute: (route: IRoute) => void
}

const SelectRouteMenu = ({addMarkerToRoute}: MenuProps) => {
  
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
      <CreateButton onClick={handleOpenUserMenu}>
        <AiFillPlusCircle />
        {t("sidebar.routes.addMarker")}
      </CreateButton>
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
      > 
        <input placeholder={'Busca una ruta'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        {
          routes.length === 0 ?
          <MenuItem>
            <Typography textAlign="center">{ t('sidebar.details.route_list_empty') }</Typography>
          </MenuItem>
          :
          routes.filter(r => r.name.toLowerCase().includes(searchValue.toLowerCase())).map(r => (
            <MenuItem key={ r.id } onClick={ () => addToRoute(r) }>
              <Typography textAlign="center">{ r.name }</Typography>
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

export default RoutesSidebar;
