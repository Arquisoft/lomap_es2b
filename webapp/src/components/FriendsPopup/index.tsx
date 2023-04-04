import { useContext, useEffect, useState } from 'react'
import { Button, TextField, CircularProgress, Avatar } from '@mui/material'
import { MdDelete } from 'react-icons/md'

import { UserContext } from '../../context/UserContext'
import { getFriends, addFriend as addFriendToSolid, deleteFriend as removeFriendFromSolid } from '../../helpers/SolidHelper'
import { ISolidUser } from '../../types/ISolidUser'
import Popup from '../PopUp'
import { AddFriend, CustomDivider, FriendList, FriendListItem, LoaderContainer, DeleteButtons, DeletePopup } from './Styles'

type Props = {
  isOpen: boolean
  closePopup: () => void
}

const FriendsPopup = ({ isOpen, closePopup } : Props) => {

  const [ friends, setFriends ] = useState<ISolidUser[]>([])
  const [ newFriendId, setNewFriendId ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ deleteOpen, setDeleteOpen ] = useState(false)
  const [ friendToDelete, setFriendToDelete ] = useState('')

  const { state: user } = useContext(UserContext)
  
  const loadFriends = async () => {
    if (!user) return
    setIsLoading(true)
    setFriends(await getFriends(user.url))
    setIsLoading(false)
  }

  useEffect(() => {
    if (user) {
      loadFriends()
    }
  },[user])

  const addFriend = async () => {
    if (newFriendId && user?.url) {
      setFriends(friends => [...friends, { webId: newFriendId }])
      setIsLoading(true)
      setNewFriendId('')
      await addFriendToSolid(user.url, newFriendId)
      loadFriends()
    }
  }

  const deleteFriend = (webId: string) => {
    setFriendToDelete(webId)
    setDeleteOpen(true)
  }

  const deleteResult = async (result: boolean) => {
    setDeleteOpen(false)
    if (result && user?.url) {
      setIsLoading(true)
      await removeFriendFromSolid(user.url, friendToDelete)
      loadFriends()
    }
    setFriendToDelete('')
  }

  return (
    <>
      <Popup isOpen={isOpen} closePopup={closePopup}>
        <h2>Mis Amigos</h2>
        <AddFriend>
          <TextField label="WebId del nuevo amigo" variant="standard" value={newFriendId} onChange={ e => setNewFriendId(e.target.value.trim()) } />
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
                  <FriendCard key={index} friend={friend} deleteFriend={deleteFriend}/>
                ))
              }
            </FriendList>
            :
            <div>Aun no tienes amigos</div>
        }
      </Popup>
      <ConfirmPopup isOpen={deleteOpen} closePopup={() => deleteResult(false)} friend={friendToDelete} result={deleteResult} />
    </>
  )
}

type FriendCardProps = {
  friend: ISolidUser,
  deleteFriend: (webId: string) => void
}
const FriendCard = ({ friend, deleteFriend } : FriendCardProps) => {
  return (
    <FriendListItem>
      <div>
        <Avatar src={friend.profilePic} />
        <a href={friend.webId} target='_blank'>{ friend.name || friend.webId }</a>
      </div>
      <Button style={{ float: 'right' }} onClick={() => deleteFriend(friend.webId)}><MdDelete /></Button>
    </FriendListItem>
  )
}

type PopupProps = {
  isOpen: boolean
  closePopup: () => void
  friend: string
  result: (success: boolean) => void
}
const ConfirmPopup = ({ isOpen, closePopup, friend, result }: PopupProps) => {
  return (
    <DeletePopup isOpen={isOpen} closePopup={closePopup}>
      <h4>Eliminar amigo</h4>
      <div>
        ¿Seguro que quieres eliminar a {friend} de tu lista de amigos?
      </div>
      <DeleteButtons>
        <Button color='error' onClick={() => result(true)}>Eliminar</Button>
        <Button color='info' onClick={() => result(false)}>Cancelar</Button>
      </DeleteButtons>
    </DeletePopup>
  )
}

export default FriendsPopup