import React from 'react';
import { CloseButton, PopupContainer, PopupContent } from './Styles';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const NavPopup: React.FC<PopupProps> = ({ isOpen, closePopup, children }) => {
    return isOpen ? (
        <PopupContainer>
          <PopupContent style={{ height: '100%', left: 0, right: 'unset' }}>
            <CloseButton onClick={closePopup}>&times;</CloseButton>
            {children}
          </PopupContent>
        </PopupContainer>
      ) : null;
    };

export default NavPopup;
