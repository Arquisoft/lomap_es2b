import { useContext, useEffect, useState } from 'react'
import { Button, TextField, CircularProgress, Avatar, Alert, IconButton, Collapse } from '@mui/material'
import { MdDelete } from 'react-icons/md'

import { UserContext } from '../../context/UserContext'
import { getFriends, addFriend as addFriendToSolid, deleteFriend as removeFriendFromSolid } from '../../helpers/SolidHelper'
import { ISolidUser } from '../../types/ISolidUser'
import Popup from '../PopUp'
import { AddFriend, CustomDivider, FriendList, FriendListItem, LoaderContainer, DeleteButtons, DeletePopup } from './Styles'
import { FaTimes } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'

type Props = {
  isOpen: boolean
  closePopup: () => void
}

const FriendsPopup = ({ isOpen, closePopup } : Props) => {

  const { t } = useTranslation()

  const [ friends, setFriends ] = useState<ISolidUser[]>([])
  const [ newFriendId, setNewFriendId ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ deleteOpen, setDeleteOpen ] = useState(false)
  const [ friendToDelete, setFriendToDelete ] = useState('')
  const [ isError, setIsError ] = useState(false)
  const [ error, setError ] = useState('')

  const { state: user } = useContext(UserContext)
  
  const loadFriends = async () => {
    if (!user) return
    try {
      setIsLoading(true)
      setFriends(await getFriends(user.url))
    } catch(err) {
      setError('friends.list.error')
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadFriends()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  const addFriend = async () => {
    if (newFriendId && user?.url) {
      if (!newFriendId.endsWith('/'))
        setNewFriendId(friendId => friendId+'/')

      try {
        setIsLoading(true)
        setNewFriendId('')
        await addFriendToSolid(user.url, newFriendId)
        await loadFriends()
        setIsError(false)
      } catch(err) {
        setError('friends.new.error')
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const deleteFriend = (webId: string) => {
    setFriendToDelete(webId)
    setDeleteOpen(true)
  }

  const deleteResult = async (result: boolean) => {
    setDeleteOpen(false)
    if (result && user?.url) {
      try {
        setIsLoading(true)
        await removeFriendFromSolid(user.url, friendToDelete)
        await loadFriends()
      } catch(err) {
        setError('friends.delete.error')
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    setFriendToDelete('')
  }

  return (
    <>
      <Popup isOpen={isOpen} closePopup={closePopup}>
        <h2>{ t('friends.title') }</h2>
        <Collapse in={isError}>
          <Alert action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsError(false);
              }}
            >
              <FaTimes fontSize="inherit" />
            </IconButton>
          } severity="error">
            { t(error) }
          </Alert>
        </Collapse>
        <AddFriend>
          <TextField label={ t('friends.new.placeholder') } variant="standard" value={newFriendId} onChange={ e => setNewFriendId(e.target.value.trim()) } />
          <Button variant='contained' onClick={addFriend}>{ t('friends.new.add') }</Button>
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
                friends.map((friend) => (
                  <FriendCard key={friend.webId} friend={friend} deleteFriend={deleteFriend}/>
                ))
              }
            </FriendList>
            :
            <div>{ t('friends.list.empty') }</div>
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
        <a href={friend.webId} rel="noreferrer" target='_blank'>{ friend.name || friend.webId }</a>
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
      <h4>{ t('friends.delete.confirm.title') }</h4>
      <div>
      { t('friends.delete.confirm.body', { friend }) }
      </div>
      <DeleteButtons>
        <Button color='error' onClick={() => result(true)}>{ t('friends.delete.confirm.yes') }</Button>
        <Button color='info' onClick={() => result(false)}>{ t('friends.delete.confirm.no') }</Button>
      </DeleteButtons>
    </DeletePopup>
  )
}

export default FriendsPopup