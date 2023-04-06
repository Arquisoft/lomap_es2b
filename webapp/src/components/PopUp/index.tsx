import React from 'react';
import { CloseButton, PopupContainer, PopupContent } from './Styles';

interface PopupProps {
  isOpen: boolean
  closePopup: () => void
  className?: string
}

const Popup: React.FC<PopupProps> = ({ isOpen, closePopup, children, className }) => {
  return isOpen ? (
    <PopupContainer className={className}>
      <PopupContent className='content'>
        <CloseButton onClick={closePopup} />
        { children }
      </PopupContent>
    </PopupContainer>  
  ) : null;
};

export default Popup;
