import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField, CircularProgress } from '@mui/material'

import { UserContext } from '../../context/UserContext'
import { getFriends, getProfile } from '../../helpers/SolidHelper'
import { ISolidUser } from '../../types/ISolidUser'
import Popup from '../PopUp'
import { AddFriend, CustomDivider, FriendList, FriendListItem, LoaderContainer } from './Styles'

type Props = {
  isOpen: boolean
  closePopup: () => void
}

const FriendsPopup = ({ isOpen, closePopup } : Props) => {

  const [ friends, setFriends ] = useState<ISolidUser[]>([])
  const [newFriendId, setNewFriendId] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const { state: user } = useContext(UserContext)
  
  const loadfriends = async () => {
    if (!user) return
    setIsLoading(true)
    setFriends(await getFriends(user.url))
    setIsLoading(false)
  }

  useEffect(() => {
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
        isLoading ? 
          <LoaderContainer>
            <CircularProgress color='primary' />
          </LoaderContainer>
        :
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