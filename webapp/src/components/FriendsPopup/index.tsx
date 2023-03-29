import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

import Popup from '../PopUp'
import { AddFriend, CustomDivider, FriendList, FriendListItem } from './Styles'

interface Props {
  isOpen: boolean
  closePopup: () => void
}

const FriendsPopup = ({ isOpen, closePopup } : Props) => {

  const [ friends, setFriends ] = useState<string[]>([])
  const [newFriend, setNewFriend] = useState('')

  const addFriend = () => {
    if (newFriend) {
      setFriends(friends => [...friends, newFriend])
      setNewFriend('')
    }
  }

  return (
    <Popup isOpen={isOpen} closePopup={closePopup}>
      <h2>Mis Amigos</h2>
      <AddFriend>
        <TextField label="Nuevo Amigo" variant="standard" value={newFriend} onChange={ e => setNewFriend(e.target.value.trim()) } />
        <Button variant='contained' onClick={addFriend}>Añadir</Button>
      </AddFriend>
      <CustomDivider />
      {
        friends.length > 0 ?
        <FriendList>
          {
            friends.map((friend, index) => (
              <FriendListItem key={index}>
                {friend}
              </FriendListItem>
            ))
          }
        </FriendList>
        :
        <div>Aun no tienes amigos</div>
      }
    </Popup>
  )
}

export default FriendsPopup