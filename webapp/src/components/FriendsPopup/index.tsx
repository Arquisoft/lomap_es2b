import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { getNamedNodeAll } from "@inrupt/solid-client";

import { UserContext } from '../../context/UserContext'
import { getProfile } from '../../helpers/SolidHelper'
import { ISolidUser } from '../../types/ISolidUser'
import { getFriend } from '../../helpers/friendHelper'
import Popup from '../PopUp'
import { AddFriend, CustomDivider, FriendList, FriendListItem } from './Styles'
import { FOAF } from '@inrupt/vocab-common-rdf';

type Props = {
  isOpen: boolean
  closePopup: () => void
}

const FriendsPopup = ({ isOpen, closePopup } : Props) => {

  const [ friends, setFriends ] = useState<ISolidUser[]>([])
  const [newFriendId, setNewFriendId] = useState('')

  const { state: user } = useContext(UserContext)
  
  const loadfriends = async () => {
    if (!user) return
    console.log('cargando amigos')
    const friendIds = getNamedNodeAll(user, FOAF.knows).map(node => node.value)
    const friendList : ISolidUser[] = []
    for (let id of friendIds) {
      const friend = await getFriend(id)
      if (friend && friends.filter(f => f.webId === friend.webId).length === 0)
        friendList.push(friend)
    }
    setFriends(friendList)
  }

  useEffect(() => {
    console.log(user)
    if (user) {
      loadfriends()
    }
  },[user])

  const addFriend = () => {
    if (newFriendId) {
      setFriends(friends => [...friends, { webId: newFriendId }])
      setNewFriendId('')
      getProfile(newFriendId).then(result => console.log(result))
      loadfriends()
    }
  }

  return (
    <Popup isOpen={isOpen} closePopup={closePopup}>
      <h2>Mis Amigos</h2>
      <AddFriend>
        <TextField label="Nuevo Amigo" variant="standard" value={newFriendId} onChange={ e => setNewFriendId(e.target.value.trim()) } />
        <Button variant='contained' onClick={addFriend}>Añadir</Button>
      </AddFriend>
      <CustomDivider />
      {
        friends.length > 0 ?
        <FriendList>
          {
            friends.map((friend, index) => (
              <FriendCard key={index} friend={friend}/>
            ))
          }
        </FriendList>
        :
        <div>Aun no tienes amigos</div>
      }
    </Popup>
  )
}

type FriendCardProps = {
  friend: ISolidUser
}

const FriendCard = ({ friend } : FriendCardProps) => {
  return (
    <FriendListItem>
      {friend.webId}
    </FriendListItem>
  )
}

export default FriendsPopup