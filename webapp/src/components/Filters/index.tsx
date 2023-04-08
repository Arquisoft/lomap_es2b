import React from 'react';
import { BiRestaurant } from 'react-icons/bi';
import { MdLocalHotel, MdLandscape, MdOtherHouses } from 'react-icons/md';
import { FaMonument, FaShoppingCart } from 'react-icons/fa';
import {IoIosBeer} from 'react-icons/io';
import { FilterButton, FilterContainer, FilterWrapper } from './Styles';
import { Category } from '../../types/Category';

type Props = {
  toggleSidebar: (open: boolean | undefined) => void;
  activeFilter: Category;
  setActiveFilter: (category: Category) => void;
  className?: string
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
  toggleSidebar: (open: boolean | undefined) => void;
}

export const FilterComponent: React.FC<FilterProps> = ({ activeFilter, locations, setActiveFilter, toggleSidebar }) => {

  const handleFilterClick = (category: Category) => {
    if (activeFilter === category) {
      setActiveFilter(Category.All);
    } else {
      setActiveFilter(category);
    }
    toggleSidebar(true);
  };

  return (
    <FilterContainer>
      <FilterButton isActive={activeFilter === Category.Restaurant} onClick={() => handleFilterClick(Category.Restaurant)}>
        <BiRestaurant />
        Restaurants
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Hotel} onClick={() => handleFilterClick(Category.Hotel)}>
        <MdLocalHotel />
        Hotels
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Monuments} onClick={() => handleFilterClick(Category.Monuments)}>
        <FaMonument />
        Monuments
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Shops} onClick={() => handleFilterClick(Category.Shops)}>
        <FaShoppingCart />
        Shops
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Bar} onClick={() => handleFilterClick(Category.Bar)}>
        <IoIosBeer />
        Bar
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Landscapes} onClick={() => handleFilterClick(Category.Landscapes)}>
        <MdLandscape />
        Landscapes
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Others} onClick={() => handleFilterClick(Category.Others)}>
        <MdOtherHouses />
        Others
      </FilterButton>
    </FilterContainer>
  );
};

const Filter = ({ toggleSidebar, setActiveFilter, activeFilter, className } : Props) => {

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

  return (
    <FilterWrapper className={className}>
        <FilterComponent activeFilter={activeFilter} locations={locations} setActiveFilter={setActiveFilter} toggleSidebar={toggleSidebar}/>
    </FilterWrapper>
  );
};

export default Filter;
