import { Suspense } from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import userEvent from '@testing-library/user-event'

import FriendsPopup from "."
import Loader from '../Loader'
import { mockSolidHelper } from '../../../test/helpers/mockSolidHelper'
import { UserContext } from '../../context/UserContext'

const mockClosePopup = jest.fn()
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

let solidHelper = Object.assign({}, mockSolidHelper)

describe('Friends Popup', () => {
  
  beforeEach(() => {
    solidHelper = Object.assign({}, mockSolidHelper)
  })

  it('loads an empty list of friends', async () => {
    solidHelper.getFriends = async (webId: string) => {
      return []
    }
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FriendsPopup isOpen={true} closePopup={mockClosePopup} solidManager={solidHelper}/>
        </Suspense>
      </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('friends.title')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('friends.list.empty')).toBeInTheDocument())
  })

  it('loads a list of friends', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <UserContext.Provider value={{ state: { url: 'testuser.solidtest.net', type: 'Subject', predicates: {} }, dispatch: () => {} }}>
            <FriendsPopup isOpen={true} closePopup={mockClosePopup} solidManager={solidHelper}/>
          </UserContext.Provider>
        </Suspense>
      </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('friends.title')).toBeInTheDocument())
    for (let friend of await solidHelper.getFriends('webid'))
      await waitFor(() => expect(screen.getByText(friend.webId)).toBeInTheDocument())
  })

  it('tries to add a friend to the list', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <UserContext.Provider value={{ state: { url: 'testuser.solidtest.net', type: 'Subject', predicates: {} }, dispatch: () => {} }}>
            <FriendsPopup isOpen={true} closePopup={mockClosePopup} solidManager={solidHelper}/>
          </UserContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    // Waits for the page to load
    await waitFor(() => expect(screen.getByText('friends.title')).toBeInTheDocument())

    // At first the list does not contain the new friend
    expect(screen.queryByText('https://newfriend.solidtest.net')).not.toBeInTheDocument()

    // The user writes a webId in the text input
    const addInput = screen.getByLabelText('friends.new.placeholder')
    expect(addInput).toBeInTheDocument()
    userEvent.type(addInput, 'https://newfriend.solidtest.net')
    const addButton = screen.getByRole('button', { name: 'friends.new.add' })
    expect(addButton).toBeInTheDocument()
    await act( async () => userEvent.click(addButton))

    // The new friend should appear on the list
    await waitFor(() => expect(screen.getByText('https://newfriend.solidtest.net')).toBeInTheDocument())
  })

  it('delete friend from list', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <UserContext.Provider value={{ state: { url: 'testuser.solidtest.net', type: 'Subject', predicates: {} }, dispatch: () => {} }}>
            <FriendsPopup isOpen={true} closePopup={mockClosePopup} solidManager={solidHelper}/>
          </UserContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.getByText('friends.title')).toBeInTheDocument())
    for (let friend of await solidHelper.getFriends('webid'))
      await waitFor(() => expect(screen.getByText(friend.webId)).toBeInTheDocument())

    // The tries to delete a friend
    const friend = (await solidHelper.getFriends('webid'))[0]
    const deleteButton = screen.getByTestId(`delete-${friend.webId}`);
    expect(deleteButton).toBeInTheDocument()
    userEvent.click(deleteButton)

    // Confirm popup should open
    expect(screen.getByText('friends.delete.confirm.title'))
    
    //Confirm delete
    await act( async () => userEvent.click(screen.getByText('friends.delete.confirm.yes')))

    expect(screen.queryByText(friend.webId)).not.toBeInTheDocument()
  })

  it('tries to add friend but error happens', async () => {
    solidHelper.addFriend = async (webId: string, friend: string) => {
      throw Error('error adding friend')
    }
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <UserContext.Provider value={{ state: { url: 'testuser.solidtest.net', type: 'Subject', predicates: {} }, dispatch: () => {} }}>
            <FriendsPopup isOpen={true} closePopup={mockClosePopup} solidManager={solidHelper}/>
          </UserContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    
    // Waits for the page to load
    await waitFor(() => expect(screen.getByText('friends.title')).toBeInTheDocument())

    // The user writes a webId in the text input
    const addInput = screen.getByLabelText('friends.new.placeholder')
    expect(addInput).toBeInTheDocument()
    userEvent.type(addInput, 'https://invalid_friend.solidtest.error')
    const addButton = screen.getByRole('button', { name: 'friends.new.add' })
    expect(addButton).toBeInTheDocument()
    await act( async () => userEvent.click(addButton))

    // An error message should appear
    await waitFor(() => expect(screen.getByText('friends.new.error')).toBeInTheDocument())
  })
  
  it('tries to delete friend but error happens', async () => {
    solidHelper.deleteFriend = async (webId: string, friend: string) => {
      throw Error('error adding friend')
    }
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <UserContext.Provider value={{ state: { url: 'testuser.solidtest.net', type: 'Subject', predicates: {} }, dispatch: () => {} }}>
            <FriendsPopup isOpen={true} closePopup={mockClosePopup} solidManager={solidHelper}/>
          </UserContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    
    // Waits for the page to load
    await waitFor(() => expect(screen.getByText('friends.title')).toBeInTheDocument())

    // The tries to delete a friend
    const friend = (await solidHelper.getFriends('webid'))[0]
    const deleteButton = screen.getByTestId(`delete-${friend.webId}`);
    expect(deleteButton).toBeInTheDocument()
    userEvent.click(deleteButton)

    // Confirm popup should open
    expect(screen.getByText('friends.delete.confirm.title'))
    
    //Confirm delete
    
    await act( async () => userEvent.click(screen.getByText('friends.delete.confirm.yes')))

    // An error message should appear
    await waitFor(() => expect(screen.getByText('friends.delete.error')).toBeInTheDocument())
  })

  it('tries to load friends but error happens', async () => {
    solidHelper.getFriends = async (webId: string) => {
      throw Error('error adding friend')
    }
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <UserContext.Provider value={{ state: { url: 'testuser.solidtest.net', type: 'Subject', predicates: {} }, dispatch: () => {} }}>
            <FriendsPopup isOpen={true} closePopup={mockClosePopup} solidManager={solidHelper}/>
          </UserContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    
    // Waits for the page to load
    await waitFor(() => expect(screen.getByText('friends.title')).toBeInTheDocument())

    // An error message should appear
    await waitFor(() => expect(screen.getByText('friends.list.error')).toBeInTheDocument())
  })

})