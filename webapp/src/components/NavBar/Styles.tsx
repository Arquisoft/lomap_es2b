import React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

export const NavbarContainer = styled.nav`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  padding: 1rem;
  margin: 1em;
  width: 70%;
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  border-radius: 0.5em;
`;

export const Logo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLink = styled.a`
  font-size: 1.5rem;
  color: #333;
  margin-left: 2rem;
  text-decoration: none;

  &:hover {
    color: #333;
  }
`;

export const AvatarButton = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-left: 1rem;
`;

export const AvatarIcon = styled(FaUserCircle)`
  font-size: 1.5rem;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 0.5em;
  z-index: 10;
  display: none;
`;

export const DropdownItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;