import styled from 'styled-components'
import { Divider, CircularProgress } from '@mui/material'

export const AddFriend = styled.div`
  display: flex;
  align-items: center;
`

export const CustomDivider = styled(Divider)`
  padding-top: 0.4em;
`

export const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`

export const FriendListItem = styled.div`
  display: flex;
`

export const LoaderContainer = styled.div`
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`