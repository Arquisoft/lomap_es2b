import React from 'react';
import { BiRestaurant } from 'react-icons/bi';
import { MdLocalHotel, MdLandscape, MdOtherHouses } from 'react-icons/md';
import { FaMonument, FaShoppingCart } from 'react-icons/fa';
import {IoIosBeer} from 'react-icons/io';
import { FilterButton, FilterContainer, FilterWrapper } from './Styles';
import { Category } from '../../types/Category';
import { useTranslation } from 'react-i18next';

type Props = {
  toggleSidebar: (open: boolean | undefined) => void;
  activeFilter: Category;
  setActiveFilter: (category: Category) => void;
  className?: string
}

interface FilterProps {
  activeFilter: Category;
  setActiveFilter: (category: Category) => void;
  toggleSidebar: (open: boolean | undefined) => void;
}

export const FilterComponent: React.FC<FilterProps> = ({ activeFilter, setActiveFilter, toggleSidebar }) => {

  const { t } = useTranslation()

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
        { t('markerCategories.restaurants') }
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Hotel} onClick={() => handleFilterClick(Category.Hotel)}>
        <MdLocalHotel />
        { t('markerCategories.hotels') }
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Monuments} onClick={() => handleFilterClick(Category.Monuments)}>
        <FaMonument />
        { t('markerCategories.monuments') }
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Shops} onClick={() => handleFilterClick(Category.Shops)}>
        <FaShoppingCart />
        { t('markerCategories.shops') }
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Bar} onClick={() => handleFilterClick(Category.Bar)}>
        <IoIosBeer />
        { t('markerCategories.bars') }
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Landscapes} onClick={() => handleFilterClick(Category.Landscapes)}>
        <MdLandscape />
        { t('markerCategories.landscapes') }
      </FilterButton>
      <FilterButton isActive={activeFilter === Category.Others} onClick={() => handleFilterClick(Category.Others)}>
        <MdOtherHouses />
        { t('markerCategories.others') }
      </FilterButton>
    </FilterContainer>
  );
};

const Filter = ({ toggleSidebar, setActiveFilter, activeFilter, className } : Props) => {

  return (
    <FilterWrapper className={className}>
        <FilterComponent activeFilter={activeFilter} setActiveFilter={setActiveFilter} toggleSidebar={toggleSidebar}/>
    </FilterWrapper>
  );
};

export default Filter;
