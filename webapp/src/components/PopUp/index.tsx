import React from 'react';
import { CloseButton, PopupContainer, PopupContent } from './Styles';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, closePopup, children }) => {
  return isOpen ? (
    <PopupContainer>
      <PopupContent>
        <CloseButton onClick={closePopup} />
        { children }
      </PopupContent>
    </PopupContainer>  
  ) : null;
};

export default Popup;
