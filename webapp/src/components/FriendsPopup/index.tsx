import React from 'react'
import Popup from '../PopUp'

interface Props {
  isOpen: boolean
  closePopup: () => void
}

const FriendsPopup = ({ isOpen, closePopup } : Props) => {
  return (
    <Popup isOpen={isOpen} closePopup={closePopup}>
      <h2>Tus Amigos</h2>
      
    </Popup>
  )
}

export default FriendsPopup