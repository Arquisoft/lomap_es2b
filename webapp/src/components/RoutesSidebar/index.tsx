import { useState, useEffect, useContext, useRef } from "react";
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
  SearchMenuItem,
  RouteDetails,
} from "./Styles";
import CloseButton from "../CloseButton";
import { useTranslation } from "react-i18next";
import { IRoute } from "../../types/IRoute";
import DeleteButton from "../DeleteButton";
import { Box, Button, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { AiFillPlusCircle } from "react-icons/ai";
import { TbArrowBackUp } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { Popups } from "../../pages/MapPage";
import { RoutesContext } from "../../context/RoutesContext";
import { IMarker } from "../../types/IMarker";
import { Types } from "../../types/ContextActionTypes";
import { MarkerContext } from "../../context/MarkersContext";
import { Close as CloseIcon } from '@mui/icons-material';

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
  };

  const closePopup = () => {
    openPopup(Popups.NONE);
  };

  function addRoute(name: string, description?: string) {
    let newRoute: IRoute = {
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
      <CreateButton onClick={handleCreateRouteClick}>
        <AiFillPlusCircle />
        {t("sidebar.routes.newRoute")}
      </CreateButton>
      <RoutesListDiv>
        <div className="container">
          <div className="list">
            {finalList.map((route) => (
              <Route key={route.id} route={route} onClick={handleRoutesClick} />
            ))}
          </div>
        </div>
      </RoutesListDiv>
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
      <DeleteButton id={route.id} type="route" />
    </RoutesSection>
  );
};

type InfoProps = {
  route: IRoute;
  close: () => void;
};

const RouteInfo = ({ route, close }: InfoProps) => {
  const { t } = useTranslation();
  const { dispatch: rDispatch } = useContext(RoutesContext)

  const addMarkerToRoute = (marker: IMarker) => {
    route.points = [...route.points, marker]
    rDispatch({ type: Types.UPDATE, payload: { id: route.id, route: { points: [...route.points] } } })
  }

  // Drag and Drop logic
  
  const dragMarker = useRef<any>(null)
  const [dragOverMarker, setDragOverMarker] = useState<any>(null)

  const handleSort = () => {
    // duplicate items
    let markers = [...route.points]

    // remove and save the dragged item content
    const draggedMarkerContent = markers.splice(dragMarker.current, 1)[0]

    // switch the position
    markers.splice(dragOverMarker, 0, draggedMarkerContent)

    route.points = [...markers]
    rDispatch({ type: Types.UPDATE, payload: { id: route.id, route: { points: [...markers]} } })

    // reset the position ref
    dragMarker.current = null
    setDragOverMarker(null)
  }

  const deleteMarker = (id: string) => {
    let markers = route.points.filter(m => m.id !== id)
    route.points = [...markers]
    rDispatch({ type: Types.UPDATE, payload: { id: route.id, route: { points: [...markers]} } })
  }

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
      <div className="infoContainer">
        <h2>{t("sidebar.details.routes")}</h2>
        <RouteDetails>
          <h3>{route.name}</h3>
          <p>{route.description}</p>
        </RouteDetails>
        <h2> {t("sidebar.details.markers")} </h2>
        <SelectMarkerMenu addMarkerToRoute={addMarkerToRoute} />
        <MarkerList>
          {
            route.points.length === 0 ?
            <span>La ruta aun no tiene marcadores añadidos</span>
            :
            route.points.map((marker, index) => (
              <MarkerSection
                key={marker.id}
                draggable
                onDragStart={() => (dragMarker.current = index)}
                onDragEnter={() => (setDragOverMarker(index))}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                draggedOver={dragOverMarker === index}
              >
                <MarkerContent>
                  <h3>{marker.name}</h3>
                  <p>{marker.description}</p>
                </MarkerContent>
                <Tooltip title={t('sidebar.list.delete.tooltip')}>
                  <IconButton onClick={() => deleteMarker(marker.id)}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </MarkerSection>
            ))
          }
        </MarkerList>
      </div>
    </>
  );
};

type MenuProps = {
  addMarkerToRoute: (route: IMarker) => void
}

export const SelectMarkerMenu = ({ addMarkerToRoute }: MenuProps) => {

  const { t } = useTranslation()
  const { state: markers } = useContext(MarkerContext)
  const [searchValue, setSearchValue] = useState("")

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const addToRoute = (marker: IMarker) => {
    addMarkerToRoute(marker)
    handleCloseUserMenu()
  }

  return (
    <div>
      <Box sx={{ flexGrow: 0}}>
        <Tooltip title={t("sidebar.details.addMarker")}>
          <CreateButton onClick={handleOpenUserMenu}>
            <AiFillPlusCircle />
            {t("sidebar.routes.addMarker")}
          </CreateButton>
        </Tooltip>
        <Menu
          sx={{ 
            marginTop: "3rem",
            maxHeight: "30vh",

          }}
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
          <Divider />
          {
            markers.length === 0 ?
              <MenuItem sx={{ touchAction: 'none' }}>
                <Typography textAlign="center">{t('sidebar.details.route_list_empty')}</Typography>
              </MenuItem>
              :
              markers.filter(m => m.name.toLowerCase().includes(searchValue.toLowerCase()) && m.property.owns).map(m => (
                <MenuItem key={m.id} onClick={() => addToRoute(m)}>
                  <Typography textAlign="center">{m.name}</Typography>
                </MenuItem>
              ))
          }
        </Menu>
      </Box>
    </div>
  )
}

export default RoutesSidebar;
