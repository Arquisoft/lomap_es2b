import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import Navbar from './components/NavBar';

const mockToggleSidebar = jest.fn();
const mockOpenPopup = jest.fn();

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getAllByText("LoMap")[0];
  expect(linkElement).toBeInTheDocument();
});

describe('Navbar', () => {
  beforeEach(() => {
    mockToggleSidebar.mockClear();
    mockOpenPopup.mockClear();
  });

  it('should render Navbar component', () => {
    const { getByText } = render(<Navbar toggleSidebar={mockToggleSidebar} openPopup={mockOpenPopup} />);
    expect(getByText('LoMap')).toBeInTheDocument();
  });

  it("opens the user menu when clicking on the user avatar", () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} openPopup={mockOpenPopup} />);
    const userAvatar = screen.getByRole("img");
    userEvent.click(userAvatar);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("opens the search form when clicking on the search button", () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} openPopup={mockOpenPopup} />);
    const searchButton = screen.getByTitle("Buscar");
    userEvent.click(searchButton);
    expect(screen.getByPlaceholderText("Buscar lugares...")).toBeInTheDocument();
  });
});