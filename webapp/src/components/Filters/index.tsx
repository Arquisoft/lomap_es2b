import React from 'react';
import { FilterButton, FilterContainer, LocationItem, LocationList, FilterWrapper } from './Styles';

enum Category {
  Restaurant = 'restaurant',
  Hotel = 'hotel',
  Monuments = 'monuments',
  Shops = 'shops',
  Bar = 'bar',
  Landscapes = 'landscapes', 
  Others = 'others'
}

interface Location {
  name: string;
  address: string;
  category: Category;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface FilterProps {
  locations: Location[];
  activeFilter: Category;
  setActiveFilter: (category: Category) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ activeFilter, locations, setActiveFilter }) => {
  const filteredLocations = locations.filter((loc) => loc.category === activeFilter);

  return (
    <FilterContainer>
      <div>
        <FilterButton isActive={activeFilter === Category.Restaurant} onClick={() => setActiveFilter(Category.Restaurant)}>
          Restaurants
        </FilterButton>
        <FilterButton isActive={activeFilter === Category.Hotel} onClick={() => setActiveFilter(Category.Hotel)}>
          Hotels
        </FilterButton>
        <FilterButton isActive={activeFilter === Category.Monuments} onClick={() => setActiveFilter(Category.Monuments)}>
          Monuments
        </FilterButton>
        <FilterButton isActive={activeFilter === Category.Shops} onClick={() => setActiveFilter(Category.Shops)}>
          Shops
        </FilterButton>
        <FilterButton isActive={activeFilter === Category.Bar} onClick={() => setActiveFilter(Category.Bar)}>
          Bar
        </FilterButton>
        <FilterButton isActive={activeFilter === Category.Landscapes} onClick={() => setActiveFilter(Category.Landscapes)}>
          Landscapes
        </FilterButton>
        <FilterButton isActive={activeFilter === Category.Others} onClick={() => setActiveFilter(Category.Others)}>
          Others
        </FilterButton>
      </div>
      {/* <LocationList>
        {filteredLocations.map((loc) => (
          <LocationItem key={loc.name}>
            <h3>{loc.name}</h3>
            <p>{loc.address}</p>
          </LocationItem>
        ))}
      </LocationList> */}
    </FilterContainer>
  );
};

const Filter: React.FC = () => {
  const locations: Location[] = [
    {
      name: 'McDonalds',
      address: '123 Main St.',
      category: Category.Restaurant,
      coordinates: { lat: 0, lng: 0 },
    },
    {
      name: 'Hilton',
      address: '456 Maple Ave.',
      category: Category.Hotel,
      coordinates: { lat: 0, lng: 0 },
    },
    {
      name: 'Museum of Modern Art',
      address: '789 Elm St.',
      category: Category.Monuments,
      coordinates: { lat: 0, lng: 0 },
    },
  ];

  const [activeFilter, setActiveFilter] = React.useState<Category>(Category.Restaurant);

  return (
    <FilterWrapper>
        <FilterComponent activeFilter={activeFilter} locations={locations} setActiveFilter={setActiveFilter} />
    </FilterWrapper>
  );
};

export default Filter;
