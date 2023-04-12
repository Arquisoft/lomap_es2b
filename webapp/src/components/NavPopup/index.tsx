import React from 'react';
import { PopupContainer, PopupContent } from './Styles';
import CloseButton from '../CloseButton';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const NavPopup: React.FC<PopupProps> = ({ isOpen, closePopup, children }) => {
    return isOpen ? (
        <PopupContainer>
          <PopupContent style={{ height: '100%', left: 0, right: 'unset' }}>
            <CloseButton onClick={closePopup} />
            {children}
          </PopupContent>
        </PopupContainer>
      ) : null;
    };

export default NavPopup;
