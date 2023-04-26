import React, { useState, useEffect } from 'react';
import { useMap } from "react-map-gl";
import { SearchBar, Title, TopSection, RoutesList, RoutesSection, RoutesContent } from './Styles';
import CloseButton from "../CloseButton";
import { useTranslation } from "react-i18next";
import { IRoute } from '../../types/IRoute';
import DeleteButton from "../DeleteButton";
import ReactMapGL, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';

type Props = {
  toggleSidebar: (open?: boolean) => void
}

const RoutesSidebar = ({ toggleSidebar }: Props) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [finalList, setFinalList] = useState<IRoute[]>([]);
  const { map } = useMap();
  const [selectedRoute, setSelectedRoute] = useState<IRoute | null>(null);

  // useEffect(() => {
  //   setFinalList()
  // }, [])

  const handleRoutesClick = (route: IRoute) => {
    setSelectedRoute(route);
  }

  return (
    <>
      <TopSection>
        <Title>{t('sidebar.routes.title')}</Title>
        <CloseButton onClick={() => toggleSidebar(false)} />
      </TopSection>
      <div className="search">
        <SearchBar type="text" placeholder={t('sidebar.list.search').toString()} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      <RoutesList>
        <div className="container">
          <div className="list">
            {
              finalList.map((route) => (
                <Routes key={route.id} route={route} onClick={handleRoutesClick} />
              ))
            }
          </div>
        </div>
      </RoutesList>
      {selectedRoute && (
        <div className="map-container">
          {/* Renderiza la ruta seleccionada en el mapa */}
          {selectedRoute.points && (
            <Source
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: selectedRoute.points.map((point) => [
                    point.lat,
                    point.lng,
                  ]),
                },
              }}
            >
              <Layer
                type="line" // tipo de capa, en este caso una línea
                paint={{
                  "line-color": "blue", // color de la línea
                  "line-width": 2 // ancho de la línea
                }}
              />
            </Source>
          )}
          <NavigationControl showCompass={false} /> {/* Agrega el control de navegación */}
        </div>
      )}
    </>
  )
}

interface RoutesProps {
  route: IRoute;
  onClick: (route: IRoute) => void
}

const Routes = ({ route, onClick }: RoutesProps) => {
  const { t } = useTranslation();

  return (
    <RoutesSection >
      <RoutesContent onClick={() => onClick(route)}>
        <h3>{route.name}</h3>
        <p>{route.description}</p>
      </RoutesContent>
      {
        <DeleteButton id={route.id} />
      }
    </RoutesSection>
  );
};

export default RoutesSidebar;
