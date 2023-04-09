import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Sidebar from './components/Sidebar';
import { Category } from './types/Category';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getAllByText("LoMap")[0];
  expect(linkElement).toBeInTheDocument();
});

test('sideBar',() =>{
  render(<Sidebar isOpen={true} toggleSidebar={()=>true} selectedCategory={Category.All}/>);
  const mapElement = screen.getAllByText("Points of interest")[0];
  expect(mapElement).toBeInTheDocument();
 
});
