import styled from 'styled-components'
import { Divider } from '@mui/material'
import Popup from '../PopUp'

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
  overflow: auto;
`

export const FriendListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0.3em;
  }
  a {
    text-decoration: none;
    color: black
  }
  a:hover {
    text-decoration: underline;
  }
`

export const LoaderContainer = styled.div`
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DeletePopup = styled(Popup)`
  .content {
    @media only screen and (max-width: 550px) {
        height: 30%;
        min-height: max-content;
        width: 90vw;
    }
  }
`

export const DeleteButtons = styled.div`
  padding: 0.5em;
  float: right;
`